import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const postsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      published: z.coerce.date(), // Keep 'published' to match existing posts
      author: z.string().optional(), // Make optional since not all posts have it
      draft: z.boolean().optional().default(false),
      series: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      coverImage: z.union([
        z.string(), // For CMS-uploaded images (string URLs)
        z.strictObject({
          src: image(),
          alt: z.string(),
        })
      ]).optional(),
      toc: z.boolean().optional().default(true),
    }),
})

const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      avatarImage: z.union([
        z.string(), // For CMS-uploaded images
        z.object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
      ]).optional(),
      githubCalendar: z.string().optional(),
    }),
})

const addendumCollection = defineCollection({
  loader: glob({ pattern: ['addendum.md', 'addendum.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      avatarImage: z.union([
        z.string(), // For CMS-uploaded images
        z.object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
      ]).optional(),
    }),
})

export const collections = {
  posts: postsCollection,
  home: homeCollection,
  addendum: addendumCollection,
}
