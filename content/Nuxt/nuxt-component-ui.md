---
title: Nuxt UI 组件库笔记
description: Nuxt UI 设计系统、CSS 变量和组件使用指南
date: 2025-10-22
---

## Nuxt UI 设计系统介绍

### 核心理念

Nuxt UI 的设计系统基于 **Tailwind CSS**，采用"CSS 优先"配置方法。系统的核心特点是使用 `@theme` 指令直接在 CSS 中定义设计令牌（Design Tokens），使得主题**可移植、可维护且易于自定义**。

### 设计令牌（Design Tokens）

Nuxt UI 提供三类主要的主题变量：

1. **字体变量**（`--font-*`）：用于自定义字体系列
2. **颜色变量**（`--color-*`）：用于覆盖或定义颜色
3. **断点变量**（`--breakpoint-*`）：用于响应式设计断点

### 语义化颜色系统

Nuxt UI 采用**语义命名**而非具体数值的方式来定义颜色，提供了六种核心语义颜色：

| 颜色名称 | 默认值 | 使用场景 |
|---------|--------|---------|
| `primary` | green | 主要 CTA（行动号召）和品牌元素 |
| `secondary` | blue | 次要按钮和替代操作 |
| `success` | green | 成功状态和确认信息 |
| `info` | blue | 信息提示和中立通知 |
| `warning` | yellow | 警告消息和待处理项 |
| `error` | red | 错误信息和破坏性操作 |
| `neutral` | slate | 文本、边框和禁用状态 |

### 配置方式

#### 静态配置

在 `app/assets/css/main.css` 中使用 `@theme` 指令定义颜色和字体：

```css
@import "@nuxt/ui";

@theme {
  --color-primary-500: #10b981;
  --font-sans: 'Inter', sans-serif;
}
```

#### 运行时配置

在 `app.config.ts` 的 `ui.colors` 键下配置，支持动态主题切换而无需重启服务器：

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald',
      secondary: 'sky'
    }
  }
})
```

#### 扩展自定义颜色

可在 `nuxt.config.ts` 的 `ui.theme.colors` 中注册新的语义颜色（例如"tertiary"），然后在组件的 `color` 属性中使用。

---

## CSS 变量详解

### CSS 变量的核心概念

Nuxt UI 使用 CSS 变量作为设计令牌，实现**灵活、一致的主题化**，并内置支持亮色和暗色模式。

### 主要的 CSS 变量类别

#### 1. 语义颜色变量

包括：Primary、Secondary、Success、Info、Warning、Error

- **亮色模式**使用 shade 500：`--ui-primary: var(--ui-color-primary-500)`
- **暗色模式**使用 shade 400：`--ui-primary: var(--ui-color-primary-400)`

#### 2. 文本颜色变量

提供六个层级：Dimmed（最淡）、Muted、Toned、Default、Highlighted、Inverted（反转）

示例：

- 亮色模式：`--ui-text-dimmed: var(--ui-color-neutral-400)`
- 暗色模式：`--ui-text-dimmed: var(--ui-color-neutral-500)`

#### 3. 背景颜色变量

包括：Default、Muted、Elevated、Accented、Inverted

示例：

- 亮色模式：`--ui-bg: var(--color-white)`
- 暗色模式：`--ui-bg: var(--ui-color-neutral-900)`

#### 4. 边框颜色变量

包括：Default、Muted、Accented、Inverted

#### 5. 布局变量

- `--ui-radius: 0.25rem`：基础圆角半径
- `--ui-container`：Container 组件宽度
- `--ui-header-height`：Header 组件高度

### 自定义 CSS 变量

在 `main.css` 文件中导入 Nuxt UI 后修改变量值：

```css
@import "@nuxt/ui";

:root {
  --ui-primary: var(--ui-color-primary-700);
  --ui-radius: 0.5rem;
}

.dark {
  --ui-primary: var(--ui-color-primary-200);
}
```

### 特殊情况：黑白颜色

⚠️ **注意**：黑色（black）不能作为 primary 颜色使用，因为它缺少色阶（shades）。如需使用，应直接设置：

```css
--ui-primary: black;
```

---

## 组件样式自定义

### 使用 `:ui` prop 自定义组件样式

Nuxt UI 的所有组件都支持通过 `:ui` prop 来覆盖默认样式。这种方式允许你使用 Tailwind CSS 类来精确控制组件的外观。

#### 基本语法

```vue
<UComponent :ui="{
  slot名称: 'tailwind-classes'
}">
```

#### 实际案例：自定义 UFooter

在项目的 `app/layouts/default.vue` 中，我们自定义了 `UFooter` 的边框样式：

```vue
<UFooter :ui="{
    root: 'border-t border-default dark:border-default'
}">
    <span>© 2025 Eriksson Hou. All rights reserved.</span>
    <template #right>
        <UButton v-for="link in footerLinks" :key="link.key"
                 :to="link.to"
                 :icon="link.icon"
                 variant="ghost"
                 size="sm">
            {{ link.label }}
        </UButton>
    </template>
</UFooter>
```

**代码解析：**

- `root`：目标组件的根元素 slot
- `border-t`：Tailwind 类，添加顶部边框
- `border-default`：语义颜色类，使用默认边框颜色
- `dark:border-default`：暗色模式下的边框颜色

### 语义颜色在组件中的应用

#### 1. 在 Tailwind 类中使用语义颜色

Nuxt UI 提供了一系列语义颜色类，可直接在 Tailwind 类中使用：

边框颜色：

- `border-default`：默认边框
- `border-muted`：柔和边框
- `border-accented`：强调边框
- `border-inverted`：反转边框

文本颜色：

- `text-default`：默认文本
- `text-muted`：柔和文本
- `text-highlighted`：高亮文本

背景颜色：

- `bg-default`：默认背景
- `bg-muted`：柔和背景
- `bg-elevated`：提升背景
- `bg-accented`：强调背景

#### 2. 组件 color 属性

许多组件支持 `color` prop 来使用语义颜色：

```vue
<!-- 按钮使用不同的语义颜色 -->
<UButton color="primary">主要按钮</UButton>
<UButton color="secondary">次要按钮</UButton>
<UButton color="success">成功按钮</UButton>
<UButton color="error">错误按钮</UButton>

<!-- Alert 组件使用语义颜色 -->
<UAlert color="info" title="信息提示" />
<UAlert color="warning" title="警告信息" />
```

#### 3. 暗色模式支持

使用 `dark:` 前缀确保在暗色模式下正确显示：

```vue
<UCard :ui="{
  root: 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
}">
  <!-- 内容 -->
</UCard>
```

### 自定义样式的最佳实践

1. **优先使用语义颜色类**：使用 `border-default`、`text-muted` 等，而不是 `border-gray-200`
2. **始终考虑暗色模式**：为每个颜色类添加 `dark:` 变体
3. **使用 `:ui` prop 而非全局样式**：保持样式的作用域和可维护性
4. **参考组件文档**：每个组件的 `ui` prop 结构不同，查看官方文档了解可用的 slot

---

## 最佳实践

1. **优先使用语义颜色**：使用 `primary`、`success` 等语义名称，而不是直接使用具体颜色值
2. **利用 CSS 变量**：通过覆盖 CSS 变量实现主题定制，保持一致性
3. **考虑暗色模式**：在定制主题时同时考虑亮色和暗色模式的视觉效果
4. **使用设计令牌**：通过 `@theme` 指令定义设计令牌，提高可维护性
