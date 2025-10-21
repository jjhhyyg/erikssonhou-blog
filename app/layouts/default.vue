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
    label: 'Blog Management',
    to: '/blog-management'
}]
</script>

<template>
    <div>
        <!-- Header -->
        <UHeader title="Eriksson Hou's Blog">
            <UNavigationMenu :items="navItems" />

            <template #right>
                <!-- 
                    As the button is wrapped in a ClientOnly component, 
                    you can pass a fallback slot to display a placeholder while the component is loading. 
                 -->
                <UColorModeButton>
                    <template #fallback>
                        <UButton loading variant="ghost" color="neutral" />
                    </template>
                </UColorModeButton>
                <UButton variant="ghost" icon="i-lucide-github" aria-label="GitHub" size="sm"
                    to="https://github.com/jjhhyyg/" target="_blank" />
            </template>
        </UHeader>

        <!-- Main Content -->
        <UContainer class="h-[100vh]">
            <slot />
        </UContainer>

        <!-- Footer -->
        <UFooter>
            <template #right>
                <UNavigationMenu :items="footerLinks" variant="link" />
            </template>
        </UFooter>
    </div>
</template>