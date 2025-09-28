// file: src/content.config.ts
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

/**
 * Shared schema for validating optional image objects.
 * Ensures imported images are type-safe and have required alt text.
 */
const ImageObjectSchema = ({ image }: { image: any }) =>
  z
    .object({
      src: image(),         // Astro image helper
      alt: z.string().min(1) // Alt is required for imported images
    })
    .strict()

/**
 * Permissive string schema: allows full URLs or absolute paths.
 * We validate only that strings start with http(s) or "/" to avoid build failures.
 */
const StringImageSchema = z
  .string()
  .refine(
    (v) => /^https?:\/\/|^\//.test(v),
    { message: 'Must be a valid URL or absolute path (starts with "/" or "http")' }
  )

export const postsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      published: z.coerce.date(),
      author: z.string().optional(),
      draft: z.boolean().optional().default(false),
      series: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),

      // coverImage: either a validated string (URL or "/…") or an image object
      coverImage: z.union([StringImageSchema, ImageObjectSchema({ image })]).optional(),

      // coverImageAlt only used for string sources; object images require alt in schema
      coverImageAlt: z.string().min(1).optional(),

      toc: z.boolean().optional().default(true),
    }),
})

export const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),

      avatarImage: z.union([
        StringImageSchema,            // Full URL or "/…"
        ImageObjectSchema({ image })  // Imported image with required alt
      ]).optional(),

      avatarImageAlt: z.string().min(1).optional(),
      githubCalendar: z.string().optional(),
    }),
})

export const addendumCollection = defineCollection({
  loader: glob({ pattern: ['addendum.md', 'addendum.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),

      avatarImage: z.union([
        StringImageSchema,
        ImageObjectSchema({ image })
      ]).optional(),

      avatarImageAlt: z.string().min(1).optional(),
    }),
})

export const collections = {
  posts: postsCollection,
  home: homeCollection,
  addendum: addendumCollection,
}
