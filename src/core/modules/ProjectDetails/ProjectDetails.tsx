import Image from 'next/image';
import Link from 'next/link';

import type { ProjectDetails as ProjectDetailsContent } from '@/core/content/project-details';
import { getProjectVisual } from '@/core/content/project-visuals';
import type { PortfolioProject } from '@/core/content/projects';

import styles from './ProjectDetails.module.scss';

interface ProjectDetailsProps {
  readonly project: PortfolioProject;
  readonly details: ProjectDetailsContent;
  readonly nextProject: PortfolioProject;
}

const sections = [
  { id: 'role', label: 'My role' },
  { id: 'delivered', label: 'What I delivered' },
  { id: 'challenge', label: 'The challenge' },
  { id: 'stack', label: 'Tech stack' },
  { id: 'status', label: 'Project status' },
  { id: 'resources', label: 'Explore the work' },
];

export function ProjectDetails({ project, details, nextProject }: ProjectDetailsProps) {
  const visual = getProjectVisual(project.slug);

  return (
    <main className={styles.page} id="main-content">
      <header className={styles.header}>
        <nav className={styles.projectNavigation} aria-label="Project navigation">
          <Link href="/" className={styles.backLink}>
            <span aria-hidden="true">←</span> All projects
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
        <p className={styles.tagline}>{project.tagline}</p>
      </header>

      <div className={styles.contentLayout}>
        <aside className={styles.contents}>
          <nav aria-label="On this page" className={styles.sectionNavigation}>
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className={styles.article} aria-label={`${project.name} project details`}>
          <p className={styles.introduction}>{details.overview}</p>

          <section className={styles.section} id="role" aria-labelledby="role-heading">
            <h2 id="role-heading">My role</h2>
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
            <h2 id="delivered-heading">What I delivered</h2>
            <ul className={styles.highlights}>
              {details.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>

          <section className={styles.section} id="challenge" aria-labelledby="challenge-heading">
            <h2 id="challenge-heading">The challenge</h2>
            <p>{details.challenge}</p>
          </section>

          <section className={styles.section} id="stack" aria-labelledby="stack-heading">
            <h2 id="stack-heading">Tech stack</h2>
            <ul className={styles.stack}>
              {details.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>

          <section className={styles.section} id="status" aria-labelledby="status-heading">
            <h2 id="status-heading">Project status</h2>
            <p>{details.status}</p>
          </section>

          <section className={styles.section} id="resources" aria-labelledby="resources-heading">
            <h2 id="resources-heading">Explore the work</h2>
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
              Curious about the work? <Link href="/contact">Let’s talk.</Link>
            </p>
            <Link href={`/projects/${nextProject.slug}`} className={styles.nextProject}>
              <span>Next project</span>
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
