export interface ProjectDetails {
  readonly slug: string;
  readonly overview: string;
  readonly role: string;
  readonly stack: readonly string[];
  readonly highlights: readonly string[];
  readonly challenge: string;
  readonly status: string;
}

export const projectDetails: readonly ProjectDetails[] = [
  {
    slug: 'pm-traffic-manager',
    overview:
      'A collaborative planning application that brings people, project capacity and revenue into one workspace. Monthly allocations connect to weekly detail, staffing costs, expected revenue and planning risks.',
    role: 'Sole full stack developer, working as a contractor with Iterators over a six-month development period. I designed and implemented the interface, shared domain logic, API and database persistence.',
    stack: ['React', 'TypeScript', 'Fastify', 'PostgreSQL', 'Zustand', 'Mantine', 'Zod', 'Yjs', 'WebSockets'],
    highlights: [
      'Built drag-and-drop allocation planning with monthly perspectives and weekly capacity views.',
      'Shared typed calculations for staffing costs, revenue and margin between the interface and API.',
      'Implemented SAML authentication, access administration, audit logging and collaborative presence.',
      'Added domain, API and interface tests, plus Docker Compose and Caddy deployment configuration.',
    ],
    challenge:
      'Keep planning calculations consistent across interactive views and concurrent edits while retaining the API and PostgreSQL as the durable source of business data.',
    status:
      'Working MVP. The application has not been released to production; a sanitized source snapshot is available.',
  },
  {
    slug: 'epoca',
    overview:
      'A commercial application for recording work, managing clients and projects, and producing detailed reports. It supports around 60 users at Iterators and teams at several law firms.',
    role: 'Main frontend developer for approximately three years, collaborating with backend developers and testers. During the last year I also contributed to the existing Scala backend through AI-assisted development.',
    stack: ['React', 'TypeScript', 'TanStack Query', 'SCSS', 'i18next', 'Scala', 'Pekko HTTP', 'PostgreSQL'],
    highlights: [
      'Built time-entry, worklog correction and history workflows, plus client and project management interfaces.',
      'Developed configurable pivot reports, reporting filters and export workflows.',
      'Maintained reusable accessible controls and Polish and English interface translations.',
      'Added component and Playwright regression coverage and contributed to existing backend features.',
    ],
    challenge:
      'Make detailed work records and configurable reports understandable while keeping permissions, correction history and interface state consistent with the existing API.',
    status:
      'Commercial product. Public frontend and backend snapshots preserve the application and team contributions.',
  },
  {
    slug: 'celina',
    overview:
      'A corporate website rebuilt around WordPress and native Gutenberg editing. Custom blocks and page patterns give the client control over content, media, navigation and the shared site layout.',
    role: 'Sole developer responsible for the concept, design, implementation and deployment, working directly with the client throughout delivery.',
    stack: ['WordPress', 'Gutenberg', 'React', 'TypeScript', 'PHP', 'Sass', 'GeneratePress', 'Vitest', 'Playwright'],
    highlights: [
      'Created 21 insertable custom Gutenberg block types with React and TypeScript editor controls.',
      'Implemented PHP rendering, editable page patterns and site-wide header and footer editing.',
      'Integrated HubSpot contact forms and Paycor job listings with configurable settings and fallback states.',
      'Built regression checks for editor and frontend behavior, with documentation for ongoing content editing.',
    ],
    challenge:
      'Give the client flexible editing without losing the intended layout or breaking previously saved content, across both Gutenberg and the public website.',
    status:
      'Implementation completed and deployed to the client’s staging site. The website is awaiting publication by the client. A sanitized source snapshot includes the custom theme, blocks and editing workflows.',
  },
  {
    slug: 'board-dev',
    overview:
      'A platform connecting technology leaders with nonprofit board opportunities. Application forms, matching views and candidate comparisons support the process from registration to reviewing a potential match.',
    role: 'Frontend team member with direct client communication. My work focused on application forms, validation and matching interfaces within the existing product.',
    stack: ['React', 'TypeScript', 'MobX', 'Mantine', 'React Hook Form', 'Zod', 'Vite', 'Sass'],
    highlights: [
      'Developed reusable application forms and schema-based validation.',
      'Implemented matching views and candidate comparison workflows.',
      'Worked within role-aware user and organization workflows and the existing API architecture.',
      'Collaborated directly with the client and the product team to clarify interface behavior.',
    ],
    challenge:
      'Turn detailed application information into clear registration and comparison flows while working within established roles, form state and API contracts.',
    status: 'Team project. A sanitized frontend source snapshot is public; the backend remains private.',
  },
  {
    slug: 'epoca-landing-page',
    overview:
      'A Polish-language product website introducing EPOCA through animated feature sections, comparisons and demo-booking calls to action. The interface adapts detailed product information for desktop and mobile screens.',
    role: 'Sole developer of the complete landing page, including responsive layouts, reusable components, animations and frontend implementation.',
    stack: ['Next.js', 'React', 'TypeScript', 'SCSS Modules', 'Framer Motion', 'Swiper'],
    highlights: [
      'Built animated product sections, shared navigation and responsive feature showcases.',
      'Created two comparison interfaces for pricing and product alternatives, with mobile carousel layouts.',
      'Implemented an interactive FAQ and configurable Calendly demo-booking links.',
      'Added SEO and social-sharing metadata, plus privacy-policy and terms pages.',
    ],
    challenge:
      'Present a detailed business product clearly on small screens while keeping motion, navigation and comparisons consistent across the page.',
    status: 'Completed landing-page implementation. A sanitized source snapshot is available.',
  },
  {
    slug: 'art-network',
    overview:
      'Bank-facing interfaces for an art marketplace, covering transaction review, document handling and compliance workflows. The screens help financial teams inspect participants and move transactions through the required steps.',
    role: 'Frontend developer within the product team, implementing banking and compliance interfaces in collaboration with designers, backend developers and testers.',
    stack: ['React', 'TypeScript', 'MobX', 'Mantine', 'React Router', 'Zod', 'React PDF'],
    highlights: [
      'Built transaction and invoice views from Figma designs within an existing React application.',
      'Implemented PDF upload and preview flows, escrow forms and IBAN validation.',
      'Developed participant-verification and KYC settings interfaces.',
      'Coordinated UI states and validation with backend API behavior and testing.',
    ],
    challenge:
      'Make transaction status, supporting documents and validation requirements clear for banking users across a multi-step financial workflow.',
    status:
      'Commercial team project. The public repository contains a case study; implementation code remains private.',
  },
  {
    slug: 'liquid-editions',
    overview:
      'An NFT marketplace with wallet-based sign-in and portfolio views. The interface connects wallet state, authenticated sessions and asset information within a distinctive visual design.',
    role: 'Developer within the product team, contributing to frontend and backend features. My main areas were wallet authentication, session flows and the portfolio interface.',
    stack: ['Next.js', 'React', 'TypeScript', 'wagmi', 'RainbowKit', 'ethers.js', 'Zustand', 'TanStack Query', 'tRPC'],
    highlights: [
      'Implemented wallet connection, login and logout flows with session-aware interface states.',
      'Built a portfolio dashboard displaying NFT assets and user connections.',
      'Handled wallet-provider differences, connection errors and fallback states.',
      'Delivered responsive interfaces and resolved layout and interaction details where designs were incomplete.',
    ],
    challenge:
      'Keep wallet connection, authentication and application state aligned while handling provider differences and interrupted user flows.',
    status: 'Commercial team project. A public case study describes the contribution; source code remains private.',
  },
  {
    slug: 'fanimani',
    overview:
      'Frontend work on a nonprofit platform redesign, spanning fundraising, organization dashboards, help and editorial content. Desktop and mobile Figma designs were translated into reusable React views.',
    role: 'Frontend contributor working within the existing application and design system, incorporating team review feedback throughout implementation.',
    stack: ['React', 'TypeScript', 'Vite', 'SCSS Modules', 'i18next', 'Figma'],
    highlights: [
      'Implemented responsive fundraising lists, creation flows and organization panels.',
      'Built reusable help and blog layouts with filtering, navigation and explicit empty states.',
      'Extended shared tabs, chips, typography and layout patterns for consistent interfaces.',
      'Maintained Polish and English messages, including dynamic placeholders and accessible labels.',
    ],
    challenge:
      'Apply new designs consistently across different content and organization contexts without duplicating the shared interface components.',
    status:
      'Frontend redesign contribution. The public repository contains a case study of the private implementation.',
  },
  {
    slug: 'accounting-ui-prototype',
    overview:
      'A presales interface prototype exploring an accounting product through dashboards, forms and tables. It was one of three frontend alternatives presented to support decisions about the interface and technology stack.',
    role: 'Developer responsible for the Mantine-based frontend variant, including the interactive views and an explanation of the stack trade-offs.',
    stack: ['React', 'TypeScript', 'Vite', 'Mantine', 'React Hook Form', 'Zod', 'TanStack Query', 'TanStack Table'],
    highlights: [
      'Implemented dashboard, validated-form and data-table views for the presentation.',
      'Integrated charts, date pickers and notification flows.',
      'Used mocked API interactions to demonstrate the proposed user experience.',
      'Prepared a comparison of component flexibility and development trade-offs for stack selection.',
    ],
    challenge:
      'Demonstrate realistic interactions within a short presales phase while keeping prototype behavior and production requirements clearly separated.',
    status:
      'Presales prototype for client evaluation. A public case study describes the work; it was not a production system.',
  },
  {
    slug: 'ad-template-platform',
    overview:
      'A template-driven advertising platform with customizable text, images and shapes. My work covered template behavior, interactive editing controls and supporting brand-configuration workflows.',
    role: 'Developer responsible for the template creation system within an existing product team, collaborating with designers, backend developers and QA.',
    stack: ['React', 'TypeScript', 'Vite', 'React Hook Form', 'Zod', 'dnd-kit', 'opentype.js', 'pixelmatch', 'Vitest'],
    highlights: [
      'Created customizable templates with content limits, text measurement and dynamic element positioning.',
      'Refined gradient and color controls and consolidated shared fill-state updates.',
      'Contributed to brand creation from uploaded documents and related validation states.',
      'Maintained typed models and focused regression coverage for template and editor behavior.',
    ],
    challenge:
      'Keep template rendering and editor state predictable as text, fonts, colors and layout constraints change across different creative formats.',
    status:
      'Commercial team project. A public case study covers approved contribution details; source code remains private.',
  },
];

export function getProjectDetails(slug: string): ProjectDetails | undefined {
  return projectDetails.find((project) => project.slug === slug);
}
