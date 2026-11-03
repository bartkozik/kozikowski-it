import type { Metadata } from 'next';

import { Contact } from '@/core/modules/ProfilePages';

export const metadata: Metadata = {
  title: { absolute: 'Contact — Bartosz Kozikowski' },
  description:
    'Contact Bartosz Kozikowski about a web development project or role. Based in Warsaw and open to remote work worldwide or hybrid work in Warsaw.',
};

export default function ContactPage() {
  return <Contact />;
}
