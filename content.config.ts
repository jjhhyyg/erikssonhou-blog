import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: {
                include: '**/*.{md,yml}'
            },
            schema: z.object({
                // 移除 id 字段，使用 Nuxt Content 自动生成的 id
                date: z.string().optional()
            })
        })
    }
})
