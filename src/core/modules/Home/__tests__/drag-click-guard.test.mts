import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createDragClickGuard } from '../drag-click-guard.ts';

test('a completed drag suppresses only its own immediate pointer click', () => {
  const guard = createDragClickGuard();
  guard.finish(2, true, false);
  assert.equal(guard.consume(2, 1), true);
  assert.equal(guard.consume(2, 1), false);
});

test('cancelling a drag leaves other cards and keyboard navigation available', () => {
  const guard = createDragClickGuard();
  guard.finish(2, true, true);
  assert.equal(guard.consume(2, 1), false);
  assert.equal(guard.consume(3, 1), false);
  assert.equal(guard.consume(2, 0), false);
});

test('an unconsumed drag click never blocks Enter on the same card', () => {
  const guard = createDragClickGuard();
  guard.finish(2, true, false);
  assert.equal(guard.consume(2, 0), false);
  assert.equal(guard.consume(2, 1), false);
});

test('an unconsumed drag click never blocks another card or a fresh pointer gesture', () => {
  const guard = createDragClickGuard();
  guard.finish(2, true, false);
  assert.equal(guard.consume(3, 1), false);
  guard.finish(2, true, false);
  guard.reset();
  assert.equal(guard.consume(2, 1), false);
});

test('a click without dragging remains a normal link activation', () => {
  const guard = createDragClickGuard();
  guard.finish(2, false, false);
  assert.equal(guard.consume(2, 1), false);
});
