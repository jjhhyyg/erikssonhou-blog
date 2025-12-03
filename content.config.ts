import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: {
                include: '**/*.{md,yml}'
            },
            schema: z.object({
                // 基础字段
                date: z.string().optional(),
                // SEO 扩展字段（可选）
                keywords: z.array(z.string()).optional(),
                image: z.string().optional(),
                author: z.string().optional(),
                updatedDate: z.string().optional(),
                category: z.string().optional()
            })
        })
    }
})
