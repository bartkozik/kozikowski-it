import assert from 'node:assert/strict';
import { test } from 'node:test';

import * as layout from '../board-layout.ts';

test('directional movement shifts cards by the requested step without changing rotation', () => {
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

test('repeated directional movements cannot push cards beyond the board', () => {
  assert.equal(typeof layout.nudgePosition, 'function');
  let position = { x: 24, y: 24, rotation: 0 };
  const size = { width: 430, height: 370 };
  assert.strictEqual(layout.nudgePosition(position, 'left', size, 1300), position);
  for (let i = 0; i < 100; i++) position = layout.nudgePosition(position, 'down', size, 1700);
  assert.equal(position.y, 1306);
  assert.equal(layout.nudgePosition(position, 'down', size, 1300).y, 906);
});

test('automatic viewport clamping does not make the original layout resettable', () => {
  assert.equal(typeof layout.hasLayoutChanges, 'function');
  const presets = [{ x: 1100, y: 1200, rotation: 7 }];
  const dimensions = [{ width: 430, height: 500 }];
  const baseline = layout.constrainPositions(presets, dimensions, 1300);
  assert.notDeepEqual(baseline, presets);
  assert.equal(
    layout.hasLayoutChanges(
      baseline,
      baseline.map((position) => ({ ...position })),
    ),
    false,
  );
});

test('moving a card enables reset and returning to its original position disables it', () => {
  assert.equal(typeof layout.hasLayoutChanges, 'function');
  const baseline = [{ x: 200, y: 200, rotation: 5 }];
  const size = { width: 430, height: 370 };
  const moved = [layout.nudgePosition(baseline[0], 'right', size, 1300)];
  assert.equal(layout.hasLayoutChanges(moved, baseline), true);
  const restored = [layout.nudgePosition(moved[0], 'left', size, 1300)];
  assert.equal(layout.hasLayoutChanges(restored, baseline), false);
  assert.equal(layout.hasLayoutChanges([{ ...baseline[0], rotation: 6 }], baseline), true);
});

test('resizing a clean board keeps reset disabled while preserving a moved card', () => {
  const presets = [{ x: 900, y: 1000, rotation: 0 }];
  const smallCards = [{ width: 300, height: 250 }];
  const largeCards = [{ width: 500, height: 550 }];
  const initial = { positions: presets, baseline: presets };
  const resized = layout.resizeLayout(initial, presets, largeCards, 1300);
  assert.equal(layout.hasLayoutChanges(resized.positions, resized.baseline), false);
  const restoredSize = layout.resizeLayout(resized, presets, smallCards, 1300);
  assert.deepEqual(restoredSize.positions, presets);
  const moved = { ...initial, positions: [{ ...presets[0], x: 200 }] };
  const resizedMoved = layout.resizeLayout(moved, presets, largeCards, 1300);
  assert.equal(resizedMoved.positions[0].x, 200);
  assert.equal(layout.hasLayoutChanges(resizedMoved.positions, resizedMoved.baseline), true);
});
