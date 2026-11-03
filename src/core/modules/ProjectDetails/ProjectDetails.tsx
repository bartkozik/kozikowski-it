import Image from 'next/image';
import Link from 'next/link';

import type { ProjectDetails as ProjectDetailsContent } from '@/core/content/project-details';
import { getProjectGallery } from '@/core/content/project-galleries';
import { getProjectVisual } from '@/core/content/project-visuals';
import type { PortfolioProject } from '@/core/content/projects';
import { getPunkProjectCopy } from '@/core/content/punk-project-copy';
import { ModeCopy } from '@/core/modules/Experience/ModeCopy';

import styles from './ProjectDetails.module.scss';

interface ProjectDetailsProps {
  readonly project: PortfolioProject;
  readonly details: ProjectDetailsContent;
  readonly nextProject: PortfolioProject;
}

const sections = [
  { id: 'role', label: 'My role', punk: 'Operator log' },
  { id: 'delivered', label: 'What I delivered', punk: 'Installed capabilities' },
  { id: 'challenge', label: 'The challenge', punk: 'The boss fight' },
  { id: 'stack', label: 'Tech stack', punk: 'Installed tech' },
  { id: 'status', label: 'Project status', punk: 'Deployment status' },
  { id: 'resources', label: 'Explore the work', punk: 'Open the dossier' },
];

export function ProjectDetails({ project, details, nextProject }: ProjectDetailsProps) {
  const visual = getProjectVisual(project.slug);
  const gallery = getProjectGallery(project.slug);
  const punkCopy = getPunkProjectCopy(project.slug);

  return (
    <main className={styles.page} id="main-content">
      <header className={styles.header}>
        <nav className={styles.projectNavigation} aria-label="Project navigation">
          <Link href="/" className={styles.backLink}>
            <span aria-hidden="true">←</span> <ModeCopy punk="Catalogue">All projects</ModeCopy>
          </Link>
          <Link
            href={`/projects/${nextProject.slug}`}
            aria-label={`Next project: ${nextProject.name}`}
            className={styles.nextLink}
          >
            Next project <span aria-hidden="true">→</span>
          </Link>
        </nav>
        <h1>{project.name}</h1>
        <p className={styles.tagline}>
          <ModeCopy punk={punkCopy?.tagline}>{project.tagline}</ModeCopy>
        </p>
      </header>

      <div className={styles.contentLayout}>
        <aside className={styles.contents}>
          <nav aria-label="On this page" className={styles.sectionNavigation}>
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                <ModeCopy punk={section.punk}>{section.label}</ModeCopy>
              </a>
            ))}
          </nav>
        </aside>

        <article className={styles.article} aria-label={`${project.name} project details`}>
          <p className={styles.introduction}>
            <ModeCopy punk={punkCopy?.overview}>{details.overview}</ModeCopy>
          </p>

          <section className={styles.section} id="role" aria-labelledby="role-heading">
            <h2 id="role-heading">
              <ModeCopy punk="Operator log">My role</ModeCopy>
            </h2>
            <p>{details.role}</p>
          </section>

          {visual && (
            <figure className={styles.visual}>
              <Image
                src={visual.src}
                alt={visual.alt}
                width={visual.width}
                height={visual.height}
                sizes="(max-width: 950px) calc(100vw - 40px), 910px"
                className={styles.projectImage}
              />
            </figure>
          )}

          <section className={styles.section} id="delivered" aria-labelledby="delivered-heading">
            <h2 id="delivered-heading">
              <ModeCopy punk="Installed capabilities">What I delivered</ModeCopy>
            </h2>
            <ul className={styles.highlights}>
              {details.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>

          {gallery.map((image) => (
            <figure key={image.src} className={styles.visual}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 950px) calc(100vw - 40px), 910px"
                className={styles.projectImage}
              />
            </figure>
          ))}

          <section className={styles.section} id="challenge" aria-labelledby="challenge-heading">
            <h2 id="challenge-heading">
              <ModeCopy punk="The boss fight">The challenge</ModeCopy>
            </h2>
            <p>
              <ModeCopy punk={punkCopy?.challenge}>{details.challenge}</ModeCopy>
            </p>
          </section>

          <section className={styles.section} id="stack" aria-labelledby="stack-heading">
            <h2 id="stack-heading">
              <ModeCopy punk="Installed tech">Tech stack</ModeCopy>
            </h2>
            <ul className={styles.stack}>
              {details.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>

          <section className={styles.section} id="status" aria-labelledby="status-heading">
            <h2 id="status-heading">
              <ModeCopy punk="Deployment status">Project status</ModeCopy>
            </h2>
            <p>{details.status}</p>
          </section>

          <section className={styles.section} id="resources" aria-labelledby="resources-heading">
            <h2 id="resources-heading">
              <ModeCopy punk="Open the dossier">Explore the work</ModeCopy>
            </h2>
            <ul className={styles.resources}>
              {project.resources.map((resource) => (
                <li key={resource.url}>
                  <a href={resource.url}>
                    {resource.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
              {project.demoUrl && (
                <li>
                  <a href={project.demoUrl}>
                    Live demo <span aria-hidden="true">↗</span>
                  </a>
                </li>
              )}
            </ul>
          </section>

          <footer className={styles.footer}>
            <p>
              <ModeCopy punk="Need another operator on your crew?">Curious about the work?</ModeCopy>{' '}
              <Link href="/contact">
                <ModeCopy punk="Open a channel.">Let’s talk.</ModeCopy>
              </Link>
            </p>
            <Link href={`/projects/${nextProject.slug}`} className={styles.nextProject}>
              <span>
                <ModeCopy punk="Next dossier">Next project</ModeCopy>
              </span>
              <strong>
                {nextProject.name} <span aria-hidden="true">→</span>
              </strong>
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}
