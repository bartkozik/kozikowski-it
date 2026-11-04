import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';
import { ProgressiveImage } from '@/core/modules/ProgressiveImage/ProgressiveImage';
import Link from 'next/link';
import { ViewTransition, type CSSProperties } from 'react';

import { projects, type PortfolioProject } from '@/core/content/projects';
import { getPunkProjectCopy } from '@/core/content/punk-project-copy';
import { getProjectVisual } from '@/core/content/project-visuals';
import { useExperience } from '@/core/modules/Experience/ExperienceProvider';
import { ImplantUpgrade } from '@/core/modules/Experience/ImplantUpgrade';

import { cardPresets } from './card-presets';
import { isProjectVisible } from './project-filters';
import type { useProjectBoard } from './useProjectBoard';
import styles from './Home.module.scss';

interface ProjectCardProps {
  readonly project: PortfolioProject;
  readonly index: number;
  readonly board: ReturnType<typeof useProjectBoard>;
}

export function ProjectCard({ project, index, board }: ProjectCardProps) {
  const { mode, loadout } = useExperience();
  const punk = mode === 'punk';
  const {
    positions,
    order,
    highlightedProject,
    visibleArrangement,
    registerCard,
    setEntranceComplete,
    setHoveredProject,
    setFocusedProject,
    bringToFront,
    beginDrag,
    moveCard,
    endDrag,
    keyboardMove,
    clickGuard,
  } = board;
  const preset = cardPresets[index];
  const visual = getProjectVisual(project.slug);
  const position = positions[index];
  const cardStyle = {
    '--x': position.x,
    '--y': position.y,
    '--width': preset.width,
    '--rotation': `${position.rotation}deg`,
    '--image-ratio': preset.imageRatio,
    '--entrance-delay': `${index * 45}ms`,
    '--entrance-x': `${index % 2 === 0 ? -100 : 100}px`,
    '--entrance-y': `${index % 3 === 0 ? -120 : 140}px`,
    '--entrance-rotation': `${index % 2 === 0 ? -12 : 12}deg`,
    zIndex: highlightedProject === project.slug ? cardPresets.length + 1 : order.indexOf(index) + 1,
  } as CSSProperties;
  return (
    <ViewTransition name={`project-${project.slug}`} share="project-expand" default="none">
      <article
        className={styles.card}
        hidden={!isProjectVisible(project.slug, visibleArrangement)}
        ref={(element) => registerCard(index, element)}
        style={cardStyle}
        data-installed={(punk && loadout.installed.includes(project.slug)) || undefined}
        data-highlighted={highlightedProject === project.slug || undefined}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && index === cardPresets.length - 1) setEntranceComplete(true);
        }}
        data-muted={(highlightedProject !== null && highlightedProject !== project.slug) || undefined}
        onPointerEnter={(event) => {
          if (event.pointerType !== 'touch') setHoveredProject(project.slug);
        }}
        onPointerLeave={() => setHoveredProject(null)}
        onFocus={(event) => {
          bringToFront(index);
          if (event.target instanceof HTMLElement && event.target.matches(':focus-visible'))
            setFocusedProject(project.slug);
        }}
        onBlur={() => setFocusedProject(null)}
      >
        <div className={styles.cardHeader}>
          <ViewTransition name={`project-title-${project.slug}`} share="project-title" default="none">
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
          </ViewTransition>
          <ArrowIcon />
        </div>
        <p className={styles.tagline}>{(punk && getPunkProjectCopy(project.slug)?.tagline) || project.tagline}</p>
        <ViewTransition name={`project-image-${project.slug}`} share="project-image" default="none">
          <Link className={styles.preview} href={`/projects/${project.slug}`} tabIndex={-1}>
            {visual ? (
              <ProgressiveImage
                src={visual}
                alt={visual.alt}
                fill
                position="top"
                sizes="(max-width: 699px) 90vw, (max-width: 1099px) 45vw, 30vw"
                draggable={false}
                loading={['liquid-editions', 'fanimani', 'board-dev'].includes(project.slug) ? 'eager' : 'lazy'}
              />
            ) : (
              <div className={styles.typePreview}>
                <span className={styles.projectNumber}>
                  {String(projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, '0')}
                </span>
                <strong>{project.name}</strong>
                <span className={styles.previewLabel}>
                  {project.resources.some((resource) => resource.kind === 'source')
                    ? 'Explore the application & source'
                    : 'Explore the case study'}{' '}
                  <ArrowIcon size={16} />
                </span>
              </div>
            )}
          </Link>
        </ViewTransition>
        {punk && <ImplantUpgrade slug={project.slug} />}
      </article>
    </ViewTransition>
  );
}
