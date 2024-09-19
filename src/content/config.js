import { defineCollection, z, reference } from "astro:content"

const authors = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        email: z.string(),
        photo: z.string(),
        role: z.string(),
        github: z.string(),
    })
})

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        author: z.string().optional(),
        cover: z.object({
            src: z.string(),
            alt: z.string().default('Alt text')
        }),
        draft: z.boolean().default(true),
        category: z.string().default('general'),
        tags: z.array(z.string()),
        footnote: z.string().optional(),
        relatedPosts: z.array(reference('blog')).optional(),
    })
})

const news = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        important: z.boolean().default(false),
    })
})

export const collections = {
    authors,
    blog,
    news,
}