type GitHubRepositoryUrl = `https://github.com/bartkozik/${string}`;

export interface ProjectResource {
  readonly kind: 'source' | 'case-study';
  readonly label: string;
  readonly url: GitHubRepositoryUrl;
}

export interface PortfolioProject {
  readonly slug: string;
  readonly name: string;
  readonly tagline: string;
  readonly resources: readonly [ProjectResource, ...ProjectResource[]];
  readonly demoUrl?: `https://${string}`;
}

export const projects = [
  {
    slug: 'pm-traffic-manager',
    name: 'PM Traffic Manager',
    tagline: 'Fullstack capacity and revenue planning MVP',
    demoUrl: 'https://traffic.kozikowski.it',
    resources: [
      {
        kind: 'source',
        label: 'Source code',
        url: 'https://github.com/bartkozik/pm-traffic-manager',
      },
    ],
  },
  {
    slug: 'epoca',
    name: 'EPOCA',
    tagline: 'Time tracking and reporting application',
    demoUrl: 'https://epoca.kozikowski.it',
    resources: [
      {
        kind: 'source',
        label: 'Frontend source',
        url: 'https://github.com/bartkozik/epoca-frontend',
      },
      {
        kind: 'source',
        label: 'Backend source',
        url: 'https://github.com/bartkozik/epoca-backend',
      },
    ],
  },
  {
    slug: 'celina',
    name: 'CELINA',
    tagline: 'Corporate website with custom WordPress blocks',
    resources: [
      {
        kind: 'source',
        label: 'Source code',
        url: 'https://github.com/bartkozik/celina-website',
      },
    ],
  },
  {
    slug: 'board-dev',
    name: 'Board.Dev',
    tagline: 'Nonprofit matchmaking and registration workflows',
    resources: [
      {
        kind: 'source',
        label: 'Frontend source',
        url: 'https://github.com/bartkozik/board-dev-frontend',
      },
    ],
  },
  {
    slug: 'epoca-landing-page',
    name: 'EPOCA Landing Page',
    tagline: 'Animated marketing website built with Next.js',
    resources: [
      {
        kind: 'source',
        label: 'Source code',
        url: 'https://github.com/bartkozik/next-js-landing-page',
      },
    ],
  },
  {
    slug: 'art-network',
    name: 'Art Network',
    tagline: 'Art marketplace banking and compliance interfaces',
    resources: [
      {
        kind: 'case-study',
        label: 'Case study',
        url: 'https://github.com/bartkozik/art-market',
      },
    ],
  },
  {
    slug: 'liquid-editions',
    name: 'Liquid Editions',
    tagline: 'NFT marketplace wallet and portfolio workflows',
    resources: [
      {
        kind: 'case-study',
        label: 'Case study',
        url: 'https://github.com/bartkozik/nft-market',
      },
    ],
  },
  {
    slug: 'fanimani',
    name: 'FaniMani',
    tagline: 'Nonprofit platform interface redesign',
    resources: [
      {
        kind: 'case-study',
        label: 'Case study',
        url: 'https://github.com/bartkozik/nonprofit-platform-redesign',
      },
    ],
  },
  {
    slug: 'accounting-ui-prototype',
    name: 'Accounting UI Prototype',
    tagline: 'Presales dashboards, charts and validated forms',
    resources: [
      {
        kind: 'case-study',
        label: 'Case study',
        url: 'https://github.com/bartkozik/accounting-system-presales',
      },
    ],
  },
  {
    slug: 'ad-template-platform',
    name: 'Ad Template Platform',
    tagline: 'Interactive ad templates and editor controls',
    resources: [
      {
        kind: 'case-study',
        label: 'Case study',
        url: 'https://github.com/bartkozik/ad-platform',
      },
    ],
  },
] as const satisfies readonly PortfolioProject[];

export type ProjectSlug = (typeof projects)[number]['slug'];
