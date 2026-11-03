import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';
import { profile } from '@/core/content/profile';

import styles from './ProfilePages.module.scss';

export function ProfileLinks() {
  return (
    <ul className={styles.socialLinks}>
      {profile.links.map((link) => (
        <li key={link.href}>
          <a href={link.href}>
            {link.label}{' '}
            <span aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
