import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const mark = z.string(); // 'yes' | 'no' | 'opt' | free text
const table = z.object({
  columns: z.array(z.string()),
  rows: z.array(z.object({ label: z.string(), values: z.array(mark) })),
});

const products = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      name: z.string(),
      order: z.number(),
      line: z.enum(['Effect line', 'Midl line', 'Entry line']),
      tagline: z.string(),
      fromPrice: z.number(),
      description: z.string(),
      dimensions: z.string(),
      dimsMm: z.tuple([z.number(), z.number()]),
      round: z.boolean(),
      persons: z.number(),
      jets: z.number(),
      hero: image(),
      home: image().optional(), // home page slide, when it differs from the model page hero
      video: z.string().optional(), // e.g. /video/fusion.mp4 in public/; poster = hero
      plan: image(),
      colors: z.array(z.object({ name: z.string(), image: image(), grey: image().optional() })), // image = Rose Wood cabinet, grey = Grey Wood
      gallery: z.array(image()),
      scenes: z.array(image()).default([]), // extra hero photos, shown as a slideshow after the hero
      packages: z.array(
        z.object({
          name: z.string(),
          price: z.number(),
          oldPrice: z.number().nullable(),
          jets: z.number(),
          image: image(),
          features: z.array(z.object({ name: z.string(), on: z.boolean() })),
        }),
      ),
      standard: table,
      extras: table,
      drawing: z.string().nullable(),
      seo: z.object({ title: z.string(), description: z.string() }),
    }),
});

export const collections = { products };
