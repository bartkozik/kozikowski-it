import { projects, type PortfolioProject } from '@/core/content/projects';
import { getProjectVisual } from '@/core/content/project-visuals';
import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';
import { ProgressiveImage } from '@/core/modules/ProgressiveImage/ProgressiveImage';

import styles from './Home.module.scss';

export function ProjectPreview({ project }: Readonly<{ project: PortfolioProject }>) {
  const visual = getProjectVisual(project.slug);

  if (visual) {
    const loading = ['liquid-editions', 'fanimani', 'board-dev'].includes(project.slug) ? 'eager' : 'lazy';

    return (
      <ProgressiveImage
        src={visual}
        alt={visual.alt}
        fill
        position="top"
        sizes="(max-width: 699px) 90vw, (max-width: 1099px) 45vw, 30vw"
        draggable={false}
        loading={loading}
      />
    );
  }

  const projectNumber = String(projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, '0');
  const hasSource = project.resources.some((resource) => resource.kind === 'source');
  const previewLabel = hasSource ? 'Explore the application & source' : 'Explore the case study';

  return (
    <div className={styles.typePreview}>
      <span className={styles.projectNumber}>{projectNumber}</span>
      <strong>{project.name}</strong>
      <span className={styles.previewLabel}>
        {previewLabel} <ArrowIcon size={16} />
      </span>
    </div>
  );
}
