export const BOARD_WIDTH = 1370;
export const BOARD_HEIGHT = 1300;

export interface CardPosition {
  readonly x: number;
  readonly y: number;
  readonly rotation: number;
}

export interface CardDimensions {
  readonly width: number;
  readonly height: number;
}

export function constrainPosition(
  position: CardPosition,
  width: number,
  height: number,
  boardHeight = BOARD_HEIGHT,
): CardPosition {
  const radians = (position.rotation * Math.PI) / 180;
  const horizontal = Math.sin(radians) * height;
  const vertical = Math.sin(radians) * width;
  const minX = 24 + Math.max(0, horizontal);
  const maxX = BOARD_WIDTH - 24 - Math.cos(radians) * width + Math.min(0, horizontal);
  const minY = 24 - Math.min(0, vertical);
  const maxY = boardHeight - 24 - Math.cos(radians) * height - Math.max(0, vertical);
  const x = Math.max(minX, Math.min(maxX, position.x));
  const y = Math.max(minY, Math.min(maxY, position.y));

  return x === position.x && y === position.y ? position : { ...position, x, y };
}

export function constrainPositions(
  positions: readonly CardPosition[],
  dimensions: readonly CardDimensions[],
  boardHeight = BOARD_HEIGHT,
): readonly CardPosition[] {
  const next = positions.map((position, index) => {
    const size = dimensions[index];
    return size ? constrainPosition(position, size.width, size.height, boardHeight) : position;
  });

  return next.every((position, index) => position === positions[index]) ? positions : next;
}

export function movedBeyondThreshold(start: { x: number; y: number }, end: { x: number; y: number }): boolean {
  return Math.hypot(end.x - start.x, end.y - start.y) > 5;
}

export function shuffledPositions(
  dimensions: readonly CardDimensions[],
  random: () => number,
  boardHeight = BOARD_HEIGHT,
): CardPosition[] {
  return dimensions.map(({ width, height }, index) =>
    constrainPosition(
      {
        x: 30 + random() * (BOARD_WIDTH - width - 60),
        y: 40 + ((index * 137 + random() * 300) % 650),
        rotation: random() * 20 - 10,
      },
      width,
      height,
      boardHeight,
    ),
  );
}

export type MoveDirection = 'left' | 'right' | 'up' | 'down';

const moveOffsets: Readonly<Record<MoveDirection, { x: number; y: number }>> = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
};

export function nudgePosition(
  position: CardPosition,
  direction: MoveDirection,
  size: CardDimensions,
  boardHeight: number,
  step = 20,
): CardPosition {
  const offset = moveOffsets[direction];
  const next = constrainPosition(
    {
      ...position,
      x: position.x + offset.x * step,
      y: position.y + offset.y * step,
    },
    size.width,
    size.height,
    boardHeight,
  );
  return next.x === position.x && next.y === position.y ? position : next;
}

export function hasLayoutChanges(positions: readonly CardPosition[], baseline: readonly CardPosition[]): boolean {
  return (
    positions.length !== baseline.length ||
    positions.some((position, index) => {
      const original = baseline[index];
      return position.x !== original.x || position.y !== original.y || position.rotation !== original.rotation;
    })
  );
}

export interface BoardLayout {
  readonly positions: readonly CardPosition[];
  readonly baseline: readonly CardPosition[];
}

export function resizeLayout(
  layout: BoardLayout,
  presets: readonly CardPosition[],
  dimensions: readonly CardDimensions[],
  height: number,
): BoardLayout {
  const baseline = constrainPositions(presets, dimensions, height);
  const positions = hasLayoutChanges(layout.positions, layout.baseline)
    ? constrainPositions(layout.positions, dimensions, height)
    : baseline;
  return { positions, baseline };
}
