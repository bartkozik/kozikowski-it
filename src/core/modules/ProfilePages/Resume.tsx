import { profile } from '@/core/content/profile';

import { ProfileLinks } from './ProfileLinks';
import { ProfilePageShell } from './ProfilePageShell';
import styles from './ProfilePages.module.scss';

export function Resume() {
  return (
    <ProfilePageShell title="Resume" subtitle={`${profile.name} · ${profile.title}`} activePage="resume">
      <div className={styles.resumeToolbar}>
        <a href={profile.contactHref}>{profile.email}</a>
        <a
          className={styles.resumePdf}
          href="/documents/Bartosz_Kozikowski_CV_Fullstack_EN.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title="Open the PDF in a new tab to print or download"
        >
          Print resume (PDF) <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className={styles.resumeDetails}>
        {profile.location} · {profile.availability} · English {profile.english}
      </p>
      <ProfileLinks />

      <section className={styles.section} aria-labelledby="summary-heading">
        <h2 id="summary-heading">Profile</h2>
        <p>{profile.about[0]}</p>
      </section>

      <section className={styles.section} aria-labelledby="resume-experience-heading">
        <h2 id="resume-experience-heading">Experience</h2>
        <div className={styles.experience}>
          {profile.experience.map((experience) => (
            <article key={experience.company} className={styles.experienceItem}>
              <div className={styles.experienceHeading}>
                <h3>{experience.company}</h3>
                <p className={styles.eyebrow}>{experience.period}</p>
              </div>
              <p className={styles.role}>{experience.title}</p>
              <p>{experience.description}</p>
              <ul className={styles.highlights}>
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="skills-heading">
        <h2 id="skills-heading">Technical skills</h2>
        <dl className={styles.skills}>
          {profile.skills.map((group) => (
            <div key={group.category}>
              <dt>{group.category}</dt>
              <dd>{group.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="education-heading">
        <h2 id="education-heading">Education & training</h2>
        <div className={styles.education}>
          {profile.education.map((education) => (
            <article key={education.institution}>
              <p className={styles.eyebrow}>{education.period}</p>
              <h3>{education.institution}</h3>
              <p className={styles.role}>{education.course}</p>
              <p>{education.description}</p>
            </article>
          ))}
        </div>
      </section>
    </ProfilePageShell>
  );
}
