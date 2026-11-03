import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { arch, platform } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { gzipSync } from 'node:zlib';

import { format, resolveConfig } from 'prettier';

const lighthouseVersion = '13.6.0';
const finiteValue = (value) => (typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null);
const score = (category) => {
  const value = finiteValue(category?.score);
  return value !== null && value <= 1 ? Math.round(value * 100) : null;
};

export function requireLocalUrl(value) {
  const url = new URL(value);
  if (
    url.protocol !== 'http:' ||
    !['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname) ||
    url.username ||
    url.password
  ) {
    throw new Error('Measurements may fetch only an HTTP loopback URL without credentials.');
  }
  return url;
}

function reportUrl(report) {
  requireLocalUrl(report.requestedUrl);
  return requireLocalUrl(report.finalDisplayedUrl ?? report.finalUrl ?? report.requestedUrl);
}

export function extractScriptRequests(report) {
  const target = reportUrl(report);
  const items = report.audits?.['network-requests']?.details?.items;
  if (!Array.isArray(items)) return null;
  const scripts = new Map();
  for (const request of items) {
    if (request.resourceType !== 'Script' || request.statusCode !== 200 || request.finished !== true) continue;
    const url = new URL(request.url, target);
    if (url.origin !== target.origin) continue;
    requireLocalUrl(url.href);
    scripts.set(url.href, { ...request, url: url.href });
  }
  return [...scripts.values()];
}

async function measureJavaScript(report) {
  const requests = extractScriptRequests(report);
  if (requests === null) return null;
  let bytes = 0;
  for (const request of requests) {
    const response = await fetch(request.url, { redirect: 'error', signal: AbortSignal.timeout(15000) });
    if (!response.ok || !/(?:java|ecma)script/i.test(response.headers.get('content-type') ?? '')) {
      throw new Error(`Could not retrieve a JavaScript response for ${new URL(request.url).pathname}.`);
    }
    const body = Buffer.from(await response.arrayBuffer());
    if (finiteValue(request.resourceSize) !== null && body.length !== request.resourceSize) {
      throw new Error(
        'JavaScript changed since the Lighthouse report. Run Lighthouse again against the current build.',
      );
    }
    bytes += gzipSync(body, { level: 9 }).byteLength;
  }
  return bytes;
}

export function createMeasurement(report, javascriptGzip, build) {
  if (report.lighthouseVersion !== lighthouseVersion || report.runtimeError) {
    throw new Error(`A successful Lighthouse ${lighthouseVersion} JSON report is required.`);
  }
  const target = reportUrl(report);
  const audits = report.audits ?? {};
  const timing = audits.metrics?.details?.items?.[0] ?? {};
  const lcpParts = audits['lcp-breakdown-insight']?.details?.items?.flatMap((item) => item.items ?? []) ?? [];
  const observedTtfb = lcpParts.find((item) => item.subpart === 'timeToFirstByte')?.duration;
  const settings = report.configSettings ?? {};
  const viewport = settings.screenEmulation;
  const throttling = settings.throttling;
  const profile = [
    settings.formFactor ? `${settings.formFactor} profile` : null,
    viewport ? `${viewport.width}×${viewport.height}, DPR ${viewport.deviceScaleFactor}` : null,
    settings.throttlingMethod ? `${settings.throttlingMethod} throttling for Lighthouse scores` : null,
    throttling
      ? `${throttling.rttMs} ms RTT, ${throttling.throughputKbps} Kbit/s, CPU ×${throttling.cpuSlowdownMultiplier}`
      : null,
    typeof settings.disableStorageReset === 'boolean'
      ? `storage reset ${settings.disableStorageReset ? 'disabled' : 'enabled'}`
      : null,
  ]
    .filter(Boolean)
    .join('; ');
  const browserVersion = report.environment?.hostUserAgent?.match(/(?:HeadlessChrome|Chrome)\/([\d.]+)/)?.[1];
  const buildTime = build?.exitCode === 0 ? finiteValue(build.durationSeconds) : null;
  const notes = [
    'One local production-page run. TTFB, FCP and load time are observed trace timings; Lighthouse category scores use the report throttling profile.',
    'TTFB uses the observed time-to-first-byte subpart from the Lighthouse LCP breakdown. Load time uses its observed loadEventEnd timing.',
    'Page weight is Lighthouse total-byte-weight for this navigation. JS gzip sums unique successfully loaded same-origin script responses compressed independently with gzip level 9; it excludes other routes, third-party scripts and response headers.',
  ];
  if (buildTime !== null) {
    notes.push(
      `Build: ${build.profile ?? 'production build'}${build.recordedAt ? `; measured at ${build.recordedAt}` : ''}.`,
    );
  }
  if (Array.isArray(report.runWarnings)) notes.push(...report.runWarnings);
  return {
    recordedAt: report.fetchTime ?? null,
    environment: 'Local production build (localhost)',
    target: target.href,
    profile: profile || null,
    tools: `Lighthouse ${report.lighthouseVersion}${browserVersion ? `; Chrome ${browserVersion}` : ''}; Node ${process.version}; ${platform()} ${arch()}; node:zlib gzip level 9`,
    runs: 1,
    notes,
    evidence: [],
    values: {
      ttfb: finiteValue(observedTtfb),
      fcp: finiteValue(timing.observedFirstContentfulPaint),
      loadTime: finiteValue(timing.observedLoad),
      pageWeight: finiteValue(audits['total-byte-weight']?.numericValue),
      javascriptGzip: finiteValue(javascriptGzip),
      buildTime,
      lighthousePerformance: score(report.categories?.performance),
      lighthouseAccessibility: score(report.categories?.accessibility),
      lighthouseSeo: score(report.categories?.seo),
      lighthouseBestPractices: score(report.categories?.['best-practices']),
    },
  };
}

async function main() {
  const { values } = parseArgs({
    options: {
      report: { type: 'string' },
      'build-time': { type: 'string' },
      output: { type: 'string' },
      help: { type: 'boolean' },
    },
  });
  if (values.help || !values.report) {
    console.log(
      'Usage: npm run metrics:measure -- --report <lighthouse.json> [--build-time <build.json>] [--output <site-metrics.ts>]',
    );
    if (!values.help) process.exitCode = 1;
    return;
  }
  const reportSource = await readFile(resolve(values.report), 'utf8');
  const report = JSON.parse(reportSource);
  const build = values['build-time'] ? JSON.parse(await readFile(resolve(values['build-time']), 'utf8')) : null;
  createMeasurement(report, null, build);
  const measurement = createMeasurement(report, await measureJavaScript(report), build);
  measurement.notes.push(`Lighthouse report SHA-256: ${createHash('sha256').update(reportSource).digest('hex')}.`);
  const output = values.output
    ? resolve(values.output)
    : fileURLToPath(new URL('../src/core/content/site-metrics.ts', import.meta.url));
  const source = await readFile(output, 'utf8');
  const record = /export const siteMetrics: SiteMeasurement = \{[\s\S]*?\n\};/;
  if (!record.test(source)) throw new Error('Could not find the existing typed siteMetrics record in the output file.');
  const updated = source.replace(
    record,
    () => `export const siteMetrics: SiteMeasurement = ${JSON.stringify(measurement, null, 2)};`,
  );
  await writeFile(output, await format(updated, { ...(await resolveConfig(output)), filepath: output }));
  console.log(JSON.stringify(measurement, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
