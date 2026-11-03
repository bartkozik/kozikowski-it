import type { Metadata } from 'next';

import { MetricsReport } from '@/core/modules/MetricsBar';

export const metadata: Metadata = {
  title: { absolute: 'Site metrics — Bartosz Kozikowski' },
  description:
    'Recorded performance, page size and Lighthouse results, including the measurement environment and profile.',
};

export default function MetricsPage() {
  return <MetricsReport />;
}
