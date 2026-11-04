import assert from 'node:assert/strict';
import test from 'node:test';

import { createVisit, recordResources, recordLoad, recordVital } from '../visitor-measurement.ts';

const visit = () => createVisit('https://kozikowski.it/about?private=value#section', 1000);
const resource = (name: string, transferSize: number, initiatorType = 'img') => ({ name, transferSize, initiatorType });

test('each visitor starts without fabricated results and without storing URL parameters', () => {
  const state = visit();
  assert.equal(state.page, 'https://kozikowski.it/about');
  assert.equal(state.startedAt, 1000);
  assert.ok(Object.values(state.metrics).every((metric) => metric.value === null));
});

test('a measurement is specific to this visit and replaces earlier values without adding deltas', () => {
  const first = recordVital(visit(), { name: 'LCP', value: 750 }, 2000);
  const updated = recordVital(first, { name: 'LCP', value: 900 }, 3000);
  const otherVisitor = recordVital(visit(), { name: 'LCP', value: 2100 }, 2000);
  assert.equal(updated.metrics.lcp.value, 900);
  assert.equal(updated.metrics.lcp.recordedAt, 3000);
  assert.equal(otherVisitor.metrics.lcp.value, 2100);
  assert.equal(first.metrics.lcp.value, 750);
});

test('zero CLS is valid while invalid values do not become measurements', () => {
  assert.equal(recordVital(visit(), { name: 'CLS', value: 0 }, 2000).metrics.cls.value, 0);
  for (const value of [-1, NaN, Infinity]) {
    assert.equal(recordVital(visit(), { name: 'INP', value }, 2000).metrics.inp.value, null);
  }
});

test('only completed load events produce load time; restored pages do not reuse old timings', () => {
  assert.equal(recordLoad(visit(), { startTime: 0, loadEventEnd: 0 }, 2000).metrics.loadTime.value, null);
  assert.equal(recordLoad(visit(), { startTime: 0, loadEventEnd: 875 }, 2000).metrics.loadTime.value, 875);
  const restored = createVisit('https://kozikowski.it/about', 3000, true);
  assert.equal(recordLoad(restored, { startTime: 0, loadEventEnd: 875 }, 4000).metrics.loadTime.value, null);
});

test('transfer counts same-origin requests, includes repeats and keeps cached zero-byte transfers', () => {
  const first = recordResources(
    visit(),
    [
      resource('https://kozikowski.it/about', 1200, 'navigation'),
      resource('https://kozikowski.it/app.js', 300, 'script'),
      resource('https://kozikowski.it/photo.webp', 0),
      resource('https://open.spotify.com/embed', 5000, 'iframe'),
      resource('data:image/png;base64,AAAA', 900),
    ],
    2000,
  );
  assert.equal(first.metrics.transferred.value, 1500);
  assert.equal(first.metrics.javascriptTransferred.value, 300);
  assert.equal(first.metrics.resources.value, 3);
  const second = recordResources(first, [resource('https://kozikowski.it/app.js', 300, 'script')], 3000);
  assert.equal(second.metrics.transferred.value, 1800);
  assert.equal(second.metrics.resources.value, 4);
});

test('no observed resources is unknown; a real cached resource is a measured zero', () => {
  assert.equal(recordResources(visit(), [], 2000).metrics.transferred.value, null);
  const state = recordResources(visit(), [resource('https://kozikowski.it/app.js', 0, 'script')], 2000);
  assert.equal(state.metrics.transferred.value, 0);
  assert.equal(state.metrics.javascriptTransferred.value, 0);
});

test('restoring a visit clears previous values and starts a new measurement window', () => {
  const state = createVisit('https://kozikowski.it/resume', 3000, true);
  assert.equal(state.restored, true);
  assert.equal(state.metrics.lcp.value, null);
  assert.equal(state.metrics.transferred.value, null);
  assert.equal(state.page, 'https://kozikowski.it/resume');
});
