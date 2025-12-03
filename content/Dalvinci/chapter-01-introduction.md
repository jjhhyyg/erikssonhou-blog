---
date: 2025-11-22
title: 第一集 入门简介
description: 介绍了达芬奇各个面板的作用
---

## 项目管理器面板

![项目管理器面板](/images/20251122200337.png)

打开达芬奇就会出现的面板，每一个视频的工程都可以在这个面板创建和管理。

### 创建工程

- 法1: 点击“新建项目”按钮
- 法2: 双击“未命名项目”

⚠️ 创建项目后应立即按下`Ctrl + S` / `Cmd + S`进行项目的命名和保存。

![创建工程](/images/20251122200548.png)

**重要设置**

首次使用达芬奇，需要进行两个重要设置：

![偏好设置](/images/20251122203358.png)

`用户面板`的`UI设置`可以将语言更改为中文：

![语言设置](/images/20251122203455.png)

`用户面板`的`项目保存和加载`勾选上`实时保存`和`项目备份`（新版本还有时间线备份，用于撤销/回溯操作，可一并勾选上）：

![实时保存和项目备份](/images/20251122203605.png)

## 面板

老版本：

![老版本面板](/images/20251122203858.png)

新版本：

![新版本面板](/images/20251122203955.png)

### 流程图

```mermaid
graph LR
    %% 定义样式
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px,rx:5,ry:5;
    classDef media fill:#e1f5fe,stroke:#0277bd;
    classDef cut fill:#fff3e0,stroke:#ef6c00;
    classDef edit fill:#f3e5f5,stroke:#7b1fa2;
    classDef fusion fill:#e8f5e9,stroke:#2e7d32;
    classDef color fill:#ffebee,stroke:#c62828;
    classDef audio fill:#fff8e1,stroke:#fbc02d;
    classDef deliver fill:#eceff1,stroke:#455a64;

    A[媒体面板<br><sub>导入素材和分类</sub>]:::media --> B[快编面板<br><sub>视频粗剪</sub>]:::cut
    B --> C[剪辑面板<br><sub>视频精剪</sub>]:::edit
    C --> D[Fusion面板<br><sub>效果制作</sub>]:::fusion
    D --> E[调色面板<br><sub>视频调色</sub>]:::color
    E --> F[Fairlight面板<br><sub>音频调整</sub>]:::audio
    F --> G[交付面板<br><sub>视频导出</sub>]:::deliver
```

可以看出，达芬奇的工作流就是一条线，并不复杂。

### 媒体面板
