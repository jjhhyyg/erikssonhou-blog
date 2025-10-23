---
date: 2025-10-23
title: markdownlint 工具
description: 介绍了 markdownlint 插件及其使用方法
---

## 安装

VSCode 的 extensions 菜单中搜索 `markdownlint`，下载：

![markdownlint extension图标](/images/20251023205439.png)

## 项目设置

markdownlint 的文档见[这里](https://github.com/DavidAnson/markdownlint/tree/v0.38.0/doc)，在项目根目录下新建 `.markdownlint.json` 文件，可以进行如下配置：

```json
{
    "MD013": {
        "line_length": 120
    },
    "MD033": {
        "allowed_elements": ["iframe"]
    }
}
```

其中`MDxxx`表示 markdownlint 的检查规则，可以在上面提到的文档中看到具体的设置参数、类型等信息。
