export interface PunkProjectCopy {
  readonly tagline: string;
  readonly overview: string;
  readonly challenge: string;
}

const punkProjectCopy: Readonly<Record<string, PunkProjectCopy>> = {
  'pm-traffic-manager': {
    tagline: 'Crew allocation, capacity and revenue. Your planning console just got an upgrade.',
    overview:
      'A crew-allocation console for the corporate sprawl. Slot people into projects, zoom from monthly plans into weekly capacity, and watch staffing costs, revenue and planning risks share one screen. The inventory is your team’s time. Overbooking is still a terrible build.',
    challenge:
      'Survive concurrent edits without splitting reality: every planning view needs the same calculations, with the API and PostgreSQL keeping the durable record.',
  },
  epoca: {
    tagline: 'A black box for billable hours. Recover the workday from the noise.',
    overview:
      'The workday disappears. This console keeps a record. EPOCA turns time entries, clients and projects into worklogs and detailed reports for around 60 people at Iterators and teams at several law firms. No time travel installed. Just a much better account of where the hours went.',
    challenge:
      'Keep the timeline readable: detailed records, correction history, permissions and configurable reports all have to agree with the existing API.',
  },
  celina: {
    tagline: 'Corporate identity, rebuilt in blocks. The client holds the controls.',
    overview:
      'A new interface for the corporate shell, with the editing controls handed to the client. Custom WordPress blocks and Gutenberg patterns power content, media, navigation and the shared site layout. Change the message without calling a developer into the control room for every update.',
    challenge:
      'Give editors room to move without letting the layout go rogue. New blocks and patterns must coexist with saved content in Gutenberg and on the public site.',
  },
  'board-dev': {
    tagline: 'Match tech leaders with nonprofit boards. Put your network to better use.',
    overview:
      'A connection hub for tech leaders looking to put their experience on a nonprofit board. Application forms, matching views and candidate comparisons turn a pile of profiles into a reviewable path from registration to a potential match. Human decisions stay with the humans.',
    challenge:
      'Make the dossier readable: detailed applications need clear registration and comparison flows that respect existing roles, form state and API contracts.',
  },
  'epoca-landing-page': {
    tagline: 'EPOCA’s public signal. Product stories, motion and a route to a demo.',
    overview:
      'The public broadcast for EPOCA, transmitted in Polish. Animated feature sections, comparisons and demo-booking links introduce the product across desktop and mobile screens. A Next.js landing page built to explain the machinery before anyone steps into the cockpit.',
    challenge:
      'Fit the signal onto a small screen: detailed product information, motion and comparison tables need to stay readable without fighting the navigation.',
  },
  'art-network': {
    tagline: 'Art deals meet bank controls. Even the gallery has a compliance terminal.',
    overview:
      'Behind the gallery lights sits a banking terminal. These art-marketplace interfaces bring transaction review, invoices, documents and participant verification into the financial team’s workflow. Escrow forms and KYC screens do the unglamorous work. The paintings get the spotlight.',
    challenge:
      'Boss fight: financial workflows. Transaction states, supporting documents and validation rules must stay understandable through every step of the banking process.',
  },
  'liquid-editions': {
    tagline: 'Jack in your wallet. Keep your session and NFT portfolio in sync.',
    overview:
      'A wallet-connected doorway into an NFT marketplace. Sign-in, session state and portfolio views share a distinctive visual interface, while connection errors and provider differences wait in the wiring. The job: make those moving parts behave like one application.',
    challenge:
      'Keep the connection intact when the flow breaks: wallet providers, authentication and application state must agree after interruptions as well as successful sign-ins.',
  },
  fanimani: {
    tagline: 'An empathy upgrade for the web. Fundraising with a clearer interface.',
    overview:
      'A little more humanity in the interface. This nonprofit-platform redesign connects fundraising, organization panels, help and editorial content through reusable React views. Desktop and mobile Figma layouts become working screens, with Polish and English messages keeping the signal accessible.',
    challenge:
      'Spread the redesign without cloning the machinery: different content and organization workflows need to share the same interface components.',
  },
  'accounting-ui-prototype': {
    tagline: 'Test-drive the finance console. Simulated data, real interface decisions.',
    overview:
      'A finance-console simulation built for a presales decision. My Mantine-based variant was one of three frontend alternatives, combining dashboards, charts, validated forms and tables with mocked API interactions. A test rig for the interface and stack, not a production accounting system.',
    challenge:
      'Make the simulation useful under a short presales clock, while keeping mocked interactions clearly separate from production requirements.',
  },
  'ad-template-platform': {
    tagline: 'The billboard foundry. Bend text, color and layout without breaking the template.',
    overview:
      'Inside the billboard foundry, every headline wants more space. This template-driven advertising platform lets users shape text, images and graphics through interactive controls. My work covered template behavior, editing tools and brand-configuration flows inside the product team.',
    challenge:
      'Boss fight: one more font change. Keep rendering and editor state predictable as text, colors, typefaces and layout constraints collide across creative formats.',
  },
};

export function getPunkProjectCopy(slug: string): PunkProjectCopy | undefined {
  return punkProjectCopy[slug];
}
