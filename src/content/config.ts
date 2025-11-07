import { defineCollection, z } from 'astro:content'

const postsCollection: ReturnType<typeof defineCollection> = defineCollection({
  schema: z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    draft: z.boolean().optional().default(false),
    description: z.string().optional().default(''),
    image: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional().default(''),
    lang: z.string().optional().default(''),

    /* For internal use */
    prevTitle: z.string().default(''),
    prevSlug: z.string().default(''),
    nextTitle: z.string().default(''),
    nextSlug: z.string().default(''),
  }),
})

const projectsCollection: ReturnType<typeof defineCollection> = defineCollection({
  schema: z.object({
    title: z.string(),
    emoji: z.string().optional().default(''),
    description: z.string(),
    image: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
    links: z.array(z.object({
      name: z.string(),
      url: z.string(),
    })).optional().default([]),
    github: z.object({
      repo: z.string().optional(),
      org: z.string().optional(),
      gist: z.string().optional(),
    }).optional(),
    featured: z.boolean().optional().default(false),
    order: z.number().optional().default(999),
  }),
})

export const collections: { posts: typeof postsCollection, projects: typeof projectsCollection } = {
  posts: postsCollection,
  projects: projectsCollection,
}
