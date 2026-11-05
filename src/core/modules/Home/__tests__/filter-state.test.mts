import assert from 'node:assert/strict';
import { test } from 'node:test';

import * as filters from '../project-filters.ts';

test('hover previews another filter and leaving restores the committed selection', () => {
  assert.equal(typeof filters.filterReducer, 'function');
  const selected = { arrangement: 'loved', preview: null } as const;
  const preview = filters.filterReducer(selected, { type: 'preview', filter: 'painful' });
  assert.deepEqual(preview, { arrangement: 'loved', preview: 'painful' });
  assert.deepEqual(filters.filterReducer(preview, { type: 'leave' }), selected);
});

test('click commits a preview, while clicking an active filter keeps it selected', () => {
  assert.equal(typeof filters.filterReducer, 'function');
  const preview = { arrangement: 'original', preview: 'loved' } as const;
  const pinned = filters.filterReducer(preview, { type: 'select', arrangement: 'loved' });
  assert.deepEqual(pinned, { arrangement: 'loved', preview: null });
  const hoveredAgain = filters.filterReducer(pinned, { type: 'preview', filter: 'loved' });
  assert.deepEqual(filters.filterReducer(hoveredAgain, { type: 'select', arrangement: 'loved' }), {
    arrangement: 'loved',
    preview: null,
  });
});

test('leaving a preview preserves shuffle and reset clears a preview', () => {
  assert.equal(typeof filters.filterReducer, 'function');
  const preview = { arrangement: 'shuffle', preview: 'painful' } as const;
  assert.deepEqual(filters.filterReducer(preview, { type: 'leave' }), { arrangement: 'shuffle', preview: null });
  assert.deepEqual(filters.filterReducer(preview, { type: 'select', arrangement: 'original' }), {
    arrangement: 'original',
    preview: null,
  });
});

test('shuffle clears a temporary preview but keeps the pinned filter', () => {
  for (const filter of ['loved', 'painful'] as const) {
    const state = { arrangement: filter, preview: 'painful' } as const;
    assert.deepEqual(filters.filterReducer(state, { type: 'select', arrangement: 'shuffle' }), {
      arrangement: filter,
      preview: null,
    });
  }
});

test('All is selected initially and its hover preview restores the committed filter on leave', () => {
  assert.deepEqual(filters.initialFilterState, { arrangement: 'original', preview: null });
  const selected = { arrangement: 'painful', preview: null } as const;
  const preview = filters.filterReducer(selected, { type: 'preview', filter: 'original' });
  assert.deepEqual(preview, { arrangement: 'painful', preview: 'original' });
  assert.deepEqual(filters.filterReducer(preview, { type: 'leave' }), selected);
  assert.deepEqual(
    filters.filterReducer(preview, { type: 'select', arrangement: 'original' }),
    filters.initialFilterState,
  );
});
