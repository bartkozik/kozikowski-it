import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { ExperienceProvider } from '@/core/modules/Experience/ExperienceProvider';
import { ModeSwitch } from '@/core/modules/Experience/ModeSwitch';
import { PunkRadio } from '@/core/modules/Experience/PunkRadio';
import { modeBootstrap } from '@/core/modules/Experience/interface-mode';

import { PortfolioNavigation } from '@/core/modules/PortfolioLayout/PortfolioNavigation';
import { MetricsBar } from '@/core/modules/MetricsBar';
import { fontVariables } from '@/core/theme/fonts';

import '@/core/theme/theme-style.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://kozikowski.it'),
  title: { default: 'Bartosz Kozikowski — Full Stack Developer', template: '%s · Bartosz Kozikowski' },
  description:
    'Full stack developer in Warsaw. React, TypeScript, Next.js, Node.js and PostgreSQL. Explore commercial projects, source code and selected case studies.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Bartosz Kozikowski',
    title: 'Bartosz Kozikowski — Full Stack Developer',
    description: 'Web applications, thoughtful interfaces and the code behind them.',
  },
  twitter: { card: 'summary', title: 'Bartosz Kozikowski — Full Stack Developer' },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} data-mode="day" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeBootstrap }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <ExperienceProvider>
          <PortfolioNavigation />
          <ModeSwitch />
          {children}
          <PunkRadio />
          <MetricsBar />
        </ExperienceProvider>
      </body>
    </html>
  );
}
