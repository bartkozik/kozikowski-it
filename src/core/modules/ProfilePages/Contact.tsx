import { profile } from '@/core/content/profile';
import { ModeCopy } from '@/core/modules/Experience/ModeCopy';

import { ProfileLinks } from './ProfileLinks';
import { ProfilePageShell } from './ProfilePageShell';
import styles from './ProfilePages.module.scss';

export function Contact() {
  return (
    <ProfilePageShell
      title={<ModeCopy punk="Open a channel">Let’s talk</ModeCopy>}
      subtitle={
        <ModeCopy punk="Got a mission, a product, or a seat on your crew?">Have a project or a role in mind?</ModeCopy>
      }
      activePage="contact"
    >
      <section className={styles.contact} aria-labelledby="contact-heading">
        <h2 id="contact-heading">
          <ModeCopy punk="Drop the mission brief">Get in touch</ModeCopy>
        </h2>
        <p>
          <ModeCopy punk="Building something that needs a full stack operator? Send the brief: what you’re making, where the system hurts, and how I can help. Project proposals and job offers welcome. The inbox runs on plain email — no neural implant required.">
            Tell me what you are building, where you need support, or which part of my work caught your attention.
          </ModeCopy>
        </p>
        <a className={styles.email} href={profile.contactHref}>
          {profile.email} <span aria-hidden="true">↗</span>
        </a>
        <dl className={styles.contactDetails}>
          <div>
            <dt>
              <ModeCopy punk="Home node">Based in</ModeCopy>
            </dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>
              <ModeCopy punk="Deployment range">Work arrangements</ModeCopy>
            </dt>
            <dd>{profile.availability}</dd>
          </div>
          <div>
            <dt>
              <ModeCopy punk="Comms protocol · English">English</ModeCopy>
            </dt>
            <dd>{profile.english}</dd>
          </div>
        </dl>
        <ProfileLinks />
      </section>
    </ProfilePageShell>
  );
}
