export function createDragClickGuard() {
  let suppressedCard: number | null = null;

  return {
    reset() {
      suppressedCard = null;
    },
    finish(cardIndex: number, moved: boolean, cancelled: boolean) {
      suppressedCard = moved && !cancelled ? cardIndex : null;
    },
    consume(cardIndex: number, clickDetail: number): boolean {
      const suppressed = clickDetail > 0 && suppressedCard === cardIndex;
      suppressedCard = null;
      return suppressed;
    },
  };
}
