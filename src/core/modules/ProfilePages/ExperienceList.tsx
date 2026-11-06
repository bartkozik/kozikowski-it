import type { ProfileExperience } from '@/core/content/profile';
import { punkProfileCopy } from '@/core/content/punk-profile-copy';
import { ModeCopy } from '@/core/modules/Experience/ModeCopy';

import styles from './ProfilePages.module.scss';

interface ExperienceListProps {
  readonly items: readonly ProfileExperience[];
  readonly variant: 'summary' | 'detailed';
}

export function ExperienceList({ items, variant }: ExperienceListProps) {
  return (
    <div className={styles.experience}>
      {items.map((experience) => {
        const punk = punkProfileCopy.experience[experience.company];
        const company = <h3>{experience.company}</h3>;
        const period = <p className={styles.eyebrow}>{experience.period}</p>;

        return (
          <article key={experience.company} className={styles.experienceItem}>
            {variant === 'detailed' ? (
              <div className={styles.experienceHeading}>
                {company}
                {period}
              </div>
            ) : (
              <>
                {period}
                {company}
              </>
            )}
            <p className={styles.role}>{experience.title}</p>
            <p>
              <ModeCopy punk={punk?.description}>{experience.description}</ModeCopy>
            </p>
            {variant === 'detailed' && (
              <ul className={styles.highlights}>
                {experience.highlights.map((highlight, index) => (
                  <li key={highlight}>
                    <ModeCopy punk={punk?.highlights[index]}>{highlight}</ModeCopy>
                  </li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </div>
  );
}
