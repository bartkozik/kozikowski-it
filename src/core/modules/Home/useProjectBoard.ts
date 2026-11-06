import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type SetStateAction,
} from 'react';

import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  constrainPosition,
  constrainPositions,
  movedBeyondThreshold,
  shuffledPositions,
  nudgePosition,
  hasLayoutChanges,
  resizeLayout,
  type BoardLayout,
  type MoveDirection,
  type CardPosition,
  type CardDimensions,
} from './board-layout';
import { cardPresets } from './card-presets';
import {
  isProjectVisible,
  nextArrangement,
  projectFilters,
  filterReducer,
  initialFilterState,
  type Arrangement,
  type ProjectFilter,
} from './project-filters';
import { createDragClickGuard } from './drag-click-guard';

const desktopBoardQuery = '(min-width: 1100px) and (pointer: fine)';
const keyboardDirections: Readonly<Record<string, MoveDirection | undefined>> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
};

const arrangementAnnouncements: Record<ProjectFilter, { selected: string; shuffled: string }> = {
  original: {
    selected: 'All projects shown. Original layout restored.',
    shuffled: 'All projects shuffled.',
  },
  loved: {
    selected: 'Showing 3 projects: EPOCA, Board.Dev and PM Traffic Manager.',
    shuffled: 'Most loved projects shuffled. Filter remains active.',
  },
  painful: {
    selected: 'Showing 2 projects: Ad Template Platform and Art Network.',
    shuffled: 'Most painful projects shuffled. Filter remains active.',
  },
};

type DragState = {
  index: number;
  pointerId: number;
  startX: number;
  startY: number;
  position: CardPosition;
  scale: number;
  moved: boolean;
};

function positionsForFilter(mode: Arrangement): readonly CardPosition[] {
  const featured = mode === 'loved' || mode === 'painful' ? projectFilters[mode] : [];
  return cardPresets.map((position) => {
    const rank = featured.indexOf(position.slug);
    if (rank < 0) return position;
    const y = rank === 1 ? 150 : 70;
    const rotation = rank === 1 ? 4 : -3;
    return { ...position, x: 60 + rank * 330, y, rotation };
  });
}

export function useProjectBoard() {
  const [layout, setLayout] = useState<BoardLayout>({ positions: cardPresets, baseline: cardPresets });
  const { positions, baseline } = layout;

  function setPositions(update: SetStateAction<readonly CardPosition[]>) {
    setLayout((current) => ({
      ...current,
      positions: typeof update === 'function' ? update(current.positions) : update,
    }));
  }
  const [previewPositions, setPreviewPositions] = useState<readonly CardPosition[] | null>(null);
  const [order, setOrder] = useState(cardPresets.map((_, index) => index));
  const [filterState, dispatchFilter] = useReducer(filterReducer, initialFilterState);
  const { arrangement } = filterState;
  const visibleArrangement = filterState.preview ?? arrangement;
  const [announcement, setAnnouncement] = useState('');
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [focusedProject, setFocusedProject] = useState<string | null>(null);
  const highlightCandidate = focusedProject ?? hoveredProject;
  const highlightedProject =
    highlightCandidate && isProjectVisible(highlightCandidate, visibleArrangement) ? highlightCandidate : null;
  const drag = useRef<DragState | null>(null);
  const [clickGuard] = useState(createDragClickGuard);
  const canvas = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const dimensions = useRef<readonly CardDimensions[]>([]);
  const boardHeight = useRef(BOARD_HEIGHT);

  const measureCards = useCallback(() => {
    const stageBounds = canvas.current?.getBoundingClientRect();
    const stageWidth = stageBounds?.width;
    if (!stageWidth || cards.current.filter(Boolean).length !== cardPresets.length) return null;
    const scale = stageWidth / BOARD_WIDTH;
    const measured = cards.current.map((card, index) => {
      if (card!.hidden && dimensions.current[index]) return dimensions.current[index];
      return { width: card!.offsetWidth / scale, height: card!.offsetHeight / scale };
    });
    dimensions.current = measured;
    boardHeight.current = stageBounds.height / scale;
    return { scale, dimensions: measured, height: boardHeight.current };
  }, []);

  useEffect(() => {
    const stage = canvas.current;
    if (!stage) return;
    const desktop = window.matchMedia(desktopBoardQuery);
    let frame = 0;

    function measure() {
      frame = 0;
      if (!desktop.matches) return;
      const measurement = measureCards();
      if (measurement) {
        setLayout((current) => resizeLayout(current, cardPresets, measurement.dimensions, measurement.height));
      }
    }

    function scheduleMeasurement() {
      if (!frame) frame = window.requestAnimationFrame(measure);
    }

    const observer = new ResizeObserver(scheduleMeasurement);
    observer.observe(stage);
    cards.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    desktop.addEventListener('change', scheduleMeasurement);
    scheduleMeasurement();

    return () => {
      observer.disconnect();
      desktop.removeEventListener('change', scheduleMeasurement);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [measureCards]);

  function registerCard(index: number, element: HTMLElement | null) {
    cards.current[index] = element;
  }

  function bringToFront(index: number) {
    setOrder((current) => [...current.filter((item) => item !== index), index]);
  }

  function beginDrag(event: PointerEvent<HTMLAnchorElement>, index: number) {
    setEntranceComplete(true);
    clickGuard.reset();
    if (event.button !== 0 || !window.matchMedia(desktopBoardQuery).matches) return;
    const measurement = measureCards();
    if (!measurement) return;
    bringToFront(index);
    drag.current = {
      index,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      position: positions[index],
      scale: measurement.scale,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveCard(event: PointerEvent<HTMLAnchorElement>) {
    const active = drag.current;
    if (!active || active.pointerId !== event.pointerId) return;
    if (
      !active.moved &&
      !movedBeyondThreshold({ x: active.startX, y: active.startY }, { x: event.clientX, y: event.clientY })
    )
      return;
    active.moved = true;
    const size = dimensions.current[active.index];
    if (!size) return;
    const position = constrainPosition(
      {
        ...active.position,
        x: active.position.x + (event.clientX - active.startX) / active.scale,
        y: active.position.y + (event.clientY - active.startY) / active.scale,
      },
      size.width,
      size.height,
      boardHeight.current,
    );
    setPositions((current) => current.map((item, index) => (index === active.index ? position : item)));
  }

  function endDrag(event: PointerEvent<HTMLAnchorElement>, cancel = false) {
    const active = drag.current;
    if (!active || active.pointerId !== event.pointerId) return;
    clickGuard.finish(active.index, active.moved, cancel);
    if (cancel)
      setPositions((current) =>
        constrainPositions(
          current.map((item, index) => (index === active.index ? active.position : item)),
          dimensions.current,
          boardHeight.current,
        ),
      );
    if (active.moved)
      setAnnouncement(
        cancel ? 'Card movement cancelled.' : 'Card moved. Use Reset layout to restore the original arrangement.',
      );
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function nudgeCard(index: number, direction: MoveDirection, step = 20) {
    if (!window.matchMedia(desktopBoardQuery).matches) return;
    const measurement = measureCards();
    const size = measurement?.dimensions[index];
    if (!size) return;
    setEntranceComplete(true);
    bringToFront(index);
    setPositions((current) =>
      current.map((position, item) =>
        item === index ? nudgePosition(position, direction, size, measurement.height, step) : position,
      ),
    );
    setAnnouncement('Card moved. Use Reset layout to restore the original arrangement.');
  }

  function keyboardMove(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    const direction = keyboardDirections[event.key];
    if (!direction || !window.matchMedia(desktopBoardQuery).matches) return;
    event.preventDefault();
    nudgeCard(index, direction, event.shiftKey ? 60 : 20);
  }

  function previewFilter(event: PointerEvent<HTMLButtonElement>, filter: ProjectFilter) {
    if (event.pointerType !== 'mouse') return;
    setEntranceComplete(true);
    const arranged = positionsForFilter(filter);
    const measurement = window.matchMedia(desktopBoardQuery).matches ? measureCards() : null;
    setPreviewPositions(
      measurement ? constrainPositions(arranged, measurement.dimensions, measurement.height) : arranged,
    );
    dispatchFilter({ type: 'preview', filter });
  }

  function clearFilterPreview() {
    dispatchFilter({ type: 'leave' });
  }

  function arrange(requested: Arrangement) {
    const mode = nextArrangement(arrangement, requested);
    setEntranceComplete(true);
    const measurement = window.matchMedia(desktopBoardQuery).matches ? measureCards() : null;
    dispatchFilter({ type: 'select', arrangement: requested });
    setHoveredProject(null);
    setFocusedProject(null);
    if (requested === 'shuffle') {
      const visibleIndices = cardPresets.flatMap((card, index) => (isProjectVisible(card.slug, mode) ? [index] : []));
      if (measurement) {
        const shuffled = shuffledPositions(
          visibleIndices.map((index) => measurement.dimensions[index]),
          Math.random,
          measurement.height,
        );
        setPositions((current) => {
          const next = [...current];
          visibleIndices.forEach((index, rank) => {
            next[index] = shuffled[rank];
          });
          return next;
        });
      }
      setOrder((current) => [...current.filter((index) => !visibleIndices.includes(index)), ...visibleIndices]);
    } else {
      const featured = mode === 'loved' || mode === 'painful' ? projectFilters[mode] : [];
      const arranged = positionsForFilter(mode);
      const nextPositions = measurement
        ? constrainPositions(arranged, measurement.dimensions, measurement.height)
        : arranged;
      if (mode === 'original') setLayout({ positions: nextPositions, baseline: nextPositions });
      else setPositions(nextPositions);
      const indices = cardPresets.map((_, index) => index);
      setOrder([
        ...indices.filter((index) => !featured.includes(cardPresets[index].slug)),
        ...featured.map((slug) => cardPresets.findIndex((card) => card.slug === slug)),
      ]);
    }
    const filter = mode === 'shuffle' ? 'original' : mode;
    const action = requested === 'shuffle' ? 'shuffled' : 'selected';
    setAnnouncement(arrangementAnnouncements[filter][action]);
  }

  return {
    canReset: arrangement !== 'original' || hasLayoutChanges(positions, baseline),
    positions: filterState.preview !== null && previewPositions ? previewPositions : positions,
    order,
    arrangement,
    visibleArrangement,
    previewFilter,
    clearFilterPreview,
    announcement,
    entranceComplete,
    highlightedProject,
    canvas,
    registerCard,
    clickGuard,
    setEntranceComplete,
    setHoveredProject,
    setFocusedProject,
    bringToFront,
    beginDrag,
    moveCard,
    endDrag,
    keyboardMove,
    arrange,
  };
}
