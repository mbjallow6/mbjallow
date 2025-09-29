// file: src/content/config.ts
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
      
      // ✅ HYBRID: Supports both CMS strings AND manual objects
      coverImage: z.union([
        z.string(), // For Decap CMS: "/images/posts/cover.jpg"
        z.strictObject({
          src: image(), // For manual posts: { src: "./image.jpg", alt: "..." }
          alt: z.string(),
        })
      ]).optional(),
      
      // ✅ Separate alt for CMS-generated images
      coverImageAlt: z.string().optional(),
      
      toc: z.boolean().optional().default(true),
    }),
})

const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      // ✅ Hybrid avatar image support  
      avatarImage: z.union([
        z.string(), // For CMS: "/images/avatar.jpg" or string paths
        z.object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
      ]).optional(),
      
      // For CMS compatibility
      avatarImageAlt: z.string().optional(),
      githubCalendar: z.string().optional(),
    }),
})

const addendumCollection = defineCollection({
  loader: glob({ pattern: ['addendum.md', 'addendum.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      avatarImage: z.union([
        z.string(), // For CMS string paths  
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
