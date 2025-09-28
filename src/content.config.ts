// file: src/content/config.ts
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

/**
 * PRODUCTION-READY: Flexible image schema that supports all image sources
 * while preventing problematic data from reaching Astro Image component
 */
const FlexibleImageSchema = z.union([
  z.string().url().optional(), // External URLs (https://, http://)
  z.string().startsWith('/').optional(), // Public folder paths (/images/...)
  z.string().refine(
    (val) => val === '' || !val.startsWith('./'), 
    { message: "Relative paths like './image.jpg' should be moved to public/images/" }
  ).optional(), // Block relative paths that cause issues
  z.null().optional(), // Explicitly allow null
  z.undefined().optional(), // Explicitly allow undefined
  z.object({
    src: z.union([
      z.string().url(), // External URLs in objects
      z.string().startsWith('/'), // Public paths in objects
      z.any() // Allow ImageMetadata objects
    ]).optional(),
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
      
      // FLEXIBLE: Support URLs, public paths, uploads, but block problematic relative paths
      coverImage: FlexibleImageSchema,
      coverImageAlt: z.string().optional(),
      
      toc: z.boolean().optional().default(true),
    }),
})

export const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: () =>
    z.object({
      title: z.string().optional(),
      avatarImage: FlexibleImageSchema,
      avatarImageAlt: z.string().optional(),
      githubCalendar: z.string().optional(),
    }),
})

export const addendumCollection = defineCollection({
  loader: glob({ pattern: ['addendum.md', 'addendum.mdx'], base: './src/content' }),
  schema: () =>
    z.object({
      title: z.string().optional(),
      avatarImage: FlexibleImageSchema,
      avatarImageAlt: z.string().optional(),
    }),
})

export const collections = {
  posts: postsCollection,
  home: homeCollection,
  addendum: addendumCollection,
}
