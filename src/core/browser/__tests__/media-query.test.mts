import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';

import { createMediaQuery } from '../media-query.ts';

function mockMatchMedia(t: TestContext) {
  const queries = new Map<string, { matches: boolean; target: EventTarget }>();
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      matchMedia(query: string) {
        if (!queries.has(query)) queries.set(query, { matches: false, target: new EventTarget() });
        const state = queries.get(query)!;
        return {
          get matches() {
            return state.matches;
          },
          addEventListener: state.target.addEventListener.bind(state.target),
          removeEventListener: state.target.removeEventListener.bind(state.target),
        };
      },
    },
  });
  t.after(() => {
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow);
    else Reflect.deleteProperty(globalThis, 'window');
  });
  return (query: string, matches: boolean) => {
    const state = queries.get(query)!;
    state.matches = matches;
    state.target.dispatchEvent(new Event('change'));
  };
}

test('media query can be created and rendered on the server without window', () => {
  const query = createMediaQuery('(max-width: 699px)');
  assert.equal(query.getServerSnapshot(), false);
});

test('snapshots reflect current browser preferences, including before subscription', (t) => {
  const change = mockMatchMedia(t);
  const query = createMediaQuery('(prefers-reduced-motion: reduce)');
  assert.equal(query.getSnapshot(), false);
  change('(prefers-reduced-motion: reduce)', true);
  assert.equal(query.getSnapshot(), true);
});

test('subscribers are notified synchronously and clean up independently', (t) => {
  const change = mockMatchMedia(t);
  const query = createMediaQuery('(max-width: 699px)');
  const first: boolean[] = [];
  const second: boolean[] = [];
  const unsubscribeFirst = query.subscribe(() => first.push(query.getSnapshot()));
  const unsubscribeSecond = query.subscribe(() => second.push(query.getSnapshot()));

  change('(max-width: 699px)', true);
  assert.deepEqual(first, [true]);
  assert.deepEqual(second, [true]);
  unsubscribeFirst();
  change('(max-width: 699px)', false);
  assert.deepEqual(first, [true]);
  assert.deepEqual(second, [true, false]);
  unsubscribeSecond();
  change('(max-width: 699px)', true);
  assert.deepEqual(second, [true, false]);
});

test('different media queries do not notify each other', (t) => {
  const change = mockMatchMedia(t);
  const mobile = createMediaQuery('(max-width: 699px)');
  const motion = createMediaQuery('(prefers-reduced-motion: reduce)');
  let mobileUpdates = 0;
  let motionUpdates = 0;
  const stopMobile = mobile.subscribe(() => mobileUpdates++);
  const stopMotion = motion.subscribe(() => motionUpdates++);
  t.after(stopMobile);
  t.after(stopMotion);

  change('(prefers-reduced-motion: reduce)', true);
  assert.equal(motionUpdates, 1);
  assert.equal(mobileUpdates, 0);
  assert.equal(mobile.getSnapshot(), false);
});
