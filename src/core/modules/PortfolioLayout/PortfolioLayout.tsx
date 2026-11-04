import Link from 'next/link';
import type { ReactNode } from 'react';

import { profile } from '@/core/content/profile';
import { ArrowIcon } from '@/core/modules/Icons/ArrowIcon';
import { SiteSignature } from '@/core/modules/SiteSignature/SiteSignature';

import { PortfolioIntro } from './PortfolioIntro';
import { PortfolioNavigation } from './PortfolioNavigation';
import styles from './PortfolioLayout.module.scss';

export function PortfolioLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.identity}>
          <p className={styles.name}>{profile.name}</p>
          <Link className={styles.contact} href="/contact">
            Contact <ArrowIcon />
          </Link>
        </div>
        <PortfolioIntro className={styles.intro} />
        <SiteSignature />
      </header>
      <PortfolioNavigation />
      {children}
    </>
  );
}
