---
date: 2025-10-21
title: Nuxt UI 4.0 明暗主题系统指南
description: Nuxt UI 4.0 的主题系统完整使用指南
navigation:
    title: Nuxt UI 4.0 明暗主题系统指南
---

# Nuxt UI 4.0 明暗主题系统指南

## 📚 核心概念

Nuxt UI 4.0 的主题系统基于以下几个核心部分:

### 1. 集成 `@nuxtjs/color-mode` 模块

- Nuxt UI 自动集成了 `@nuxtjs/color-mode` 模块
- 支持三种模式:`light`(亮色)、`dark`(暗色)、`system`(跟随系统)
- 用户偏好会自动保存在 `localStorage` 中

### 2. CSS 变量系统

```css
/* 亮色模式 */
:root, .light {
  --ui-primary: var(--ui-color-primary-500);
  --ui-secondary: var(--ui-color-secondary-500);
  --ui-success: var(--ui-color-success-500);
  --ui-info: var(--ui-color-info-500);
  --ui-warning: var(--ui-color-warning-500);
  --ui-error: var(--ui-color-error-500);
}

/* 暗色模式 */
.dark {
  --ui-primary: var(--ui-color-primary-400);
  --ui-secondary: var(--ui-color-secondary-400);
  --ui-success: var(--ui-color-success-400);
  --ui-info: var(--ui-color-info-400);
  --ui-warning: var(--ui-color-warning-400);
  --ui-error: var(--ui-color-error-400);
}
```

### 3. Tailwind CSS 的 `dark:` 变体

```html
<div class="bg-white dark:bg-gray-800">
  <!-- 内容会根据主题自动切换背景色 -->
</div>
```

---

## 🎨 主题切换方式

### 方式一: 使用 `UColorModeButton` 组件 (推荐)

```vue
<template>
  <UColorModeButton />
</template>
```

**特点:**

- 最简单的方式
- 自动显示太阳/月亮图标
- 点击自动切换主题

### 方式二: 使用 `UColorModeSwitch` 组件

```vue
<template>
  <UColorModeSwitch />
</template>
```

**特点:**

- 显示为开关(Switch)样式
- 适合设置页面

### 方式三: 自定义切换逻辑

```vue
<script setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(isDark) {
    colorMode.preference = isDark ? 'dark' : 'light'
  }
})
</script>

<template>
  <UButton
    :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
    color="neutral"
    variant="ghost"
    @click="isDark = !isDark"
  />
</template>
```

---

## ⚙️ 主题配置

### 在 `nuxt.config.ts` 中配置

```typescript
export default defineNuxtConfig({
  colorMode: {
    preference: 'system',          // 默认偏好: 'system' | 'light' | 'dark'
    fallback: 'light',             // 如果无法检测系统偏好时的降级选项
    classSuffix: '',               // CSS 类后缀,默认为空
    storageKey: 'nuxt-color-mode'  // localStorage 的 key
  }
})
```

### 在 `app.config.ts` 中自定义颜色

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',   // 主色调
      neutral: 'slate'   // 中性色
    }
  }
})
```

---

## 🔧 使用 `useColorMode()` Composable

```vue
<script setup>
const colorMode = useColorMode()

// 读取当前值
console.log(colorMode.value)       // 'light' | 'dark'
console.log(colorMode.preference)  // 'light' | 'dark' | 'system'
console.log(colorMode.forced)      // 是否被强制设置

// 修改主题
colorMode.preference = 'dark'      // 设置为暗色
colorMode.preference = 'system'    // 跟随系统
</script>
```

---

## 🎯 CSS 变量层级

Nuxt UI 的颜色系统有三个层级:

### 1. 基础颜色变量 (50-950 的色阶)

```css
--ui-color-primary-50
--ui-color-primary-100
--ui-color-primary-200
/* ... */
--ui-color-primary-900
--ui-color-primary-950

--ui-color-neutral-50
/* ... */
--ui-color-neutral-950
```

### 2. 语义化变量 (根据主题自动切换)

```css
--ui-primary      /* 亮色模式用 500,暗色模式用 400 */
--ui-secondary
--ui-success
--ui-info
--ui-warning
--ui-error

--ui-bg           /* 背景色 */
--ui-bg-muted
--ui-bg-elevated
--ui-bg-accented

--ui-border       /* 边框色 */
--ui-border-muted
--ui-border-accented
```

### 3. Tailwind 类名

```html
<div class="bg-primary text-white dark:bg-primary-600">
  <p class="text-gray-900 dark:text-gray-100">自适应文本颜色</p>
</div>
```

---

## ✨ 自动适配暗色的组件

所有 Nuxt UI 组件都会自动适配明暗主题:

- `UButton` - 按钮颜色自动调整
- `UCard` - 卡片背景和边框自动切换
- `UInput` - 输入框样式自动适配
- `UHeader` / `UFooter` - 头部和尾部自动调整
- `UNavigationMenu` - 导航菜单自动适配
- 所有其他组件...

---

## 👀 检测和响应主题变化

```vue
<script setup>
const colorMode = useColorMode()

// 监听主题变化
watch(() => colorMode.value, (newMode) => {
  console.log('主题切换到:', newMode)
  // 执行自定义逻辑
  // 例如:通知第三方服务、更新图表主题等
})

// 或者使用 watchEffect
watchEffect(() => {
  if (colorMode.value === 'dark') {
    // 暗色主题特定逻辑
  } else {
    // 亮色主题特定逻辑
  }
})
</script>
```

---

## 🚫 禁用主题切换

如果你想强制使用某个主题,不允许用户切换:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  colorMode: {
    preference: 'light',
    fallback: 'light',
    dataValue: 'light' // 强制使用亮色
  }
})
```

---

## 💡 最佳实践

### 1. 提供主题切换按钮

在布局中添加主题切换功能:

```vue
<template>
  <UHeader>
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>
```

### 2. 使用 Tailwind 的 `dark:` 变体

对于自定义样式,使用 Tailwind 的 `dark:` 变体:

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  内容会根据主题自动调整颜色
</div>
```

### 3. 依赖 CSS 变量而不是硬编码颜色

```css
/* ❌ 不推荐 */
.my-element {
  background-color: #3b82f6;
}

/* ✅ 推荐 */
.my-element {
  background-color: var(--ui-primary);
}
```

### 4. 测试两种主题

确保你的应用在两种主题下都有良好的显示效果:

```vue
<script setup>
const colorMode = useColorMode()

// 开发时快速切换主题测试
onMounted(() => {
  // 按下 Ctrl+Shift+D 切换主题
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  })
})
</script>
```

### 5. 处理图片和图标

对于不同主题使用不同的图片:

```vue
<template>
  <img
    v-if="colorMode.value === 'dark'"
    src="/images/logo-dark.png"
    alt="Logo"
  >
  <img
    v-else
    src="/images/logo-light.png"
    alt="Logo"
  >
</template>
```

或者使用 CSS 反转:

```html
<img
  class="dark:invert"
  src="/images/logo.png"
  alt="Logo"
>
```

---

## 🎯 完整示例

### 在布局中集成主题切换

```vue
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const colorMode = useColorMode()

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
</script>

<template>
  <div>
    <UHeader>
      <UNavigationMenu :items="navItems" />

      <template #right>
        <!-- 主题切换按钮 -->
        <UColorModeButton />

        <!-- 或者使用自定义按钮 -->
        <UButton
          :icon="colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
          color="neutral"
          variant="ghost"
          @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
        />
      </template>
    </UHeader>

    <UContainer>
      <slot />
    </UContainer>

    <UFooter />
  </div>
</template>
```

---

## 📚 参考资源

- [Nuxt UI 官方文档](https://ui4.nuxt.com/)
- [Nuxt Color Mode 文档](https://color-mode.nuxtjs.org/)
- [Tailwind CSS Dark Mode 文档](https://tailwindcss.com/docs/dark-mode)

---

## 🎉 总结

**Nuxt UI 的主题系统特点:**

- ✅ **开箱即用** - 无需额外配置
- ✅ **自动持久化** - 用户偏好保存到 localStorage
- ✅ **SSR 友好** - 避免闪烁
- ✅ **系统同步** - 可跟随操作系统主题
- ✅ **完全可定制** - CSS 变量 + Tailwind + app.config

现在你已经掌握了 Nuxt UI 4.0 的主题系统,可以为你的应用添加优雅的明暗主题切换功能了!
