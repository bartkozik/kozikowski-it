import assert from 'node:assert/strict';
import { test } from 'node:test';

import * as layout from '../board-layout.ts';

test('direction controls move cards by the requested step without changing rotation', () => {
  assert.equal(typeof layout.nudgePosition, 'function');
  const start = { x: 200, y: 200, rotation: 5 };
  const size = { width: 430, height: 370 };
  for (const [direction, x, y] of [
    ['left', 180, 200],
    ['right', 220, 200],
    ['up', 200, 180],
    ['down', 200, 220],
  ] as const) {
    assert.deepEqual(layout.nudgePosition(start, direction, size, 1300), { x, y, rotation: 5 });
  }
  assert.equal(layout.nudgePosition(start, 'right', size, 1300, 60).x, 260);
});

test('repeated direction clicks cannot push cards beyond the board', () => {
  assert.equal(typeof layout.nudgePosition, 'function');
  let position = { x: 24, y: 24, rotation: 0 };
  const size = { width: 430, height: 370 };
  assert.strictEqual(layout.nudgePosition(position, 'left', size, 1300), position);
  for (let i = 0; i < 100; i++) position = layout.nudgePosition(position, 'down', size, 1700);
  assert.equal(position.y, 1306);
  assert.equal(layout.nudgePosition(position, 'down', size, 1300).y, 906);
});
