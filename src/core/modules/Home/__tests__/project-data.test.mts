import assert from 'node:assert/strict';
import { test } from 'node:test';

import { projects } from '../../../content/projects.ts';
import { projectDetails } from '../../../content/project-details.ts';
import { cardPresets } from '../card-presets.ts';
import { projectFilters } from '../project-filters.ts';

test('every published project has exactly one layout and one detail page', () => {
  const slugs = projects.map(({ slug }) => slug).sort();
  assert.equal(new Set(slugs).size, slugs.length);
  assert.deepEqual(cardPresets.map(({ slug }) => slug).sort(), slugs);
  assert.deepEqual(projectDetails.map(({ slug }) => slug).sort(), slugs);
  for (const group of Object.values(projectFilters)) {
    assert.equal(new Set(group).size, group.length);
    assert.ok(group.every((slug) => slugs.includes(slug)));
  }
});
