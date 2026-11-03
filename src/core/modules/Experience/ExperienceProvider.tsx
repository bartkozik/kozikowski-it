'use client';

import { createContext, useContext, useReducer, useSyncExternalStore, type Dispatch, type ReactNode } from 'react';

import { type InterfaceMode } from './interface-mode';
import { initialLoadout, loadoutReducer, type LoadoutAction, type LoadoutState } from './loadout';
import { getModeSnapshot, getServerModeSnapshot, subscribeToMode } from './mode-store';

const ExperienceContext = createContext<{
  mode: InterfaceMode;
  loadout: LoadoutState;
  dispatch: Dispatch<LoadoutAction>;
} | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(subscribeToMode, getModeSnapshot, getServerModeSnapshot);
  const [loadout, dispatch] = useReducer(loadoutReducer, initialLoadout);
  return <ExperienceContext.Provider value={{ mode, loadout, dispatch }}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const experience = useContext(ExperienceContext);
  if (!experience) throw new Error('ExperienceProvider is required.');
  return experience;
}
