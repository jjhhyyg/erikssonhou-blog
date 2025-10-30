<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { mapContentNavigationItem } from '@nuxt/ui/runtime/utils/content.js'

const route = useRoute()
const { t, setLocale, locale } = useI18n()

const navItems = computed<NavigationMenuItem[]>(() => [{
    label: t('header.home'),
    to: '/',
    icon: 'i-lucide-home',
    active: route.path === '/'
}, {
    label: t('header.about'),
    to: '/about',
    icon: 'i-lucide-info',
    active: route.path === '/about'
}])

const footerLinks = computed<NavigationMenuItem[]>(() => [
    {
        key: 1,
        label: t('footer.blogManagement'), // 在 computed 内部调用 t()
        to: '/blog-management',
        icon: 'i-material-symbols-bookmark-manager-outline-rounded'
    }
])

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'))

const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('content'), {
    server: false
})

import type { ContentNavigationItem } from '@nuxt/content'
const navigationProvided = computed<ContentNavigationItem[]>(() => navigation?.value ?? [])
provide<Ref<ContentNavigationItem[]>>('navigation', navigationProvided)

const searchTerm = ref("")



// 目前仅支持中/英切换
const toggleLocale = () => {
    setLocale(locale.value === 'zh' ? 'en' : 'zh')
}
</script>

<template>
    <UHeader :title="$t('header.title')" to="/" :ui="{
        root: 'w-full'
    }">

        <UNavigationMenu :items="navItems" orientation="horizontal" />
        <template #right>
            <UContentSearchButton variant="ghost" />
            <UColorModeButton size="sm" variant="ghost" as="button" />
            <UButton icon="i-lucide-languages" :aria-label="locale === 'zh' ? 'Switch to English' : '切换至简体中文'"
                @click="toggleLocale()" variant="ghost" />
            <UButton icon="i-lucide-github" aria-label="Github Home Page" to="https://github.com/jjhhyyg/"
                target="_blank" size="sm" variant="ghost" />
            <ClientOnly>
                <LazyUContentSearch v-model:search-term="searchTerm" shortcut="meta_k" :files="files"
                    :navigation="navigation" :fuse="{ resultLimit: 42 }" />
            </ClientOnly>
        </template>

        <template #body>
            <UNavigationMenu :items="navItems" orientation="vertical" class="-mx-2.5 mb-4" />
            <UContentNavigation :navigation="navigation" highlight />
        </template>
    </UHeader>

    <UContainer>
        <slot />
    </UContainer>

    <UFooter :ui="{
        root: 'border-t border-default dark:border-default'
    }">
        <!--Add Copyright-->
        <span>© 2025 Eriksson Hou. All rights reserved.</span>
        <template #right>
            <UButton v-for="link in footerLinks" :key="link.key" :to="link.to" target="_blank" :icon="link.icon"
                variant="ghost" size="sm">
                {{ link.label }}
            </UButton>
        </template>
    </UFooter>
</template>