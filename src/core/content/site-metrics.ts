export type SiteMetricKey =
  | 'ttfb'
  | 'fcp'
  | 'loadTime'
  | 'pageWeight'
  | 'javascriptGzip'
  | 'buildTime'
  | 'lighthousePerformance'
  | 'lighthouseAccessibility'
  | 'lighthouseSeo'
  | 'lighthouseBestPractices';

export type SiteMetricUnit = 'ms' | 's' | 'bytes' | 'score';

export interface SiteMetricDefinition {
  readonly key: SiteMetricKey;
  readonly label: string;
  readonly unit: SiteMetricUnit;
  readonly description: string;
}

export interface SiteMeasurement {
  readonly recordedAt: string | null;
  readonly buildRecordedAt: string | null;
  readonly environment: string | null;
  readonly target: string | null;
  readonly profile: string | null;
  readonly tools: string | null;
  readonly runs: number | null;
  readonly notes: readonly string[];
  readonly evidence: readonly { readonly label: string; readonly href: string }[];
  readonly values: Readonly<Record<SiteMetricKey, number | null>>;
}

export const siteMetricDefinitions: readonly SiteMetricDefinition[] = [
  {
    key: 'ttfb',
    label: 'TTFB',
    unit: 'ms',
    description: 'Time from the start of navigation to the first byte of the page response.',
  },
  {
    key: 'fcp',
    label: 'FCP',
    unit: 'ms',
    description: 'First Contentful Paint: the time until the browser first paints page content.',
  },
  {
    key: 'loadTime',
    label: 'Load time',
    unit: 'ms',
    description: 'Time from navigation start to completion of the page load event.',
  },
  {
    key: 'pageWeight',
    label: 'Page weight',
    unit: 'bytes',
    description: 'Total transferred page resources for the recorded route and loading profile.',
  },
  {
    key: 'javascriptGzip',
    label: 'JS gzip',
    unit: 'bytes',
    description: 'Gzip-compressed JavaScript size for the scope specified in the measurement profile.',
  },
  {
    key: 'buildTime',
    label: 'Build time',
    unit: 's',
    description: 'Elapsed time for the production build on the recorded machine and build profile.',
  },
  {
    key: 'lighthousePerformance',
    label: 'Lighthouse Performance',
    unit: 'score',
    description: 'Lighthouse performance score for the recorded browser and device profile.',
  },
  {
    key: 'lighthouseAccessibility',
    label: 'Lighthouse Accessibility',
    unit: 'score',
    description: 'Lighthouse automated accessibility score. Manual accessibility review is a separate check.',
  },
  {
    key: 'lighthouseSeo',
    label: 'Lighthouse SEO',
    unit: 'score',
    description: 'Lighthouse score for the SEO checks supported by the recorded audit version.',
  },
  {
    key: 'lighthouseBestPractices',
    label: 'Lighthouse Best Practices',
    unit: 'score',
    description: 'Lighthouse score for browser and web development best-practice checks.',
  },
];

export const siteMetrics: SiteMeasurement = {
  recordedAt: '2026-11-03T10:31:26.610Z',
  buildRecordedAt: '2026-11-03T10:08:06.101785+00:00',
  environment: 'Local production build (localhost)',
  target: 'http://127.0.0.1:3100/',
  profile:
    'desktop profile; 1350×940, DPR 1; simulate throttling for Lighthouse scores; 40 ms RTT, 10240 Kbit/s, CPU ×1; storage reset enabled',
  tools: 'Lighthouse 13.6.0; Chrome 156.0.0.0; Node v24.22.1; darwin arm64; node:zlib gzip level 9',
  runs: 1,
  notes: [
    'One local production-page run. TTFB, FCP and load time are observed trace timings; Lighthouse category scores use the report throttling profile.',
    'TTFB uses the observed time-to-first-byte subpart from the Lighthouse LCP breakdown. Load time uses its observed loadEventEnd timing.',
    'Page weight is Lighthouse total-byte-weight for this navigation. JS gzip sums unique successfully loaded same-origin script responses compressed independently with gzip level 9; it excludes other routes, third-party scripts and response headers.',
    'Build: Next.js production build with existing compiler cache; measured at 2026-11-03T10:08:06.101785+00:00.',
    'Lighthouse report SHA-256: 581cbb18d5ed903426fdd8dc763e63baab4ccadeab10fc748b00e39c1e91bc4f.',
  ],
  evidence: [],
  values: {
    ttfb: 10.89,
    fcp: 109,
    loadTime: 124,
    pageWeight: 541536,
    javascriptGzip: 154655,
    buildTime: 8.069,
    lighthousePerformance: 100,
    lighthouseAccessibility: 100,
    lighthouseSeo: 100,
    lighthouseBestPractices: 100,
  },
};
