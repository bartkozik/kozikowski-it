import assert from 'node:assert/strict';
import test from 'node:test';
import { initialLoadout, loadoutReducer, creditsRemaining } from '../loadout.ts';

test('installing an implant spends credits exactly once', () => {
  const installed = loadoutReducer(initialLoadout, { type: 'install', slug: 'epoca' });
  assert.deepEqual(installed.installed, ['epoca']);
  assert.equal(creditsRemaining(installed), 620);
  const duplicate = loadoutReducer(installed, { type: 'install', slug: 'epoca' });
  assert.deepEqual(duplicate.installed, ['epoca']);
  assert.equal(creditsRemaining(duplicate), 620);
});

test('insufficient credit cannot purchase an implant', () => {
  let state = loadoutReducer(initialLoadout, { type: 'install', slug: 'epoca' });
  state = loadoutReducer(state, { type: 'install', slug: 'pm-traffic-manager' });
  const blocked = loadoutReducer(state, { type: 'install', slug: 'art-network' });
  assert.deepEqual(blocked.installed, state.installed);
  assert.equal(creditsRemaining(blocked), 200);
  assert.match(blocked.message, /credits/i);
});

test('only three slots are available even with credits left', () => {
  let state = initialLoadout;
  for (const slug of ['epoca-landing-page', 'celina', 'board-dev']) {
    state = loadoutReducer(state, { type: 'install', slug });
  }
  const blocked = loadoutReducer(state, { type: 'install', slug: 'epoca' });
  assert.equal(blocked.installed.length, 3);
  assert.equal(creditsRemaining(blocked), 420);
  assert.match(blocked.message, /slots/i);
});

test('removal refunds the original price and cannot mint credits', () => {
  const installed = loadoutReducer(initialLoadout, { type: 'install', slug: 'epoca' });
  const removed = loadoutReducer(installed, { type: 'remove', slug: 'epoca' });
  assert.deepEqual(removed.installed, []);
  assert.equal(creditsRemaining(removed), 1000);
  assert.equal(creditsRemaining(loadoutReducer(removed, { type: 'remove', slug: 'epoca' })), 1000);
});

test('unknown implants are rejected and reboot restores the sandbox', () => {
  assert.deepEqual(loadoutReducer(initialLoadout, { type: 'install', slug: 'unknown' }).installed, []);
  const installed = loadoutReducer(initialLoadout, { type: 'install', slug: 'epoca' });
  const rebooted = loadoutReducer(installed, { type: 'reset' });
  assert.deepEqual(rebooted.installed, []);
  assert.equal(creditsRemaining(rebooted), 1000);
});
