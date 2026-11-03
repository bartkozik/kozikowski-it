import type { Metadata } from 'next';
import type { ReactNode } from 'react';

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
    <html lang="en" className={fontVariables}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <MetricsBar />
      </body>
    </html>
  );
}
