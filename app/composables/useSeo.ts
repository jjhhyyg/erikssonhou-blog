export interface SeoOptions {
  title?: string
  description?: string
  keywords?: string[]
  image?: string  // 可以是相对路径，会自动转换为绝对 URL
  type?: 'website' | 'article'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string  // 文章分类
}

export function useSeo(options: SeoOptions = {}) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const { locale, locales } = useI18n()

  // 默认值
  const defaults = {
    siteName: config.public.siteName || 'Nuxt 4 Blog',
    siteUrl: config.public.siteUrl || 'https://blog.ustbhyy.top',
    author: config.public.author || 'Eriksson Hou',
    defaultImage: `${config.public.siteUrl || 'https://blog.ustbhyy.top'}/images/og-default.png`
  }

  // 处理图片 URL（相对路径转绝对路径）
  const imageUrl = computed(() => {
    if (!options.image) return defaults.defaultImage
    if (options.image.startsWith('http')) return options.image
    return `${defaults.siteUrl}${options.image}`
  })

  // 生成完整的页面 URL
  const pageUrl = computed(() => `${defaults.siteUrl}${route.path}`)

  // 页面标题（如果提供了title，添加站点名称后缀）
  const fullTitle = computed(() => {
    return options.title
      ? `${options.title} - ${defaults.siteName}`
      : defaults.siteName
  })

  // Locale 映射
  const localeMap: Record<string, string> = {
    'zh': 'zh_CN',
    'en': 'en_US'
  }
  const ogLocale = localeMap[locale.value] || 'zh_CN'

  // 设置 SEO Meta 标签
  useSeoMeta({
    // 基础 Meta
    title: fullTitle.value,
    description: options.description,
    keywords: options.keywords?.join(','),

    // Open Graph
    ogTitle: options.title || defaults.siteName,
    ogDescription: options.description,
    ogImage: imageUrl.value,
    ogImageAlt: options.title || defaults.siteName,
    ogUrl: pageUrl.value,
    ogType: options.type || 'website',
    ogSiteName: defaults.siteName,
    ogLocale: ogLocale,

    // Twitter Card
    twitterCard: 'summary_large_image',
    twitterTitle: options.title || defaults.siteName,
    twitterDescription: options.description,
    twitterImage: imageUrl.value,
    twitterImageAlt: options.title || defaults.siteName,

    // 文章特定的 Meta（仅当 type === 'article' 时）
    ...(options.type === 'article' && {
      articlePublishedTime: options.publishedTime,
      articleModifiedTime: options.modifiedTime,
      articleAuthor: options.author || defaults.author,
      articleSection: options.section
    })
  })

  // 设置 Canonical URL 和其他 Head 标签
  useHead({
    link: [
      {
        rel: 'canonical',
        href: pageUrl.value
      }
    ],
    htmlAttrs: {
      lang: locale.value === 'zh' ? 'zh-CN' : 'en-US'
    }
  })

  // Hreflang 支持（多语言 SEO）
  const hreflangLinks = computed(() => {
    const links = locales.value.map((loc: any) => ({
      rel: 'alternate',
      hreflang: loc.language, // zh-CN, en-US
      href: `${defaults.siteUrl}${route.path}`
    }))

    // 添加 x-default
    links.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: pageUrl.value
    })

    return links
  })

  useHead({
    link: hreflangLinks.value
  })
}
