import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';
import Link from 'next/link';
import { ViewTransition, type CSSProperties } from 'react';

import type { PortfolioProject } from '@/core/content/projects';
import { getPunkProjectCopy } from '@/core/content/punk-project-copy';
import { useExperience } from '@/core/modules/Experience/ExperienceProvider';
import { ImplantUpgrade } from '@/core/modules/Experience/ImplantUpgrade';

import { LiveDemoLink } from './LiveDemoLink';
import { ProjectPreview } from './ProjectPreview';
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
    getHighlightHandlers,
    bringToFront,
    beginDrag,
    moveCard,
    endDrag,
    keyboardMove,
    clickGuard,
  } = board;
  const highlightHandlers = getHighlightHandlers(project.slug);
  const preset = cardPresets[index];
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
        {...highlightHandlers}
        onFocus={(event) => {
          bringToFront(index);
          highlightHandlers.onFocus(event);
        }}
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
        <div className={styles.projectPreview}>
          <ViewTransition name={`project-image-${project.slug}`} share="project-image" default="none">
            <Link className={styles.preview} href={`/projects/${project.slug}`} tabIndex={-1}>
              <ProjectPreview project={project} />
            </Link>
          </ViewTransition>
          {project.demoUrl && <LiveDemoLink href={project.demoUrl} projectName={project.name} />}
        </div>
        {punk && <ImplantUpgrade slug={project.slug} />}
      </article>
    </ViewTransition>
  );
}
