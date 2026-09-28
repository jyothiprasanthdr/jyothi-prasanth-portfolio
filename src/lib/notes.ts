import manifest from '../../public/notes-manifest.json';
import pages from '../data/notebook-pages.json';
import { slugify } from './slug.js';

export type Notebook = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  modified: number;
  pdf: string;
  pages: number;
  firstPage: number;
  width: number;
  height: number;
  shelf: string;
};

const CATEGORY_LABELS: Record<string, string> = { 'Gen AI': 'Gen AI', 'Deep Learning': 'Deep Learning', MLops: 'MLOps' };

export const notebooks: Notebook[] = manifest
  .map((n) => {
    const slug = slugify(n.title);
    const meta = (pages as Record<string, { pages: number; firstPage: number; width: number; height: number }>)[slug];
    return {
      slug,
      title: n.title,
      category: CATEGORY_LABELS[n.category] ?? n.category,
      categorySlug: slugify(n.category),
      modified: n.lastModified,
      pdf: encodeURI(n.fileUrl),
      pages: meta.pages,
      firstPage: meta.firstPage,
      width: meta.width,
      height: meta.height,
      shelf: `/notebook-pages/${slug}/shelf.webp`,
    };
  })
  .sort((a, b) => b.modified - a.modified || a.title.localeCompare(b.title));

export const categories = [...new Set(notebooks.map((n) => n.category))].map((label) => ({
  label,
  slug: slugify(label),
  count: notebooks.filter((n) => n.category === label).length,
}));

export const pageUrl = (slug: string, page: number) => `/notebook-pages/${slug}/p-${String(page).padStart(3, '0')}.webp`;
