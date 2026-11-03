import assert from 'node:assert/strict';
import test from 'node:test';

import { createMeasurement, extractScriptRequests, requireLocalUrl } from './measure-site.mjs';

const report = {
  lighthouseVersion: '13.6.0',
  fetchTime: '2026-11-03T10:00:00.000Z',
  requestedUrl: 'http://127.0.0.1:3100/',
  finalDisplayedUrl: 'http://127.0.0.1:3100/',
  configSettings: { formFactor: 'desktop', throttlingMethod: 'simulate' },
  audits: {},
  categories: {},
};

test('unavailable report measurements stay null', () => {
  const measurement = createMeasurement(report, null, null);
  assert.ok(Object.values(measurement.values).every((value) => value === null));
});

test('observed timings are kept separate from simulated timings and server response duration', () => {
  const measured = {
    ...report,
    audits: {
      metrics: { details: { items: [{ observedFirstContentfulPaint: 796, observedLoad: 182, timeToFirstByte: 133 }] } },
      'server-response-time': { numericValue: 7 },
      'first-contentful-paint': { numericValue: 265 },
      'lcp-breakdown-insight': { details: { items: [{ items: [{ subpart: 'timeToFirstByte', duration: 8.002 }] }] } },
      'total-byte-weight': { numericValue: 493186 },
    },
    categories: { performance: { score: 0 }, accessibility: { score: 0.96 } },
  };
  const { values } = createMeasurement(measured, 1234, { durationSeconds: 8.069, exitCode: 0 });
  assert.equal(values.ttfb, 8.002);
  assert.equal(values.fcp, 796);
  assert.equal(values.loadTime, 182);
  assert.equal(values.pageWeight, 493186);
  assert.equal(values.javascriptGzip, 1234);
  assert.equal(values.buildTime, 8.069);
  assert.equal(values.lighthousePerformance, 0);
  assert.equal(values.lighthouseAccessibility, 96);
  assert.equal(createMeasurement(measured, null, { durationSeconds: 8, exitCode: 1 }).values.buildTime, null);
});

test('only unique successfully loaded same-origin scripts are fetched', () => {
  const url = 'http://127.0.0.1:3100/app.js';
  const request = { url, resourceType: 'Script', statusCode: 200, finished: true, resourceSize: 100 };
  const measured = {
    ...report,
    audits: {
      'network-requests': {
        details: {
          items: [
            request,
            request,
            { ...request, url: 'https://external.example/script.js' },
            { ...request, url: '/missing.js', statusCode: 404 },
          ],
        },
      },
    },
  };
  assert.deepEqual(extractScriptRequests(measured), [request]);
});

test('production and credential-bearing URLs cannot be fetched', () => {
  assert.throws(() => requireLocalUrl('https://portfolio.example/'));
  assert.throws(() => requireLocalUrl('http://name:secret@127.0.0.1:3100/'));
  assert.equal(requireLocalUrl('http://127.0.0.1:3100/').hostname, '127.0.0.1');
});

test('build timestamp belongs to a successful build, never to the page audit', () => {
  const build = { durationSeconds: 8, exitCode: 0, recordedAt: '2026-11-03T09:30:00.000Z' };
  const measured = createMeasurement(report, null, build);
  assert.equal(measured.recordedAt, report.fetchTime);
  assert.equal(measured.buildRecordedAt, build.recordedAt);
  assert.equal(createMeasurement(report, null, { ...build, exitCode: 1 }).buildRecordedAt, null);
  assert.equal(createMeasurement(report, null, { durationSeconds: 8, exitCode: 0 }).buildRecordedAt, null);
});

test('invalid measurement dates cannot reach the tooltip date formatter', () => {
  const measured = createMeasurement({ ...report, fetchTime: 'invalid-date' }, null, {
    durationSeconds: 8,
    exitCode: 0,
    recordedAt: 'ISO-8601 timestamp of the actual build',
  });
  assert.equal(measured.recordedAt, null);
  assert.equal(measured.buildRecordedAt, null);
  assert.ok(measured.notes.every((note) => !note.includes('ISO-8601 timestamp')));
});
