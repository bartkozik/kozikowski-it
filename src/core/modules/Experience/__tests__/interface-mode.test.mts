import assert from 'node:assert/strict';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { modeBootstrap, parseInterfaceMode } from '../interface-mode.ts';

test('only supported preferences are accepted and day remains the default', () => {
  for (const value of [null, undefined, '', 'system', '<script>', {}, 123])
    assert.equal(parseInterfaceMode(value), 'day');
  for (const value of ['day', 'night', 'punk']) assert.equal(parseInterfaceMode(value), value);
});

test('the pre-paint preference matches the client parser, including blocked storage', () => {
  for (const stored of [null, 'night', 'punk', 'invalid']) {
    const document = { documentElement: { dataset: {} as Record<string, string> } };
    runInNewContext(modeBootstrap, { document, localStorage: { getItem: () => stored } });
    assert.equal(document.documentElement.dataset.mode, parseInterfaceMode(stored));
  }
  const document = { documentElement: { dataset: {} as Record<string, string> } };
  runInNewContext(modeBootstrap, {
    document,
    localStorage: {
      getItem: () => {
        throw new Error('Storage blocked');
      },
    },
  });
  assert.equal(document.documentElement.dataset.mode, 'day');
});
