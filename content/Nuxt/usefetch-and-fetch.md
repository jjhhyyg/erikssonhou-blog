---
date: 2025-10-23
title: useFetch 和 $fetch 的使用方法
description: 介绍了 `useFetch` 和 `$fetch` 的区别和使用方式
---

## 了解 useFetch 和 fetch

官方文档：

1. $fetch: <https://nuxt.com/docs/4.x/getting-started/data-fetching#fetch>
2. useFetch: <https://nuxt.com/docs/4.x/getting-started/data-fetching#usefetch>

### 主要区别

- `useFetch` 只在服务端执行，`$fetch` 在服务端执行一次、客户端执行一次

一般来说，更推荐使用 `useFetch`，因为 `useFetch` 在服务端执行，更安全。

通常会用 `composable` 的方式使用它们，使用 `useAsyncData` 和两者结合的方式见：<https://nuxt.com/docs/4.x/getting-started/data-fetching#useasyncdata>

想更深入了解 `useFetch` 和 `useAsyncData` 的区别，看看这个视频：

<iframe style="width: 100%; aspect-ratio:16/9; border:none;"
    src="https://www.youtube.com/embed/0X-aOpSGabA?si=o9X3wZlBkP4xLlSt"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</iframe>

或者 [数据请求](/Nuxt/data-fetching) 文档中也有详细介绍。
