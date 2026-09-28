import { defineConfig } from 'astro/config';

// Absolute canonical and Open Graph URLs. SITE_URL wins; on Vercel the production URL is used
// automatically (it becomes the custom domain once one is added).
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export default defineConfig({
  site: process.env.SITE_URL || (vercelUrl ? `https://${vercelUrl}` : undefined),
  trailingSlash: 'never',
  build: { format: 'file' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
