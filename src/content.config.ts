// src/content/config.ts
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const postsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.coerce.date(),
      draft: z.boolean().optional().default(false),
      description: z.string().optional(),
      author: z.string().optional(),
      series: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      
      // ✅ FLEXIBLE: Accepts string paths, objects, or external URLs
      coverImage: z.union([
        z.string().url(), // External URLs: "https://..."
        z.string().startsWith('/'), // Public paths: "/images/posts/..."
        z.string().startsWith('./'), // Relative paths: "./cover.jpg"
        z.strictObject({
          src: image(), // Astro optimized images
          alt: z.string(),
        })
      ]).optional(),
      
      // Alternative text for CMS-generated images
      coverImageAlt: z.string().optional(),
      toc: z.boolean().optional().default(true),
    }),
})

const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      avatarImage: z.union([
        z.string().url(),
        z.string().startsWith('/'),
        z.string().startsWith('./'),
        z.object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
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
      avatarImage: z.union([
        z.string().url(),
        z.string().startsWith('/'),
        z.string().startsWith('./'),
        z.object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
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
