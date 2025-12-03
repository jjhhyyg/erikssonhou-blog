// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    modules: ['@nuxt/ui', '@nuxt/icon', '@pinia/nuxt', '@nuxt/content', '@nuxtjs/i18n', '@nuxtjs/sitemap'],
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
        buildAssetsDir: 'assets',
        head: {
            htmlAttrs: {
                lang: 'zh-CN'
            },
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'manifest', href: '/manifest.json' }
            ],
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'theme-color', content: '#0ea5e9' }
            ]
        }
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
                // 配置代码高亮
                highlight: {
                    // 支持多主题：浅色和深色模式
                    theme: {
                        default: 'github-light',
                        dark: 'github-dark'
                    },
                    // 支持的语言（可选，Shiki 默认支持常见语言）
                    langs: [
                        'c',
                        'cpp',
                        'javascript',
                        'typescript',
                        'python',
                        'java',
                        'vue',
                        'html',
                        'css',
                        'bash',
                        'json',
                        'markdown'
                    ]
                },
                // Table of Contents 配置
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
    },
    runtimeConfig: {
        public: {
            siteUrl: 'https://blog.ustbhyy.top',
            siteName: 'Eriksson Hou的博客',
            siteDescription: '记录学习和思考的技术博客，涵盖前端开发、Nuxt、Vue、C++、计算机视觉等技术领域',
            author: 'Eriksson Hou'
        }
    },
    site: {
        url: 'https://blog.ustbhyy.top'
    },
    sitemap: {
        exclude: [
            '/blog-management'
        ],
        defaults: {
            changefreq: 'weekly',
            priority: 0.7
        }
    }
})