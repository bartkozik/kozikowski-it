import assert from 'node:assert/strict';
import test from 'node:test';

import { isProjectVisible, nextArrangement } from '../project-filters.ts';

const slugs = ['epoca', 'board-dev', 'pm-traffic-manager', 'ad-template-platform', 'art-network', 'celina'];

test('selecting each filter shows only its projects and selecting it again keeps the selection', () => {
  for (const [filter, expected] of [
    ['loved', ['epoca', 'board-dev', 'pm-traffic-manager']],
    ['painful', ['ad-template-platform', 'art-network']],
  ] as const) {
    const active = nextArrangement('original', filter);
    assert.deepEqual(
      slugs.filter((slug) => isProjectVisible(slug, active)),
      expected,
    );
    assert.equal(nextArrangement(active, filter), filter);
  }
});

test('switching filters replaces the selection and reset shows all projects', () => {
  assert.equal(nextArrangement('loved', 'painful'), 'painful');
  assert.equal(nextArrangement('painful', 'loved'), 'loved');
  for (const action of ['original'] as const) {
    const next = nextArrangement('loved', action);
    assert.equal(next, action);
    assert.ok(slugs.every((slug) => isProjectVisible(slug, next)));
  }
});

test('shuffle preserves a pinned filter and clicking that filter again keeps it', () => {
  for (const filter of ['loved', 'painful'] as const) {
    const shuffled = nextArrangement(filter, 'shuffle');
    assert.equal(shuffled, filter);
    assert.equal(nextArrangement(shuffled, filter), filter);
  }
  assert.equal(nextArrangement('original', 'shuffle'), 'shuffle');
});
