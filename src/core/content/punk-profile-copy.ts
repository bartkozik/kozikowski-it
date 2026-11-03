interface PunkExperienceCopy {
  readonly description: string;
  readonly highlights: readonly string[];
}

interface PunkProfileCopy {
  readonly about: readonly string[];
  readonly experience: Readonly<Record<string, PunkExperienceCopy>>;
  readonly education: Readonly<Record<string, string>>;
  readonly interests: readonly string[];
}

export const punkProfileCopy: PunkProfileCopy = {
  about: [
    'Warsaw-based operator. React, TypeScript and Next.js on the surface; Node.js and PostgreSQL behind the access panel. I wire interfaces to APIs, keep data in order and get applications deployed. The mission: make real business workflows feel less like a broken terminal.',
    'Origin file: Lajka, 2018. Before the neon, there was a WordPress website, an online store and a 10-person business crew to lead. Since 2023, I have been running software contracts with Iterators: joining delivery teams and taking selected projects from brief to working product.',
    'I work directly with clients, designers and developers. Requirements come in; usable software goes out. Home node: Warsaw. Comms: English C1. Available for remote contracts worldwide or hybrid missions in Warsaw. Still human. Still reads the brief.',
  ],
  experience: {
    Iterators: {
      description:
        'Contract log: frontend and full stack development for client and internal products. Some missions call for a delivery crew; others are a solo run from requirements to a working application.',
      highlights: [
        'EPOCA: approximately three years as the main frontend developer, followed by AI-assisted contributions to the existing Scala backend.',
        'PM Traffic Manager: a solo build of the planning MVP, wiring React to Fastify, PostgreSQL and shared TypeScript domain logic. Resource management, without the inventory weight penalty.',
        'CELINA and the EPOCA landing page: sole developer on the WordPress website and the Next.js marketing site. Different engines, same operator.',
        'Squad missions across nonprofit products, art marketplaces, NFT workflows, advertising tools and business interfaces. My contribution: shipping code with the team.',
      ],
    },
    'Lajka Corp': {
      description:
        'Origin chapter: founder, business operator and web project lead. Coordinated design and website development while personally maintaining the WordPress site and online store. The business side of the terminal came first.',
      highlights: [
        'Led a 10-person business crew, including design work, and coordinated the website and e-commerce delivery. People management before package management.',
        'Personally shipped WordPress updates, improvements and fixes for the website and store. Keeping the storefront online was part of the mission.',
      ],
    },
  },
  education: {
    '10xDevs · Przeprogramowani / BRAVE':
      'Training arc: AI-assisted development and specification-driven workflows. Coursework completed: specs first, prompts second, code on the table.',
    'Coders Lab':
      'Foundational training in JavaScript, React, Redux and Python. The starting loadout before the commercial software missions.',
  },
  interests: ['Offline side quest: golf. Real grass, real clubs, no aim assist. Player and enthusiast.'],
};
