<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const navItems = computed<NavigationMenuItem[]>(() => [{
    label: 'Home',
    to: '/',
    icon: 'i-lucide-home',
    active: route.path === '/'
}, {
    label: 'About',
    to: '/about',
    icon: 'i-lucide-info',
    active: route.path === '/about'
}])

const footerLinks: NavigationMenuItem[] = [{
    key: 1,
    label: 'Blog Management',
    to: '/blog-management',
    icon: 'i-material-symbols-bookmark-manager-outline-rounded'
}]

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('content'), {
    server: false
})

const searchTerm = ref("")
</script>

<template>
    <UHeader title="Eriksson Hou's Blog" class="w-full" to="/">

        <UNavigationMenu :items="navItems" orientation="horizontal" />
        <template #right>
            <UContentSearchButton variant="ghost" />
            <UColorModeButton size="sm" variant="ghost" as="button" />
            <UButton icon="i-lucide-github" aria-label="Github Home Page" to="https://github.com/jjhhyyg/"
                target="_blank" size="sm" variant="ghost" />
            <ClientOnly>
                <LazyUContentSearch v-model:search-term="searchTerm" shortcut="meta_k" :files="files"
                    :navigation="navigation" :fuse="{ resultLimit: 42 }" />
            </ClientOnly>
        </template>
    </UHeader>

    <UContainer>
        <slot />
    </UContainer>

    <UFooter>
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