import type { Metadata } from 'next';

import { About } from '@/core/modules/ProfilePages';

export const metadata: Metadata = {
  title: { absolute: 'About — Bartosz Kozikowski' },
  description:
    'Meet Bartosz Kozikowski, a full stack developer working with React, TypeScript and Node.js, with commercial web experience since 2018.',
};

export default function AboutPage() {
  return <About />;
}
