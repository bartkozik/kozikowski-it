'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { mobileViewportQuery } from './useMobileViewport';

import styles from './PortfolioLayout.module.scss';

const sections = [
  { href: '/', label: 'Projects' },
  { href: '/about', label: 'About me' },
  { href: '/resume', label: 'Resume' },
];

export function PortfolioNavigation() {
  const pathname = usePathname();
  const navigation = useRef<HTMLElement>(null);
  const pendingNavigation = useRef(false);

  useEffect(() => {
    if (!pendingNavigation.current) return;
    pendingNavigation.current = false;
    if (!window.matchMedia(mobileViewportQuery).matches) return;
    document.getElementById('main-content')?.focus({ preventScroll: true });
    navigation.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [pathname]);

  return (
    <nav ref={navigation} className={styles.navigation} aria-label="Portfolio sections">
      {sections.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? 'page' : undefined}
          scroll={false}
          onNavigate={() => {
            pendingNavigation.current = pathname !== href;
          }}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
