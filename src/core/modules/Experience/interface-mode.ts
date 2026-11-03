export const interfaceModes = ['day', 'night', 'punk'] as const;
export type InterfaceMode = (typeof interfaceModes)[number];
export const modeStorageKey = 'kozikowski-interface-mode';

export function parseInterfaceMode(value: unknown): InterfaceMode {
  return interfaceModes.includes(value as InterfaceMode) ? (value as InterfaceMode) : 'day';
}

export const modeBootstrap = `try{var m=localStorage.getItem(${JSON.stringify(modeStorageKey)});document.documentElement.dataset.mode=${JSON.stringify(interfaceModes)}.includes(m)?m:'day'}catch{document.documentElement.dataset.mode='day'}`;
