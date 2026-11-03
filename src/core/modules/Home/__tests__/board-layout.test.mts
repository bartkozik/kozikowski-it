import assert from 'node:assert/strict';
import { test } from 'node:test';

import { constrainPosition, constrainPositions, movedBeyondThreshold, shuffledPositions } from '../board-layout.ts';

test('a dragged card keeps its title within the board even far beyond the edges', () => {
  assert.deepEqual(constrainPosition({ x: -200, y: 1800, rotation: 0 }, 430, 370), {
    x: 24,
    y: 906,
    rotation: 0,
  });
  assert.equal(constrainPosition({ x: 1600, y: -100, rotation: 0 }, 586, 440).x, 760);
});

test('rotated cards reserve room on every edge', () => {
  const result = constrainPosition({ x: -100, y: -100, rotation: 10 }, 430, 600);
  assert.ok(result.x > 100);
  assert.equal(result.y, 24);
  const negative = constrainPosition({ x: 0, y: 0, rotation: -10 }, 430, 600);
  assert.ok(negative.y > 70);
});

test('small pointer movement remains a click but an intentional drag does not', () => {
  assert.equal(movedBeyondThreshold({ x: 100, y: 100 }, { x: 103, y: 103 }), false);
  assert.equal(movedBeyondThreshold({ x: 100, y: 100 }, { x: 104, y: 104 }), true);
});

test('shuffle preserves all cards and places their titles inside the board', () => {
  let seed = 7;
  const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const positions = shuffledPositions(
    [430, 586, 430, 430, 586].map((width) => ({ width, height: 600 })),
    random,
  );
  assert.equal(positions.length, 5);
  assert.equal(new Set(positions.map(({ x, y }) => `${x},${y}`)).size, 5);
  assert.ok(
    positions.every(({ x, y, rotation }) => x >= 24 && x <= 916 && y >= 24 && y < 900 && Math.abs(rotation) <= 10),
  );
});

test('shuffle fits each rotated card using its measured height', () => {
  const dimensions = [
    { width: 430, height: 707 },
    { width: 586, height: 830 },
    { width: 430, height: 960 },
  ];
  const positions = shuffledPositions(dimensions, () => 0.999);

  positions.forEach((position, index) => {
    const { width, height } = dimensions[index];
    const radians = (position.rotation * Math.PI) / 180;
    const corners = [
      [0, 0],
      [width, 0],
      [0, height],
      [width, height],
    ].map(([x, y]) => ({
      x: position.x + x * Math.cos(radians) - y * Math.sin(radians),
      y: position.y + x * Math.sin(radians) + y * Math.cos(radians),
    }));

    assert.ok(corners.every(({ x }) => x >= 24 - 1e-8 && x <= 1370 - 24 + 1e-8));
    assert.ok(corners.every(({ y }) => y >= 24 - 1e-8 && y <= 1300 - 24 + 1e-8));
  });
});

test('an already bounded card retains its position reference after repeated measurements', () => {
  const position = { x: 200, y: 200, rotation: 5 };
  assert.strictEqual(constrainPosition(position, 430, 707), position);
});

test('resize reclamps a card that becomes taller in board coordinates without changing safe cards', () => {
  const stable = { x: 200, y: 100, rotation: 0 };
  const positions = [stable, { x: 800, y: 800, rotation: 0 }];
  const resized = constrainPositions(positions, [
    { width: 430, height: 450 },
    { width: 430, height: 700 },
  ]);
  assert.strictEqual(resized[0], stable);
  assert.equal(resized[1].y, 576);
  assert.strictEqual(
    constrainPositions(resized, [
      { width: 430, height: 450 },
      { width: 430, height: 700 },
    ]),
    resized,
  );
});
