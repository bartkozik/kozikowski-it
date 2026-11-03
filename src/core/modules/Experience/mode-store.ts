import { modeStorageKey, parseInterfaceMode, type InterfaceMode } from './interface-mode.ts';

let fallbackMode: InterfaceMode = 'day';
let sessionOnly = false;
const changeEvent = 'portfolio-mode-change';

export function getModeSnapshot(): InterfaceMode {
  if (sessionOnly) return fallbackMode;
  try {
    return parseInterfaceMode(window.localStorage.getItem(modeStorageKey));
  } catch {
    return fallbackMode;
  }
}

export function getServerModeSnapshot(): InterfaceMode {
  return 'day';
}

export function setInterfaceMode(mode: InterfaceMode) {
  fallbackMode = mode;
  document.documentElement.dataset.mode = mode;
  try {
    window.localStorage.setItem(modeStorageKey, mode);
    sessionOnly = false;
  } catch {
    sessionOnly = true;
  }
  window.dispatchEvent(new Event(changeEvent));
}

export function subscribeToMode(listener: () => void) {
  function syncStorage(event: StorageEvent) {
    if (event.key !== modeStorageKey && event.key !== null) return;
    sessionOnly = false;
    const mode = getModeSnapshot();
    document.documentElement.dataset.mode = mode;
    listener();
  }
  window.addEventListener(changeEvent, listener);
  window.addEventListener('storage', syncStorage);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener('storage', syncStorage);
  };
}
