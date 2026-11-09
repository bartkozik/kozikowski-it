export interface ProfileExperience {
  readonly company: string;
  readonly title: string;
  readonly period: string;
  readonly description: string;
  readonly highlights: readonly string[];
}

export interface ProfileSkillGroup {
  readonly category: string;
  readonly items: readonly string[];
}

export interface ProfileEducation {
  readonly institution: string;
  readonly course: string;
  readonly period: string;
  readonly description: string;
}

export interface ProfileLink {
  readonly label: string;
  readonly href: `https://${string}`;
}

export interface PortfolioProfile {
  readonly name: string;
  readonly title: string;
  readonly email: string;
  readonly contactHref: `mailto:${string}`;
  readonly location: string;
  readonly availability: string;
  readonly english: string;
  readonly about: readonly string[];
  readonly experience: readonly ProfileExperience[];
  readonly skills: readonly ProfileSkillGroup[];
  readonly education: readonly ProfileEducation[];
  readonly interests: readonly string[];
  readonly links: readonly ProfileLink[];
}

const contactEmail = 'bartosz@kozikowski.it';

export const profile: PortfolioProfile = {
  name: 'Bartosz Kozikowski',
  title: 'Full Stack Developer',
  email: contactEmail,
  contactHref: `mailto:${contactEmail}`,
  location: 'Warsaw, Poland',
  availability: 'Remote worldwide or hybrid in Warsaw',
  english: 'C1',
  about: [
    'I build web applications with React, TypeScript, Next.js, Node.js and PostgreSQL. My work combines interface development with APIs, data persistence and deployment, with particular attention to clear interactions and practical business workflows.',
    'My commercial web experience began in 2018 at Lajka, where I maintained a WordPress website and online store while leading a 10-person business team. Since 2023 I have worked with Iterators as a software development contractor, contributing to client products and independently delivering selected projects.',
    'I work closely with clients, designers and developers to turn business requirements into usable software. I am based in Warsaw, speak English at C1 level, and am open to remote work worldwide or hybrid work in Warsaw.',
  ],
  experience: [
    {
      company: 'Iterators',
      title: 'Software Developer · Contract',
      period: 'February 2023–present',
      description:
        'Frontend and full stack development across client and internal projects, from established team applications to independently built products and websites.',
      highlights: [
        'Main frontend developer of EPOCA for approximately three years, with later AI-assisted contributions to its existing Scala backend.',
        'Sole developer of the PM Traffic Manager planning MVP, spanning React, Fastify, PostgreSQL and shared TypeScript domain logic.',
        'Sole developer of the CELINA WordPress website and the EPOCA Next.js landing page.',
        'Team contributions to nonprofit, art-marketplace, NFT, advertising and business-interface projects.',
      ],
    },
    {
      company: 'Lajka Corp',
      title: 'Founder and Web Project Lead',
      period: 'April 2018–October 2022',
      description:
        'Combined running the business with responsibility for its website and online store, coordinating design and web development while personally maintaining WordPress.',
      highlights: [
        'Led a 10-person business team, including design work, and coordinated website and e-commerce development.',
        'Personally implemented WordPress updates, improvements and fixes for the website and store.',
      ],
    },
  ],
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Vite', 'HTML', 'CSS', 'SCSS'],
    },
    {
      category: 'Backend and data',
      items: ['Node.js', 'Fastify', 'REST APIs', 'PostgreSQL', 'SQL', 'Shared TypeScript contracts'],
    },
    {
      category: 'Interface and state',
      items: ['TanStack Query', 'MobX', 'Zustand', 'React Hook Form', 'Zod', 'Mantine', 'i18next'],
    },
    {
      category: 'Testing',
      items: ['Vitest', 'React Testing Library', 'Playwright', 'Jest'],
    },
    {
      category: 'Delivery and CMS',
      items: ['Git', 'GitLab CI/CD', 'Docker', 'Docker Compose', 'Caddy', 'WordPress', 'Gutenberg'],
    },
  ],
  education: [
    {
      institution: '10xDevs · Przeprogramowani / BRAVE',
      course: 'AI-assisted software development',
      period: 'Coursework completed June 2026',
      description: 'Training in AI-assisted development and specification-driven workflows.',
    },
    {
      institution: 'Coders Lab',
      course: 'JavaScript and Python Developer Bootcamp',
      period: 'June 2022–January 2023',
      description: 'Training covering JavaScript, React, Redux and Python.',
    },
  ],
  interests: ['Golf — player and enthusiast'],
  links: [
    { label: 'GitHub', href: 'https://github.com/bartkozik' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bartosz-kozikowski/' },
  ],
};
