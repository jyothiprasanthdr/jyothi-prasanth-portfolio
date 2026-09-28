import { defineConfig } from 'astro/config';

// Set SITE_URL once the domain is chosen; it enables absolute canonical and Open Graph URLs.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  trailingSlash: 'never',
  build: { format: 'file' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
