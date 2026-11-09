import Link from 'next/link';

import { profile } from '@/core/content/profile';
import { punkProfileCopy } from '@/core/content/punk-profile-copy';
import { ModeCopy } from '@/core/modules/Experience/ModeCopy';

import { AboutPortrait } from './AboutPortrait';
import { ProfileLinks } from './ProfileLinks';
import { ExperienceList } from './ExperienceList';
import { ProfilePageShell } from './ProfilePageShell';
import styles from './ProfilePages.module.scss';

export function About() {
  return (
    <ProfilePageShell
      title={<ModeCopy punk="Meet the operator">About me</ModeCopy>}
      subtitle={`${profile.name} · ${profile.title}`}
      activePage="about"
    >
      <div className={styles.aboutIntro}>
        <AboutPortrait />
        <div className={styles.prose}>
          {profile.about.map((paragraph, index) => (
            <p key={paragraph}>
              <ModeCopy punk={punkProfileCopy.about[index]}>{paragraph}</ModeCopy>
            </p>
          ))}
        </div>
      </div>

      <section className={styles.section} aria-labelledby="experience-heading">
        <h2 id="experience-heading">
          <ModeCopy punk="Origin story & contract log">From business to building</ModeCopy>
        </h2>
        <ExperienceList items={profile.experience} variant="summary" />
      </section>

      <section className={styles.section} aria-labelledby="outside-work-heading">
        <h2 id="outside-work-heading">
          <ModeCopy punk="Offline side quests">Outside work</ModeCopy>
        </h2>
        {profile.interests.map((interest, index) => (
          <p key={interest}>
            <ModeCopy punk={punkProfileCopy.interests[index]}>{`${interest}.`}</ModeCopy>
          </p>
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
