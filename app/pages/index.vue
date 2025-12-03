<script setup lang="ts">
// 查询所有博客文章，按日期降序排列
const { data: posts } = await useAsyncData('blog-posts', () =>
    queryCollection('content')
        .where('date', 'IS NOT NULL')
        .order('date', 'DESC')
        .all()
)

import type { ContentNavigationItem } from '@nuxt/content'
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

import { useSeo } from '~/composables/useSeo'

// 使用增强的 SEO composable
useSeo({
    title: '博客文章',
    description: '欢迎来到我的技术博客，这里记录了关于 Nuxt、Vue、C++、计算机视觉、DaVinci Resolve、Blender 等技术的学习笔记和实践经验。涵盖前端开发、后端技术、算法与数据结构等多个领域。',
    keywords: ['技术博客', 'Nuxt', 'Vue 3', 'TypeScript', '前端开发', 'C++', '计算机视觉', 'DaVinci Resolve', 'Blender', '视频编辑'],
    type: 'website'
})

</script>

<template>
    <UPage>
        <UPageHeader :title="$t('home.header')" :description="$t('home.description')" />
        <template #left>
            <UPageAside :ui="{
                root: 'border-r border-default dark:border-default'
            }">
                <UContentNavigation :navigation="navigation" highlight />
            </UPageAside>
        </template>
        <UPageBody>
            <!-- 博客列表网格 -->
            <UPageGrid v-if="posts && posts.length > 0">
                <UPageCard v-for="post in posts" :key="post.path" :title="post.title" :description="post.description"
                    :to="post.path" icon="i-lucide-file-text">
                    <!-- 日期显示 -->
                    <div v-if="post.date" class="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <UIcon name="i-lucide-calendar" class="size-4" />
                        <span>{{ post.date }}</span>
                    </div>
                </UPageCard>
            </UPageGrid>

            <!-- 如果没有文章 -->
            <div v-else class="text-center py-12">
                <UIcon name="i-lucide-inbox" class="size-12 text-gray-400 mx-auto mb-4" />
                <p class="text-gray-500 dark:text-gray-400">{{ $t('home.noBlogPlaceHolder') }}</p>
            </div>
        </UPageBody>
    </UPage>
</template>
