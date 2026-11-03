import type { Metadata } from 'next';

import { Resume } from '@/core/modules/ProfilePages';

export const metadata: Metadata = {
  title: { absolute: 'Resume — Bartosz Kozikowski' },
  description:
    'Experience, technical skills and training of Bartosz Kozikowski, a full stack developer working with React, TypeScript, Node.js and PostgreSQL.',
};

export default function ResumePage() {
  return <Resume />;
}
