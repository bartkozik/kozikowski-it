import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';
import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './ProfilePages.module.scss';

interface ProfilePageShellProps {
  readonly title: ReactNode;
  readonly subtitle: ReactNode;
  readonly activePage?: 'about' | 'resume' | 'contact';
  readonly children: ReactNode;
}

const navigation = [
  { slug: 'about', label: 'About' },
  { slug: 'resume', label: 'Resume' },
  { slug: 'contact', label: 'Contact' },
];

export function ProfilePageShell({ title, subtitle, activePage, children }: ProfilePageShellProps) {
  return (
    <main className={styles.page} id="main-content">
      <header className={styles.header}>
        <div className={styles.navigation}>
          <Link href="/" className={styles.backLink}>
            <span aria-hidden="true">
              <ArrowIcon direction="left" />
            </span>{' '}
            All projects
          </Link>
          <nav aria-label="Profile navigation">
            {navigation.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`} aria-current={activePage === item.slug ? 'page' : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <h1>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>
      <div className={styles.content}>{children}</div>
    </main>
  );
}
