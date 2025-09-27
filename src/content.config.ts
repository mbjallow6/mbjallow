// file: src/content.config.ts
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const postsCollection = defineCollection({
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
      // Enhanced coverImage schema supporting both formats with proper alt text
      coverImage: z.union([
        z.string().url(), // Only allow full URLs for strings
        z.object({
          src: image(), // Use image() helper for local images
          alt: z.string(),
        })
      ]).optional(),
      // Dedicated field for alt text when using string coverImage
      coverImageAlt: z.string().optional(),
      toc: z.boolean().optional().default(true),
    }),
})

const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      avatarImage: z.union([
        z.string().url(), // Only URLs for strings
        z.object({
          src: image(),
          alt: z.string().default('Site author avatar'),
        })
      ]).optional(),
      avatarImageAlt: z.string().optional(),
      githubCalendar: z.string().optional(),
    }),
})

const addendumCollection = defineCollection({
  loader: glob({ pattern: ['addendum.md', 'addendum.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      avatarImage: z.union([
        z.string(),
        z.object({
          src: image(),
          alt: z.string().default('Site author avatar'),
        })
      ]).optional(),
      avatarImageAlt: z.string().optional(),
    }),
})

export const collections = {
  posts: postsCollection,
  home: homeCollection,
  addendum: addendumCollection,
}

