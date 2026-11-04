import type { Metadata } from 'next';

import { MetricsReport } from '@/core/modules/MetricsBar';

export const metadata: Metadata = {
  title: { absolute: 'Site metrics — Bartosz Kozikowski' },
  description: 'Live performance measurements for your visit, collected in your browser without sending analytics.',
};

export default function MetricsPage() {
  return <MetricsReport />;
}
