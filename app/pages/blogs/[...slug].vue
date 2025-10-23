<template>
  <UPage :ui="{
    root: 'sticky top=(--ui-header-height))'
  }">
    <div class="fixed top-[calc(var(--ui-header-height)+3em)] left-0">
      <UButton to="/" variant="soft" color="primary" icon="i-lucide-arrow-left"
               :label="$t('footer.backToHome')"/>
    </div>

    <!-- 页面头部 -->
    <UPageHeader title="" description="">
      <!-- 元信息：日期等 -->
      <template v-if="page?.date" #headline>
        <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <UIcon name="i-lucide-calendar" class="size-4"/>
          <time :datetime="page.date">{{ page.date }}</time>
        </div>
      </template>
    </UPageHeader>

    <!-- 页面内容 -->
    <UPageBody>
      <!-- 渲染 Markdown 内容 -->
      <div class="prose dark:prose-invert max-w-none">
        <ContentRenderer v-if="page" :value="page"/>
      </div>

      <!-- 分隔线 -->
      <USeparator class="my-8"/>

      <!-- 底部导航按钮 -->
      <div class="flex justify-end items-center">
        <!-- 可选：编辑按钮 -->
        <UButton v-if="page?.stem"
                 :to="`https://github.com/jjhhyyg/erikssonhou-blog/edit/main/content${page.path.replace('/blogs', '')}.md`"
                 target="_blank" variant="ghost" color="neutral" trailing-icon="i-lucide-external-link"
                 :label="$t('footer.welcomeErrorCorrection')"/>
      </div>
    </UPageBody>

    <!-- 右侧：目录 -->
    <template v-if="page?.body?.toc?.links" #right>
      <UContentToc :links="page.body.toc.links" highlight highlight-color="primary" :title="$t('blog.content-toc.title')" :ui="{
        root: 'sticky top-(--ui-header-height) z-10 overflow-y-auto border-l border-default dark:border-default',
      }"/>
    </template>
  </UPage>
</template>

<script setup lang="ts">
const route = useRoute()

// 查询当前路径对应的文档
const {data: page} = await useAsyncData(
    `content-${route.path}`,
    () => queryCollection('content').path(route.path).first()
)

const {t} = useI18n()

// 如果页面不存在，显示 404
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('404.title'),
    message: `${t('404.description')} ${route.path}`
  })
}

// 设置页面的 SEO 信息
useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogTitle: page.value?.title,
  ogDescription: page.value?.description
})
</script>
