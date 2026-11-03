import assert from 'node:assert/strict';
import test from 'node:test';
import { getModeSnapshot, setInterfaceMode } from '../mode-store.ts';

test('a failed preference write still changes mode in the current tab', () => {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const document = { documentElement: { dataset: {} as Record<string, string> } };
  const window = new EventTarget();
  Object.assign(window, {
    localStorage: {
      getItem: () => 'night',
      setItem: () => {
        throw new Error('Quota exceeded');
      },
    },
  });
  Object.defineProperty(globalThis, 'window', { configurable: true, value: window });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: document });
  try {
    setInterfaceMode('punk');
    assert.equal(getModeSnapshot(), 'punk');
    assert.equal(document.documentElement.dataset.mode, 'punk');
    setInterfaceMode('day');
    assert.equal(getModeSnapshot(), 'day');
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow);
    else Reflect.deleteProperty(globalThis, 'window');
    if (previousDocument) Object.defineProperty(globalThis, 'document', previousDocument);
    else Reflect.deleteProperty(globalThis, 'document');
  }
});
