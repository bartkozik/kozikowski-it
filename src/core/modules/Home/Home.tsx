'use client';

import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';

import Link from 'next/link';

import { useExperience } from '@/core/modules/Experience/ExperienceProvider';
import { PunkLab } from '@/core/modules/Experience/PunkLab';
import { SiteSignature } from '@/core/modules/SiteSignature/SiteSignature';
import { projects } from '@/core/content/projects';

import { cardPresets } from './card-presets';
import { ProjectCard } from './ProjectCard';
import { CardMoveControls } from './CardMoveControls';
import { useProjectBoard } from './useProjectBoard';
import styles from './Home.module.scss';

export function Home() {
  const { mode } = useExperience();
  const punk = mode === 'punk';
  const board = useProjectBoard();
  const {
    arrangement,
    previewFilter,
    clearFilterPreview,
    announcement,
    entranceComplete,
    highlightedProject,
    canvas,
    setHoveredProject,
    setFocusedProject,
    arrange,
  } = board;
  return (
    <main className={styles.home} id="main-content">
      <header className={styles.header}>
        <h1>Bartosz Kozikowski</h1>
        <Link className={styles.contact} href="/contact">
          Contact{' '}
          <span aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
      </header>
      {punk && <PunkLab />}
      <div className={styles.workspace}>
        <aside className={styles.sidebar}>
          <nav aria-label="Portfolio">
            <h2>{punk ? 'Implant catalogue' : 'Projects'}</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    data-highlighted={highlightedProject === project.slug || undefined}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== 'touch') setHoveredProject(project.slug);
                    }}
                    onPointerLeave={() => setHoveredProject(null)}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(':focus-visible')) setFocusedProject(project.slug);
                    }}
                    onBlur={() => setFocusedProject(null)}
                  >
                    {project.name}
                    <span aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.personalLinks}>
              <Link href="/about">
                About me{' '}
                <span aria-hidden="true">
                  <ArrowIcon />
                </span>
              </Link>
              <Link href="/resume">
                Resume{' '}
                <span aria-hidden="true">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </nav>
          <p className={styles.intro}>
            Full stack developer. <br />
            React, TypeScript &amp; a little curiosity.
            <br />
            <span>Based in Warsaw. Working everywhere.</span>
          </p>
          <SiteSignature />
        </aside>
        <section className={styles.board} aria-label="Project cards">
          <div className={styles.toolbar}>
            <div className={styles.sortButtons}>
              <button
                type="button"
                aria-pressed={arrangement === 'loved'}
                title="EPOCA, Board.Dev and PM Traffic Manager"
                onPointerEnter={(event) => previewFilter(event, 'loved')}
                onPointerLeave={clearFilterPreview}
                onPointerCancel={clearFilterPreview}
                onClick={() => arrange('loved')}
              >
                Most loved
              </button>
              <button
                type="button"
                aria-pressed={arrangement === 'painful'}
                title="Ad Template Platform and Art Network"
                onPointerEnter={(event) => previewFilter(event, 'painful')}
                onPointerLeave={clearFilterPreview}
                onPointerCancel={clearFilterPreview}
                onClick={() => arrange('painful')}
              >
                Most painful
              </button>
              <button type="button" className={styles.shuffle} onClick={() => arrange('shuffle')}>
                Shuffle{' '}
                <span aria-hidden="true">
                  <ArrowIcon direction="shuffle" />
                </span>
              </button>
              <CardMoveControls board={board} />
            </div>
            <button type="button" className={styles.reset} onClick={() => arrange('original')}>
              Reset layout
            </button>
          </div>
          <p className={styles.instructions} id="card-instructions">
            Drag a title or use Move a card. Click a title to explore.{' '}
            <span>Keyboard: arrow keys to move, Enter to open.</span>
          </p>
          <div className={styles.canvas} ref={canvas} data-entering={!entranceComplete || undefined}>
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={cardPresets.findIndex((preset) => preset.slug === project.slug)}
                board={board}
              />
            ))}
          </div>
          <p className={styles.announcement} role="status" aria-live="polite">
            {announcement}
          </p>
        </section>
      </div>
    </main>
  );
}
