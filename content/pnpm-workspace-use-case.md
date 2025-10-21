---
date: 2025-10-21
title: pnpm-workspace.yml 文件什么时候用？
description: pnpm-workspace.yml 文件有什么用？什么情况才用？
---

## 普通项目

```text
nuxt4-project/
├── package.json          # 一个项目
├── nuxt.config.ts
└── app/
```

## Monorepo 项目

```text
my-workspace/
├── packages/
│   ├── web-app/          # 项目1：网站
│   │   └── package.json
│   ├── mobile-app/       # 项目2：移动端
│   │   └── package.json
│   └── shared-ui/        # 项目3：共享组件库
│       └── package.json
└── pnpm-workspace.yaml   # 告诉 pnpm 这是 workspace
```

## 为什么会用 Monorepo？

优点：

- 多个项目共享代码（比如前端+后端+共享工具库）
- 统一依赖版本管理
- 一次性测试/构建所有项目

缺点：

- 配置复杂
- 仓库体积大
