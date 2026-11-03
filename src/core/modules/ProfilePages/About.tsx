import Link from 'next/link';

import { profile } from '@/core/content/profile';

import { ProfileLinks } from './ProfileLinks';
import { ProfilePageShell } from './ProfilePageShell';
import styles from './ProfilePages.module.scss';

export function About() {
  return (
    <ProfilePageShell title="About me" subtitle={`${profile.name} · ${profile.title}`} activePage="about">
      <div className={styles.prose}>
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className={styles.section} aria-labelledby="experience-heading">
        <h2 id="experience-heading">From business to building</h2>
        <div className={styles.experience}>
          {profile.experience.map((experience) => (
            <article key={experience.company} className={styles.experienceItem}>
              <p className={styles.eyebrow}>{experience.period}</p>
              <h3>{experience.company}</h3>
              <p className={styles.role}>{experience.title}</p>
              <p>{experience.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="outside-work-heading">
        <h2 id="outside-work-heading">Outside work</h2>
        {profile.interests.map((interest) => (
          <p key={interest}>{interest}.</p>
        ))}
      </section>

      <footer className={styles.pageFooter}>
        <p>
          Explore <Link href="/">my projects</Link>, read <Link href="/resume">my resume</Link>, or{' '}
          <Link href="/contact">get in touch</Link>.
        </p>
        <ProfileLinks />
      </footer>
    </ProfilePageShell>
  );
}
