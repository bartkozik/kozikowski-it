import type { MetadataRoute } from 'next';

import { projects } from '@/core/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/about', '/resume', '/contact', '/metrics', ...projects.map(({ slug }) => `/projects/${slug}`)].map(
    (path) => ({ url: `https://kozikowski.it${path}` }),
  );
}
