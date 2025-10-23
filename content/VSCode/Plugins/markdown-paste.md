---
date: 2025-10-23
title: markdown-paste 工具
description: 介绍了 markdown-paste 插件及其使用方法
---

在 Nuxt Content 中插入图片有两种主要方法：

1. 放在 public 目录（推荐）

    - 将图片（例如 my-pic.png）放入项目的 public 目录中（例如 public/images/my-pic.png）。
    - 在 .md 文件中，使用根路径 (/) 引用：

    ```markdown
    ![图片描述](/images/my-pic.png)
    ```

    public 目录下的文件会被直接复制到网站根目录，这是最简单的方法。

2. 和 `.md` 文件放在一起

   - 将图片和 `.md` 文件放在 `content/` 目录下的同一个文件夹里。
   - 例如：

    ```text
    content/
    └── blog/
        ├── my-article.md
        └── my-pic.png
    ```

    - 在 my-article.md 中，使用相对路径引用：

    ```markdown
    ![图片描述](./my-pic.png)
    ```

由于vscode内置的图片粘贴功能设置保存位置后，粘贴图片时会自动计算保存位置与当前 `.md` 文件的相对路径并插入，插入内容可能类似`![](../../public/images/pic.png)`，无法被`Nuxt Content`识别。
因此，要实现“保存到 `public/images`” **并** “插入 `/images/` 路径”，需要使用`markdown-paste`拓展。

**推荐扩展：Markdown Paste** (作者: teleso)

1. 在 VS Code 中安装 "Markdown Paste" 扩展。
2. 打开你的 `settings.json` (快捷键 `Ctrl + Shift + P`，搜索 "Open User Settings (JSON)")，或者针对单个项目而言，在项目根目录下创建`.vscode/settings.json`。
3. 添加以下配置：

<!-- end list -->

```json
// settings.json
{
    // 1. 设置图片保存位置
    // 所有粘贴的图片都保存到 [项目根目录]/public/images 文件夹
    "MarkdownPaste.path": "${workspaceFolder}/public/images",
    // 2. 禁用弹窗确认
    "MarkdownPaste.silence": true,
    // 3. 设置路径重写规则
    // (注意: 必须放在其他规则的前面，才能优先匹配)
    "MarkdownPaste.rules": [
        {
            // 匹配粘贴时生成的默认图片路径 (例如 ../../public/images/foo.png)
            // '.*[\\\\/]' 匹配 '.../' 或 '...\'
            // 捕获 'public/images/' 之后的文件名 (例如 'foo.png') 到 $1
            "regex": ".*[\\\\/]public[\\\\/]images[\\\\/](.*)",
            "options": "i", // 'i' = 不区分大小写
            "replace": "![](/images/$1)" // 替换为你想要的Nuxt Content根路径格式
        }
    ],
}
```

**这样配置后：**

当你在 `content/` 目录下的 `.md` 文件中粘贴图片时，该扩展会自动：

1. 将图片文件保存到：`[你的项目]/public/images/` 目录下。
2. 在你的 `.md` 文件中插入：`![](/images/图片名.png)`。

这完全符合 Nuxt Content 的 `public` 目录图片引用方式，但在 `VSCode` 中预览该文档时，就不能实时预览到图片，因为VSCode默认找不到markdown的位置，解决方法：**在项目根目录创建一个符号链接（Windows下创建快捷方式），`/images`的根路径即项目根目录**。

1. 打开项目根目录的终端。

2. 根据操作系统运行命令：

    - macOS / Linux:

    ```bash
    ln -s ./public/images ./images
    ```

    - Windows（需要管理员权限）:

    ```bash
    mklink /D images public\images
    ```

3. 把新创建的这个`images`链接添加到`.gitignore`中，避免提交到 Git 仓库

    ```text
    /images
    ```
