// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    modules: ['@nuxt/ui', '@nuxt/icon', '@pinia/nuxt', '@nuxt/content', '@nuxtjs/i18n'],
    devtools: { enabled: true },
    icon: {
        localApiEndpoint: '/nuxt-icon'
    },
    ssr: true,
    devServer: {
        // 服务端口号
        port: 3000
    },
    css: ['~/assets/css/main.css'], // css入口文件
    // 前后端分离开发时，跨域设置
    nitro: {
        // devProxy: {
        //     "/api": {
        //         target: "http://localhost:8080",
        //         changeOrigin: true,
        //         prependPath: true
        //     }
        // }
    },
    colorMode: {
        preference: 'system',
        fallback: 'light',
        storageKey: 'nuxt-color-mode',
        storage: 'localStorage'
    },
    app: {
        baseURL: '/erikssonhou-blog/',
        buildAssetsDir: 'assets'
    },
    i18n: {
        langDir: 'locales',
        locales: [
            { code: 'zh', language: 'zh-CN', file: 'zh.json' },
            { code: 'en', language: 'en-US', file: 'en.json' }
        ],
        defaultLocale: 'zh',
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root'
        }
    }
})