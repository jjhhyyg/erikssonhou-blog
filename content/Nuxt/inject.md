---
date: 2025-10-22
title: Nuxt inject
description: 介绍如何在 Nuxt 4 项目中集成多语言支持
---


## 介绍

inject 是 Vue 3 组合式 API (Composition API) 里的一个函数。

它用来“注入”或“接收”由祖先组件通过 `provide` 函数所“提供”的数据。这是一种依赖注入 (Dependency Injection) 的方式。

在祖先组件中，使用 `provide` 函数来传输这个值。`provide`和`inject`必须成对使用，并且使用相同的键。

### 上层提供

```ts
// 1. 创建数据 (这里是一个 Ref)
const navigationData = ref<ContentNavigationItem[]>([
  // ... 你的数据 ...
])

// 2. 使用 provide 将数据提供下去
// 第一个参数是键 (key)，必须和 inject 的键 ('navigation') 完全一致
// 第二个参数是你要传递的值
provide<Ref<ContentNavigationItem[]>>('navigation', navigationData)
```

### 下层接受

```ts
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
```
