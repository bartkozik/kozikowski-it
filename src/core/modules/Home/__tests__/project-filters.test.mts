import assert from 'node:assert/strict';
import test from 'node:test';

import { isProjectVisible, nextArrangement } from '../project-filters.ts';

const slugs = ['epoca', 'board-dev', 'pm-traffic-manager', 'ad-template-platform', 'art-network', 'celina'];

test('selecting each filter shows only its projects and selecting it again restores all cards', () => {
  for (const [filter, expected] of [
    ['loved', ['epoca', 'board-dev', 'pm-traffic-manager']],
    ['painful', ['ad-template-platform', 'art-network']],
  ] as const) {
    const active = nextArrangement('original', filter);
    assert.deepEqual(
      slugs.filter((slug) => isProjectVisible(slug, active)),
      expected,
    );
    const cleared = nextArrangement(active, filter);
    assert.equal(cleared, 'original');
    assert.ok(slugs.every((slug) => isProjectVisible(slug, cleared)));
  }
});

test('switching filters replaces the selection, while shuffle and reset show all projects', () => {
  assert.equal(nextArrangement('loved', 'painful'), 'painful');
  assert.equal(nextArrangement('painful', 'loved'), 'loved');
  for (const action of ['original', 'shuffle'] as const) {
    const next = nextArrangement('loved', action);
    assert.equal(next, action);
    assert.ok(slugs.every((slug) => isProjectVisible(slug, next)));
  }
});
