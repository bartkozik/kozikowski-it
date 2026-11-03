'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';

import { projects } from '@/core/content/projects';
import { getProjectDetails } from '@/core/content/project-details';
import { getProjectVisual } from '@/core/content/project-visuals';

import {
  BOARD_WIDTH,
  constrainPosition,
  constrainPositions,
  movedBeyondThreshold,
  shuffledPositions,
  type CardPosition,
  type CardDimensions,
} from './board-layout';
import { cardPresets } from './card-presets';
import { createDragClickGuard } from './drag-click-guard';
import styles from './Home.module.scss';

type Arrangement = 'original' | 'loved' | 'painful' | 'shuffle';
type DragState = {
  index: number;
  pointerId: number;
  startX: number;
  startY: number;
  position: CardPosition;
  scale: number;
  moved: boolean;
};

export function Home() {
  const [positions, setPositions] = useState<readonly CardPosition[]>(cardPresets);
  const [order, setOrder] = useState(cardPresets.map((_, index) => index));
  const [arrangement, setArrangement] = useState<Arrangement>('original');
  const [announcement, setAnnouncement] = useState('');
  const drag = useRef<DragState | null>(null);
  const [clickGuard] = useState(createDragClickGuard);
  const canvas = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const dimensions = useRef<readonly CardDimensions[]>([]);

  const measureCards = useCallback(() => {
    const stageWidth = canvas.current?.getBoundingClientRect().width;
    if (!stageWidth || cards.current.filter(Boolean).length !== cardPresets.length) return null;
    const scale = stageWidth / BOARD_WIDTH;
    const measured = cards.current.map((card) => ({
      width: card!.offsetWidth / scale,
      height: card!.offsetHeight / scale,
    }));
    dimensions.current = measured;
    return { scale, dimensions: measured };
  }, []);

  useEffect(() => {
    const stage = canvas.current;
    if (!stage) return;
    const desktop = window.matchMedia('(min-width: 1100px) and (pointer: fine)');
    let frame = 0;

    function measure() {
      frame = 0;
      if (!desktop.matches) return;
      const measurement = measureCards();
      if (measurement) setPositions((current) => constrainPositions(current, measurement.dimensions));
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

  function bringToFront(index: number) {
    setOrder((current) => [...current.filter((item) => item !== index), index]);
  }

  function beginDrag(event: PointerEvent<HTMLAnchorElement>, index: number) {
    clickGuard.reset();
    if (event.button !== 0 || !window.matchMedia('(min-width: 1100px) and (pointer: fine)').matches) return;
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

  function keyboardMove(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    if (
      !window.matchMedia('(min-width: 1100px) and (pointer: fine)').matches ||
      !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)
    )
      return;
    event.preventDefault();
    const step = event.shiftKey ? 60 : 20;
    const measurement = measureCards();
    const size = measurement?.dimensions[index];
    if (!size) return;
    bringToFront(index);
    setPositions((current) =>
      current.map((position, item) =>
        item === index
          ? constrainPosition(
              {
                ...position,
                x: position.x + (event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0),
                y: position.y + (event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0),
              },
              size.width,
              size.height,
            )
          : position,
      ),
    );
    setAnnouncement('Card moved. Press Enter to open the project.');
  }

  function arrange(mode: Arrangement) {
    const measurement = measureCards();
    if (!measurement) return;
    setArrangement(mode);
    if (mode === 'shuffle') {
      setPositions(shuffledPositions(measurement.dimensions, Math.random));
      setOrder(cardPresets.map((_, index) => index));
    } else {
      const featured =
        mode === 'loved'
          ? ['epoca-landing-page', 'celina', 'pm-traffic-manager']
          : mode === 'painful'
            ? ['art-network', 'board-dev', 'epoca']
            : [];
      const arranged = cardPresets.map((position) => {
        const rank = featured.indexOf(position.slug);
        return rank < 0
          ? position
          : { ...position, x: 60 + rank * 330, y: rank === 1 ? 150 : 70, rotation: rank === 1 ? 4 : -3 };
      });
      setPositions(constrainPositions(arranged, measurement.dimensions));
      const indices = cardPresets.map((_, index) => index);
      setOrder([
        ...indices.filter((index) => !featured.includes(cardPresets[index].slug)),
        ...featured.map((slug) => cardPresets.findIndex((card) => card.slug === slug)),
      ]);
    }
    setAnnouncement(
      mode === 'original'
        ? 'Original layout restored.'
        : mode === 'shuffle'
          ? 'Cards shuffled.'
          : mode === 'loved'
            ? 'Projects with end-to-end ownership brought to the front.'
            : 'Projects with complex workflows brought to the front.',
    );
  }

  return (
    <main className={styles.home} id="main-content">
      <header className={styles.header}>
        <h1>Bartosz Kozikowski</h1>
        <Link className={styles.contact} href="/contact">
          Contact <span aria-hidden="true">↗</span>
        </Link>
      </header>
      <div className={styles.workspace}>
        <aside className={styles.sidebar}>
          <nav aria-label="Portfolio">
            <h2>Projects</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`}>
                    {project.name}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.personalLinks}>
              <Link href="/about">
                About me <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/resume">
                Resume <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </nav>
          <p className={styles.intro}>
            Full stack developer. <br />
            React, TypeScript &amp; a little curiosity.
            <br />
            <span>Based in Warsaw. Working everywhere.</span>
          </p>
        </aside>
        <section className={styles.board} aria-label="Project cards">
          <div className={styles.toolbar}>
            <div className={styles.sortButtons}>
              <button
                type="button"
                aria-pressed={arrangement === 'loved'}
                title="Projects with end-to-end ownership"
                onClick={() => arrange('loved')}
              >
                Most loved
              </button>
              <button
                type="button"
                aria-pressed={arrangement === 'painful'}
                title="Complex workflows and technical challenges"
                onClick={() => arrange('painful')}
              >
                Most painful
              </button>
              <button type="button" onClick={() => arrange('shuffle')}>
                Shuffle <span aria-hidden="true">↝</span>
              </button>
            </div>
            <button type="button" className={styles.reset} onClick={() => arrange('original')}>
              Reset layout
            </button>
          </div>
          <p className={styles.instructions} id="card-instructions">
            Drag a title to move a card. Click to explore. <span>Keyboard: arrow keys to move, Enter to open.</span>
          </p>
          <div className={styles.canvas} ref={canvas}>
            {cardPresets.map((preset, index) => {
              const project = projects.find((item) => item.slug === preset.slug)!;
              const visual = getProjectVisual(project.slug);
              const details = getProjectDetails(project.slug);
              const position = positions[index];
              const cardStyle = {
                '--x': position.x,
                '--y': position.y,
                '--width': preset.width,
                '--rotation': `${position.rotation}deg`,
                '--image-ratio': preset.imageRatio,
                '--mobile-order': projects.indexOf(project),
                zIndex: order.indexOf(index) + 1,
              } as CSSProperties;
              return (
                <article
                  className={styles.card}
                  key={project.slug}
                  ref={(element) => {
                    cards.current[index] = element;
                  }}
                  style={cardStyle}
                  onFocus={() => bringToFront(index)}
                >
                  <div className={styles.cardHeader}>
                    <Link
                      className={styles.cardTitle}
                      href={`/projects/${project.slug}`}
                      aria-describedby="card-instructions"
                      onPointerDown={(event) => beginDrag(event, index)}
                      onPointerMove={moveCard}
                      onPointerUp={(event) => endDrag(event)}
                      onPointerCancel={(event) => endDrag(event, true)}
                      onLostPointerCapture={(event) => endDrag(event, true)}
                      onDragStart={(event) => event.preventDefault()}
                      onKeyDown={(event) => keyboardMove(event, index)}
                      onClick={(event) => {
                        if (clickGuard.consume(index, event.detail)) event.preventDefault();
                      }}
                    >
                      {project.name}
                    </Link>
                    <Image src="/assets/arrow-right-up.svg" width={24} height={24} alt="" />
                  </div>
                  <p className={styles.tagline}>{project.tagline}</p>
                  <Link className={styles.preview} href={`/projects/${project.slug}`} tabIndex={-1}>
                    {visual ? (
                      <Image
                        src={visual.src}
                        alt={visual.alt}
                        width={visual.width}
                        height={visual.height}
                        sizes="(max-width: 699px) 90vw, (max-width: 1099px) 45vw, 30vw"
                        draggable={false}
                        loading={['liquid-editions', 'fanimani', 'board-dev'].includes(project.slug) ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <div className={styles.typePreview}>
                        <span className={styles.projectNumber}>
                          {String(projects.indexOf(project) + 1).padStart(2, '0')}
                        </span>
                        <strong>{project.name}</strong>
                        <p>{details?.stack.slice(0, 4).join(' / ')}</p>
                        <span className={styles.previewLabel}>
                          {project.resources.some((resource) => resource.kind === 'source')
                            ? 'Explore the application & source'
                            : 'Explore the case study'}{' '}
                          ↗
                        </span>
                      </div>
                    )}
                  </Link>
                </article>
              );
            })}
          </div>
          <p className={styles.announcement} role="status" aria-live="polite">
            {announcement}
          </p>
        </section>
      </div>
    </main>
  );
}
