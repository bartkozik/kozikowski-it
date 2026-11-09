'use client';

import { useSyncExternalStore } from 'react';

import { mobileViewport } from '@/core/browser/media-queries';

export function useMobileViewport() {
  return useSyncExternalStore(mobileViewport.subscribe, mobileViewport.getSnapshot, mobileViewport.getServerSnapshot);
}
