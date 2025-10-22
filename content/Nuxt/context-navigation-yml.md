---
date: 2025-10-22
title: Nuxt Content 模块中.navigation.yml文件的使用指南
description: 介绍`.navigation.yml`文件的作用
---


主要可用来通过`queryCollectionNavigation`获取`navigation`对象时，为对象添加元数据（如icon）

## 步骤

1. 修改`content.config.ts`

    ```ts
    export default defineContentConfig({
        collections: {
            content: defineCollection({
                type: 'page',
                // 正确的 prefix 配置方式：放在 source 对象中
                source: {
                    include: '**/*.{md,yml}',
                    prefix: '/blogs'  // 所有 md 文件都会映射到 /blogs/ 路径下
                },
                schema: z.object({
                    // 移除 id 字段，使用 Nuxt Content 自动生成的 id
                    date: z.string().optional()
                })
            })
        }
    })
    ```

    需要设置 `collections.content.source.include`中包含`yml`后缀名的文件。

2. 在`content`中，每个希望加上`icon`的子文件夹中，添加`.navigation.yml`

    ```yml
    icon: i-catppuccin-folder-nuxt
    ```

3. 这时候如果通过`queryCollection`获取所有`pages`，会导致`.navigation.yml`也被添加到文章中，需要进行一些处理，排除这些`yml`元数据文件。

对于我博客项目目前的格式，所有md文件都包含了`title`, `date`, `description`三个部分，不包含`icon`这个部分，我就用`query...`语句中的`where`连接符来进行了筛选：

```ts
const { data: posts } = await useAsyncData('blog-posts', () =>
    queryCollection('content')
        .where('date', 'IS NOT NULL')
        .order('date', 'DESC')
        .all()
)
```
