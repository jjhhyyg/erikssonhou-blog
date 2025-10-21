<template>
    <UPage>
        <UPageHeader :title="$t('home.header')" :description="$t('home.description')" />

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

<script setup lang="ts">
// 查询所有博客文章，按日期降序排列
const { data: posts } = await useAsyncData('blog-posts', () =>
    queryCollection('content')
        .order('date', 'DESC')
        .all()
)

// 设置页面 SEO
useSeoMeta({
    title: '博客文章 - Eriksson Hou',
    description: '欢迎来到我的博客，这里记录了我的学习和思考'
})
</script>
