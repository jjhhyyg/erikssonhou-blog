import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            // 正确的 prefix 配置方式：放在 source 对象中
            source: {
                include: '**/*.md',
                prefix: '/blogs'  // 所有 md 文件都会映射到 /blogs/ 路径下
            },
            schema: z.object({
                // 移除 id 字段，使用 Nuxt Content 自动生成的 id
                date: z.string().optional(),
            })
        })
    }
})
