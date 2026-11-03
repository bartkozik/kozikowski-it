export function advanceTicker(position: number, elapsedMs: number, cycleWidth: number): number {
  if (cycleWidth <= 0) return 0;
  return (position + Math.max(0, Math.min(elapsedMs, 100)) * 0.04) % cycleWidth;
}

export function tooltipLeft(anchorCenter: number, viewportWidth: number, tooltipWidth: number): number {
  return Math.max(12, Math.min(anchorCenter - tooltipWidth / 2, viewportWidth - tooltipWidth - 12));
}
