'use client';

import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';

import Link from 'next/link';

import { useExperience } from '@/core/modules/Experience/ExperienceProvider';
import { PunkLab } from '@/core/modules/Experience/PunkLab';
import { useMobileViewport } from '@/core/modules/PortfolioLayout/useMobileViewport';
import { PortfolioIntro } from '@/core/modules/PortfolioLayout/PortfolioIntro';
import { SiteSignature } from '@/core/modules/SiteSignature/SiteSignature';
import { projects } from '@/core/content/projects';

import { cardPresets } from './card-presets';
import { ProjectCard } from './ProjectCard';
import { useProjectBoard } from './useProjectBoard';
import { useChaosShuffle } from './useChaosShuffle';
import styles from './Home.module.scss';

export function Home() {
  const { mode } = useExperience();
  const punk = mode === 'punk';
  const mobile = useMobileViewport();
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
  const chaos = useChaosShuffle(punk, canvas, () => arrange('shuffle'));
  return (
    <main className={styles.home} id="main-content" tabIndex={-1}>
      <header className={styles.header}>
        <h1>Bartosz Kozikowski</h1>
        <Link className={styles.contact} href="/contact">
          Contact{' '}
          <span aria-hidden="true">
            <ArrowIcon />
          </span>
        </Link>
      </header>
      {punk && !mobile && <PunkLab />}
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
          <PortfolioIntro className={styles.intro} />
          <SiteSignature />
        </aside>
        <section className={styles.board} aria-label="Project cards" id="projects">
          <div className={styles.toolbar}>
            <div className={styles.sortButtons}>
              <button
                type="button"
                aria-pressed={arrangement === 'loved'}
                title="EPOCA, Board.Dev and PM Traffic Manager"
                disabled={chaos.scrambling}
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
                disabled={chaos.scrambling}
                onPointerEnter={(event) => previewFilter(event, 'painful')}
                onPointerLeave={clearFilterPreview}
                onPointerCancel={clearFilterPreview}
                onClick={() => arrange('painful')}
              >
                Most painful
              </button>
              <button type="button" className={styles.shuffle} disabled={chaos.scrambling} onClick={chaos.run}>
                {punk ? (chaos.scrambling ? 'SCRAMBLING…' : 'CHAOS PROTOCOL') : 'Shuffle'}{' '}
                <span aria-hidden="true">
                  <ArrowIcon direction="shuffle" />
                </span>
              </button>
            </div>
            <button
              type="button"
              className={styles.reset}
              disabled={chaos.scrambling || !board.canReset}
              onClick={() => arrange('original')}
            >
              {punk ? 'RESTORE SANITY' : 'Reset layout'}
            </button>
          </div>
          <p className={styles.instructions} id="card-instructions">
            Drag a title to move a card. Click a title to explore.{' '}
            <span>Keyboard: arrow keys to move, Enter to open.</span>
          </p>
          {punk && (
            <p className={styles.chaosStatus} role="status">
              {chaos.scrambling ? '// INJECTING ENTROPY…' : chaos.message || '// CHAOS ENGINE ARMED.'}
            </p>
          )}
          <div
            className={styles.canvas}
            ref={canvas}
            inert={chaos.scrambling || undefined}
            data-scrambling={chaos.scrambling || undefined}
            data-entering={!entranceComplete || undefined}
          >
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
      {punk && mobile && (
        <div className={styles.mobileLab}>
          <PunkLab />
        </div>
      )}
    </main>
  );
}
