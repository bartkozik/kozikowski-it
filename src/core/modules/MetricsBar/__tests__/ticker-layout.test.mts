import assert from 'node:assert/strict';
import test from 'node:test';

import { advanceTicker, tooltipLeft } from '../ticker-layout.ts';

test('ticker wraps seamlessly into the identical next copy', () => {
  assert.equal(advanceTicker(998, 100, 1000), 2);
  assert.equal(advanceTicker(450, 25, 1000), 451);
});

test('background tabs cannot produce a large jump on resume', () => {
  assert.equal(advanceTicker(100, 60000, 1000), 104);
  assert.equal(advanceTicker(100, -10, 1000), 100);
  assert.equal(advanceTicker(100, 20, 0), 0);
});

test('tooltips stay inside the viewport at both ends of the ticker', () => {
  assert.equal(tooltipLeft(10, 1280, 360), 12);
  assert.equal(tooltipLeft(1270, 1280, 360), 908);
  assert.equal(tooltipLeft(640, 1280, 360), 460);
  assert.equal(tooltipLeft(390, 390, 366), 12);
});
