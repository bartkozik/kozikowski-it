import assert from 'node:assert/strict';
import test from 'node:test';

import { formatMetricValue } from '../metric-format.ts';

test('missing and invalid measurements never become metric claims', () => {
  for (const value of [null, Number.NaN, Number.POSITIVE_INFINITY, -1]) {
    assert.equal(formatMetricValue(value, 'ms'), 'Not measured');
  }
});

test('a measured zero remains a measured value', () => {
  assert.equal(formatMetricValue(0, 'ms'), '0 ms');
  assert.equal(formatMetricValue(0, 'score'), '0/100');
});

test('transfer sizes use explicit binary units', () => {
  assert.equal(formatMetricValue(1024, 'bytes'), '1 KiB');
  assert.equal(formatMetricValue(1572864, 'bytes'), '1.5 MiB');
});

test('timings and Lighthouse scores preserve their units', () => {
  assert.equal(formatMetricValue(247.8, 'ms'), '247.8 ms');
  assert.equal(formatMetricValue(19.75, 's'), '19.8 s');
  assert.equal(formatMetricValue(98, 'score'), '98/100');
  assert.equal(formatMetricValue(101, 'score'), 'Not measured');
});
