import Link from 'next/link';

import { ProfilePageShell } from './ProfilePageShell';
import styles from './ProfilePages.module.scss';

export function NotFound() {
  return (
    <ProfilePageShell title="Page not found" subtitle="404 · This address does not lead to a page here.">
      <div className={styles.notFound}>
        <p>You can return to the portfolio to explore the projects, or get in touch.</p>
        <div className={styles.actions}>
          <Link href="/">Explore all projects</Link>
          <Link href="/contact">Contact me</Link>
        </div>
      </div>
    </ProfilePageShell>
  );
}
