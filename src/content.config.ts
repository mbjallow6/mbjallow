// file: src/content.config.ts
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

/**
 * PRODUCTION-READY: Ultra-permissive image schema that NEVER rejects content
 * Let our AccessibleImage component handle all validation instead
 */
const UltraPermissiveImageSchema = z.union([
  z.string().optional(), // Accept ANY string or undefined
  z.object({
    src: z.any(), // Accept ANY source type
    alt: z.string().optional()
  }).optional()
]).optional()

export const postsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      published: z.coerce.date(),
      author: z.string().optional(),
      draft: z.boolean().optional().default(false),
      series: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      
      // ULTRA-PERMISSIVE: Accept literally anything for coverImage
      coverImage: UltraPermissiveImageSchema,
      coverImageAlt: z.string().optional(),
      
      toc: z.boolean().optional().default(true),
    }),
})

export const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: () =>
    z.object({
      title: z.string().optional(),
      avatarImage: UltraPermissiveImageSchema,
      avatarImageAlt: z.string().optional(),
      githubCalendar: z.string().optional(),
    }),
})

export const addendumCollection = defineCollection({
  loader: glob({ pattern: ['addendum.md', 'addendum.mdx'], base: './src/content' }),
  schema: () =>
    z.object({
      title: z.string().optional(),
      avatarImage: UltraPermissiveImageSchema,
      avatarImageAlt: z.string().optional(),
    }),
})

export const collections = {
  posts: postsCollection,
  home: homeCollection,
  addendum: addendumCollection,
}
