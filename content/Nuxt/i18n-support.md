---
date: 2025-10-21
title: Nuxt 4项目集成 i18n
description: 介绍如何在 Nuxt 4 项目中集成多语言支持
---

## 依赖安装

npx nuxi@latest module add i18n

## 配置

在`nuxt.config.ts`中添加：

```ts
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
```

注意：`i18n`库默认去`<root-dir>/i18n/locales`文件夹下找语言配置文件，因此需要新建对应的文件夹，并在其中创建`zh.json`和`en.json`。

`zh.json`示例如下：

```json
{
    "header": {
        "title": "Eriksson Hou的博客",
        "home": "主页",
        "about": "关于自己"
    },
    "footer": 
        "blogManagement": "博客管理"
    }
}
```

`en.json`示例如下：

```json
{
    "header": {
        "title": "Eriksson Hou's Blog",
        "home": "Home",
        "about": "About"
    },
    "footer": {
        "blogManagement": "Blog Management"
    }
}
```

## 使用

### 在Header中添加语言切换功能

scripts部分：

```ts
const { setLocale, locale } = useI18n()

// 目前仅支持中/英切换
const toggleLocale = () => {
    setLocale(locale.value === 'zh' ? 'en' : 'zh')
}
```

template部分：

```html
<UHeader title="Eriksson Hou's Blog" class="w-full" to="/">
    <template #right>
        <UButton icon="i-lucide-languages" :aria-label="locale === 'zh' ? 'Switch to English' : '切换至简体中文'"
                @click="toggleLocale()" variant="ghost" />
    </template>
</UHeader>
```

### 在需要多语言支持的位置使用

#### 方法1: 使用全局`$t`在模版中替换

```html
<UHeader title="Eriksson Hou's Blog" class="w-full" to="/">
    <!---->
</UHeader>
```

#### 方法2

以`UFooter`中的label为例：

scripts部分：

```ts
const { t } = useI18n()

const footerLinks = computed<NavigationMenuItem[]>(() => [
    {
        key: 1,
        label: t('footer.blogManagement'), // 在 computed 内部调用 t()
        to: '/blog-management',
        icon: 'i-material-symbols-bookmark-manager-outline-rounded'
    }
])
```

template部分当作正常的computed变量使用即可。
