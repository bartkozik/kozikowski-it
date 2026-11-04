'use client';

import { useSyncExternalStore } from 'react';

export const mobileViewportQuery = '(max-width: 699px)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(mobileViewportQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getSnapshot() {
  return window.matchMedia(mobileViewportQuery).matches;
}

function getServerSnapshot() {
  return false;
}

export function useMobileViewport() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
