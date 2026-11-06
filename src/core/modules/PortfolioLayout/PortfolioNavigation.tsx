'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { ModeSwitch } from '@/core/modules/Experience/ModeSwitch';

import { mobileViewportQuery } from './useMobileViewport';
import styles from './PortfolioNavigation.module.scss';

const sections = [
  { href: '/', label: 'Projects' },
  { href: '/about', label: 'About me' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

function getAriaCurrent(pathname: string, href: string, activeHref: string | undefined) {
  if (pathname === href) return 'page';
  if (activeHref === href) return 'location';
  return undefined;
}

export function PortfolioNavigation() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const pendingNavigation = useRef(false);
  const activeSection = sections.find(
    ({ href }) => pathname === href || (href === '/' && pathname.startsWith('/projects/')),
  );

  useEffect(() => {
    if (menu.current) menu.current.open = false;
    if (!pendingNavigation.current) return;
    pendingNavigation.current = false;
    if (!window.matchMedia(mobileViewportQuery).matches) return;
    document.getElementById('main-content')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const query = window.matchMedia(mobileViewportQuery);
    function closeOnDesktop() {
      if (query.matches || !menu.current) return;
      const hadFocus = menu.current.contains(document.activeElement);
      menu.current.open = false;
      if (hadFocus) document.getElementById('main-content')?.focus({ preventScroll: true });
    }
    query.addEventListener('change', closeOnDesktop);
    return () => query.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <header className={styles.header}>
      <details
        ref={menu}
        onKeyDown={(event) => {
          if (event.key !== 'Escape' || !event.currentTarget.open) return;
          event.preventDefault();
          event.currentTarget.open = false;
          trigger.current?.focus();
        }}
      >
        <summary ref={trigger} className={styles.trigger}>
          <span className={styles.current}>{activeSection?.label ?? 'Portfolio'}</span>
          <span className={styles.action}>
            Menu
            <span className={styles.icon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </span>
        </summary>
        <div className={styles.panel}>
          <nav className={styles.navigation} aria-label="Portfolio sections">
            {sections.map(({ href, label }) => {
              const ariaCurrent = getAriaCurrent(pathname, href, activeSection?.href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={ariaCurrent}
                  scroll={false}
                  onNavigate={() => {
                    pendingNavigation.current = pathname !== href;
                    if (menu.current) menu.current.open = false;
                    if (pathname === href) trigger.current?.focus();
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <ModeSwitch embedded />
        </div>
      </details>
    </header>
  );
}
