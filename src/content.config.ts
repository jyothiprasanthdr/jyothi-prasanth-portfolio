import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    repo: z.url(),
    stack: z.array(z.string()),
    started: z.string(),
    order: z.number(),
  }),
});

export const collections = { projects };
