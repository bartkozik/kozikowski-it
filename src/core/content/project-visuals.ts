import type { StaticImageData } from 'next/image';

import accountingUiPrototypeImage from '../../../public/projects/accounting-ui-prototype.webp';
import adTemplatePlatformImage from '../../../public/projects/ad-template-platform.webp';
import artNetworkImage from '../../../public/projects/art-network.webp';
import boardDevImage from '../../../public/projects/board-dev.webp';
import celinaHomeImage from '../../../public/projects/celina-home.webp';
import epocaImage from '../../../public/projects/epoca.webp';
import epocaLandingPageImage from '../../../public/projects/epoca-landing-page.webp';
import fanimaniImage from '../../../public/projects/fanimani.webp';
import liquidEditionsImage from '../../../public/projects/liquid-editions.webp';
import pmTrafficManagerImage from '../../../public/projects/pm-traffic-manager.webp';

export interface ProjectVisual extends StaticImageData {
  readonly alt: string;
}

const visuals: Readonly<Record<string, ProjectVisual>> = {
  celina: {
    ...celinaHomeImage,
    alt: 'CELINA corporate website home page showing its manufacturing and shelter products',
  },
  'art-network': {
    ...artNetworkImage,
    alt: 'Art Network banking and invoice interface',
  },
  'liquid-editions': {
    ...liquidEditionsImage,
    alt: 'Liquid Editions wallet and NFT portfolio interface',
  },
  'pm-traffic-manager': {
    ...pmTrafficManagerImage,
    alt: 'PM Traffic Manager planning board running locally with fictional people and client projects',
  },
  epoca: {
    ...epocaImage,
    alt: 'EPOCA time-tracking application with draggable work entries',
  },
  'epoca-landing-page': {
    ...epocaLandingPageImage,
    alt: 'EPOCA product landing page with its time-tracking showcase',
  },
  fanimani: {
    ...fanimaniImage,
    alt: 'FaniMani nonprofit fundraising website',
  },
  'accounting-ui-prototype': {
    ...accountingUiPrototypeImage,
    alt: 'React and TypeScript dashboard implementation from the accounting prototype',
  },
  'ad-template-platform': {
    ...adTemplatePlatformImage,
    alt: 'Advertising template renderer with sample branding and layout controls',
  },
  'board-dev': {
    ...boardDevImage,
    alt: 'Board.Dev nonprofit assessment form before entering organization information',
  },
};

export function getProjectVisual(slug: string): ProjectVisual | undefined {
  return visuals[slug];
}
