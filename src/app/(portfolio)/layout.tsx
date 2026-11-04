import type { ReactNode } from 'react';

import { PortfolioLayout } from '@/core/modules/PortfolioLayout/PortfolioLayout';

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <PortfolioLayout>{children}</PortfolioLayout>;
}
