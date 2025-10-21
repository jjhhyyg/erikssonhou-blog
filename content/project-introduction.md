---
date: 2025-10-22
title: 项目介绍
description: 本项目用于学习Nuxt 4及Nuxt UI 4技术
navigation:
    title: 项目介绍
---

# 项目介绍

本项目用于学习Nuxt 4及Nuxt UI 4技术

## Nuxt路由介绍

Nuxt 4的所有组件都默认放在 app 文件夹中，该文件夹下的`app.vue`为整个程序的入口：

```vue
<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
```

其中`NuxtLayout`标签会默认使用`layouts`文件夹中的`default.vue`作为`app.vue`和`error.vue`的页面布局，`default.vue`组件中可以定义一个插槽：

```vue
<template>
    <div>
        <h1 class="header">header</h1>
        <div class="main" style="min-height: 80vh;">
            <slot></slot>
        </div>
        <div class="footer">footer</div>
    </div>
</template>
```

该插槽将默认调用`pages`文件夹中的`index.vue`组件作为主页面进行渲染。

在`pages`文件夹中定义的组件都会根据**组件名**自动映射为url，比如在该文件夹下创建一个`about.vue`，那访问`localhost:3000/about`就会跳转到该界面中，当然，这只是替换掉了`layouts`文件夹中定义的布局的插槽内容。

使用多个布局的方法：

1. <https://nuxt.com/docs/4.x/api/components/nuxt-layout>
2. <https://nuxt.com/docs/4.x/api/utils/define-page-meta>

## Nuxt UI 4

### Nuxt UI引入

在当前项目中导入`Nuxt UI`模块的方法：<https://ui.nuxt.com/docs/getting-started/installation/nuxt>，记得在app.vue中导入`main.css`（官方文档没有提到）：

```vue
<script setup lang="ts">
import "~/assets/css/main.css"
</script>
```

也可以选择在`nuxt.config.ts`中设置`css`属性：

```ts
css: ['~/assets/css/main.css'] // css入口文件
```

`UApp`标签提供全局配置，而且`Toast`, `Tooltip`等组件的正常工作也需要它。具体介绍见：<https://ui.nuxt.com/docs/components/app>

```vue
<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
```

### Icon库

官方简明文档：<https://nuxt.com/modules/icon>

```bash
npx nuxi module add icon
```

然后添加一个配置，防止生产环境下nuxt icon请求出错，在`nuxt.config.ts`中添加如下代码：

```ts
export default defineNuxtConfig({
    icon: {
        localApiEndpoint: '/nuxt-icon'
    }
})
```

使用方法：

```vue
<Icon name="" size="" /> <!--name必填，size（默认1em）和mode（默认css，还能选择svg）参数选填-->
```

可以去<https://icones.js.org/>中找所有可以使用的icon，非常建议本地安装icon集：

```bash
pnpm i -D @iconify-json/collection-name
```

也可以通过`pnpm i -D @iconify-json`来下载所有的icon集，但这会增加服务端打包的大小和构建表现。如果选择这个方式，建议在`nuxt.config.ts`中显式标明需要的icon集：

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  icon: {
    serverBundle: {
      collections: ['uil', 'mdi'] // <!--- this
    }
  }
})
```

VSCode中可以安装插件`Iconify IntelliSense`，从而实现写完name后实时显示对应的图标。

### Pinia库

Pinia库用于跨组件全局管理一些状态变量。

```bash
pnpm i pinia @pinia/nuxt
```

然后在`nuxt.config.ts`中引入该模块：

```ts
export default defineNuxtConfig({
    modules: ['@pinia/nuxt'],
})
```

官方文档：<https://pinia.vuejs.org/core-concepts/>

## 设置SEO

SEO的信息会设置到 html 的 head 里面，对于静态网页查询很有用。
有两种方式设置SEO：

1. 在`nuxt.config.ts`中设置SEO

    ```ts
    export default defineNuxtConfig({
    app: {
        head: {
        title: 'Nuxt', // default fallback title
        htmlAttrs: {
            lang: 'en',
        },
        link: [
            { 
                rel: 'icon', 
                type: 'image/x-icon', 
                href: '/favicon.ico' 
            },
        ],
        },
    },
    })
    ```

2. 在`app.vue`中设置SEO:

    ```vue
    <script setup lang="ts">
    useSeoMeta({
    title: 'My Amazing Site',
    ogTitle: 'My Amazing Site',
    description: 'This is my amazing site, let me tell you all about it.',
    ogDescription: 'This is my amazing site, let me tell you all about it.',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
    })
    </script>
    ```

## 前后端分离设置

详见`nuxt.config.ts`中的nitro设置。

## 了解

### SSR使用场景

SSR (Server-Side Rendering，服务端渲染) 主要适用于以下场景:

1. **SEO优化需求高的网站**
搜索引擎爬虫可以直接抓取到完整的HTML内容,提升网站在搜索结果中的排名。比如电商网站、新闻网站、博客等。
2. **首屏加载速度要求高**
用户打开页面时能立即看到完整内容,而不需要等待JavaScript下载和执行。适合网络条件较差的地区或移动端用户。
3. **社交媒体分享**
当链接被分享到社交平台时,能正确显示预览图、标题和描述,因为这些信息已经在HTML中。
4. **内容为主的网站**
文章、产品详情、营销落地页等以展示内容为主的页面,SSR能提供更好的用户体验。
5. **需要更好的可访问性**
对于依赖屏幕阅读器等辅助技术的用户,SSR提供的完整HTML结构更友好。
不太适合的场景:

高度交互的应用(如在线绘图工具、游戏)

- 需要频繁更新的实时数据展示
- 后台管理系统等不需要SEO的应用

总的来说,如果你的应用需要良好的SEO、快速的首屏展示,并且内容相对静态或可预渲染,那SSR就是个不错的选择。
