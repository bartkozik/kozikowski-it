import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/core/theme/theme-style.scss';

export const metadata: Metadata = {
  title: 'Bartosz Kozikowski — Portfolio',
  description: 'Web development portfolio of Bartosz Kozikowski.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
