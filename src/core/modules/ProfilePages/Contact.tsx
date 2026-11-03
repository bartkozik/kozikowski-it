import { profile } from '@/core/content/profile';

import { ProfileLinks } from './ProfileLinks';
import { ProfilePageShell } from './ProfilePageShell';
import styles from './ProfilePages.module.scss';

export function Contact() {
  return (
    <ProfilePageShell title="Let’s talk" subtitle="Have a project or a role in mind?" activePage="contact">
      <section className={styles.contact} aria-labelledby="contact-heading">
        <h2 id="contact-heading">Get in touch</h2>
        <p>Tell me what you are building, where you need support, or which part of my work caught your attention.</p>
        <a className={styles.email} href={profile.contactHref}>
          {profile.email} <span aria-hidden="true">↗</span>
        </a>
        <dl className={styles.contactDetails}>
          <div>
            <dt>Based in</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Work arrangements</dt>
            <dd>{profile.availability}</dd>
          </div>
          <div>
            <dt>English</dt>
            <dd>{profile.english}</dd>
          </div>
        </dl>
        <ProfileLinks />
      </section>
    </ProfilePageShell>
  );
}
