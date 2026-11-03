import { getImplant } from './implants.ts';

export const STARTING_CREDITS = 1000;
export const IMPLANT_SLOTS = 3;
export type LoadoutState = { installed: string[]; message: string };
export type LoadoutAction = { type: 'install' | 'remove'; slug: string } | { type: 'reset' };
export const initialLoadout: LoadoutState = {
  installed: [],
  message: 'System online. Your organic hardware could use an upgrade.',
};

export function creditsRemaining(state: LoadoutState): number {
  return STARTING_CREDITS - state.installed.reduce((total, slug) => total + (getImplant(slug)?.price ?? 0), 0);
}

export function loadoutReducer(state: LoadoutState, action: LoadoutAction): LoadoutState {
  if (action.type === 'reset') return { installed: [], message: 'Reboot complete. Humanity restored. For now.' };
  const implant = getImplant(action.slug);
  if (!implant) return state;
  const installed = state.installed.includes(action.slug);
  if (action.type === 'remove') {
    if (!installed) return state;
    return {
      installed: state.installed.filter((slug) => slug !== action.slug),
      message: `${implant.name} removed. ${implant.price} credits refunded. No scar, no paperwork.`,
    };
  }
  if (installed) return state;
  if (state.installed.length >= IMPLANT_SLOTS)
    return { ...state, message: 'All 3 slots occupied. Uninstall an implant before upgrading your humanity again.' };
  if (creditsRemaining(state) < implant.price)
    return {
      ...state,
      message: 'Not enough credits. Uninstall something. Your kidneys are not an accepted payment method.',
    };
  return {
    installed: [...state.installed, action.slug],
    message: `${implant.name} installed. Side effect: ${implant.sideEffect}`,
  };
}
