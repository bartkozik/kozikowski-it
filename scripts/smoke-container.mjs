import assert from 'node:assert/strict';

import { projects } from '../src/core/content/projects.ts';

const base = new URL(process.argv[2]);
assert.equal(base.protocol, 'http:');
assert.ok(['127.0.0.1', 'localhost'].includes(base.hostname), 'Container smoke tests require a local endpoint.');

async function request(path) {
  return fetch(new URL(path, base), { signal: AbortSignal.timeout(10000), redirect: 'manual' });
}

const health = await request('/healthz');
assert.equal(health.status, 200);
const status = await health.json();
assert.equal(status.status, 'ok');
if (process.env.EXPECTED_REVISION) assert.equal(status.revision, process.env.EXPECTED_REVISION);

let homepage;
for (const path of [
  '/',
  '/about',
  '/resume',
  '/contact',
  '/metrics',
  ...projects.map(({ slug }) => `/projects/${slug}`),
]) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get('content-type'), /text\/html/);
  const html = await response.text();
  assert.match(html, /<h1[\s>]/, path);
  if (path === '/') homepage = html;
}

const script = homepage.match(/src="([^" ]*\/_next\/static\/[^" ]+\.js)"/);
assert.ok(script, 'Homepage must load its built JavaScript.');
assert.equal((await request(script[1])).status, 200);

const pdf = await request('/documents/Bartosz_Kozikowski_CV_Fullstack_EN.pdf');
assert.equal(pdf.status, 200);
assert.equal(
  Buffer.from(await pdf.arrayBuffer())
    .subarray(0, 5)
    .toString(),
  '%PDF-',
);
const image = homepage.match(/src="([^" ]*\/_next\/image[^" ]+)"/);
assert.ok(image, 'Homepage must render optimized images.');
const optimized = await request(image[1].replaceAll('&amp;', '&'));
assert.equal(optimized.status, 200);
assert.match(optimized.headers.get('content-type'), /^image\//);
assert.equal((await request('/projects/nonexistent-smoke-test')).status, 404);
console.log('Container smoke checks passed: routes, revision, JavaScript, PDF, optimized image and 404.');
