export interface Implant {
  slug: string;
  name: string;
  category: string;
  price: number;
  perk: string;
  sideEffect: string;
  code: string;
}

export const implants: readonly Implant[] = [
  {
    slug: 'pm-traffic-manager',
    name: 'Resource Overclock',
    category: 'Neural planner',
    price: 420,
    perk: '+40 capacity vision',
    sideEffect: 'You start estimating the ETA of your breakfast.',
    code: 'CPU-01',
  },
  {
    slug: 'epoca',
    name: 'Chrono Cortex',
    category: 'Temporal implant',
    price: 380,
    perk: '+60 time awareness',
    sideEffect: 'Every coffee break now has a timesheet.',
    code: 'CLK-02',
  },
  {
    slug: 'celina',
    name: 'Chrome Identity',
    category: 'Dermal interface',
    price: 200,
    perk: '+35 first impressions',
    sideEffect: 'You introduce yourself with a hero section.',
    code: 'SKN-03',
  },
  {
    slug: 'board-dev',
    name: 'Alliance Link',
    category: 'Social circuitry',
    price: 260,
    perk: '+50 human connection',
    sideEffect: 'Small talk occasionally returns a match score.',
    code: 'NET-04',
  },
  {
    slug: 'epoca-landing-page',
    name: 'Retina Magnet',
    category: 'Optical mod',
    price: 120,
    perk: '+25 attention capture',
    sideEffect: 'You enter every room with an animation.',
    code: 'EYE-05',
  },
  {
    slug: 'art-network',
    name: 'Gallery Ghost',
    category: 'Taste accelerator',
    price: 460,
    perk: '+80 art intuition',
    sideEffect: 'You call your laundry pile an installation.',
    code: 'ART-06',
  },
  {
    slug: 'liquid-editions',
    name: 'Wallet Phantom',
    category: 'Cryptographic limb',
    price: 340,
    perk: '+45 wallet reflexes',
    sideEffect: 'You ask the toaster to connect its wallet.',
    code: 'KEY-07',
  },
  {
    slug: 'fanimani',
    name: 'Karma Engine',
    category: 'Empathy upgrade',
    price: 180,
    perk: '+70 good intentions',
    sideEffect: 'You donate your last remaining browser tab.',
    code: 'HRT-08',
  },
  {
    slug: 'accounting-ui-prototype',
    name: 'Ledger Lens',
    category: 'Numerical vision',
    price: 220,
    perk: '+55 spreadsheet sight',
    sideEffect: 'The world looks suspiciously like a dashboard.',
    code: 'NUM-09',
  },
  {
    slug: 'ad-template-platform',
    name: 'Adrenaline Editor',
    category: 'Creative overdrive',
    price: 300,
    perk: '+90 layout chaos',
    sideEffect: 'You can no longer leave a rectangle unedited.',
    code: 'ADX-10',
  },
];

export function getImplant(slug: string) {
  return implants.find((implant) => implant.slug === slug);
}
