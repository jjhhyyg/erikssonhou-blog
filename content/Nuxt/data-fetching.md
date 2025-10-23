---
date: 2025-10-23
title: Nuxt 获取数据
description: 详细介绍了 Nuxt 框架中用于获取数据的方法
---

Nuxt 提供了多个 `composable` 方法来处理数据获取。

---

Nuxt 提供了两个 `composable` 方法和一个内置库来在**浏览器**或者**服务端**中获取数据：`useFetch`, `useAsyncData` 和 `$fetch`。

简单来说：

- `$fetch` 是创建网络请求最简单的方法
- `useFetch` 是 `$fetch` 的一个包装器，仅在[全局渲染](https://nuxt.com/docs/4.x/guide/concepts/rendering#universal-rendering)中请求一次数据
- `useAsyncData` 和 `useFetch` 类似，但提供了更细粒度的控制

`useFetch` 和 `useAsyncData` 共享一组选项和模式，后续章节会介绍。

## useFetch 和 useAsyncData 的必要性

Nuxt 是一个可以在服务器端和客户端同时运行同构（或称通用）代码的框架。

如果在 Vue 组件的 `setup` 函数中使用 `$fetch` 来获取数据，可能会导致数据被请求两次：一次是在服务器端进行的（用于生成 HTML），另一次是在客户端进行的（当 HTML 被激活时）。
这可能会引发**激活（hydration）问题**、**延长交互就绪时间（Time to Interactivity）**，并导致**不可预测的行为**。

`useFetch` 和 `useAsyncData` 两个组合式方法解决了这个问题，它们确保：如果在服务器上进行API调用，数据就会在**负载**中一并发给客户端。

`负载` 是一个可以通过 `useNuxtApp().payload` 访问的 JavaScript 对象。它在客户端中用于避免在浏览器[激活（hydration）过程](https://nuxt.com/docs/4.x/guide/concepts/rendering#universal-rendering)中重新请求相同的数据，从而提升性能和加载效率。

## 参考文档

Data Fetching: <https://nuxt.com/docs/4.x/getting-started/data-fetching>
