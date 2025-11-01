// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    modules: ['@nuxt/ui', '@nuxt/icon', '@pinia/nuxt', '@nuxt/content', '@nuxtjs/i18n'],
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    icon: {
        localApiEndpoint: '/nuxt-icon'
    },
    ssr: true,
    devServer: {
        // 服务端口号
        port: 3000
    },
    css: ['~/assets/css/main.css'], // css入口文件
    vite: {
        build: {
            sourcemap: false, // 禁用 sourcemap 以避免 Tailwind CSS v4 的警告
        }
    },
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
        baseURL: '/', // 使用自定义域名时应该是根路径
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
    },
    content: {
        build: {
            markdown: {
                // 启用 Table of Contents 生成,这会自动为标题生成 ID
                toc: {
                    depth: 5,
                    searchDepth: 6
                }
            }
        },
        renderer: {
            anchorLinks: {
                h2: true,
                h3: true,
                h4: true,
                h5: true,
                h6: true
            }
        }
    }
})