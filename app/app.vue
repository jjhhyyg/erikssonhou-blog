<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

import { useSeo } from './composables/useSeo'
import { useJsonLd } from './composables/useJsonLd'

// 使用增强的 SEO composable
useSeo({
    title: config.public.siteName as string,
    description: config.public.siteDescription as string,
    type: 'website'
})

// 添加 WebSite JSON-LD
useJsonLd('website', {
    name: config.public.siteName,
    description: config.public.siteDescription,
    url: config.public.siteUrl
})
</script>