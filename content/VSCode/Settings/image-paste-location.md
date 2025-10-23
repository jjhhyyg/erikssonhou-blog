---
date: 2025-10-23
title: Visual Studio Code 图片粘贴位置设置
description: 介绍了如何在用户级和项目级 Visual Studio Code 中设置 Markdown 文件的图片位置
---


## 🧩 一、功能概述

VS Code 现在内置以下两个与 Markdown 相关的命令：

* **`Markdown: Insert Image from Workspace`**
  从工作区中选择一张图片插入到 Markdown 文件中。
* **`Markdown: Insert Link to File in Workspace`**
  从工作区中选择任意文件并插入链接。

此外，它还支持：

* 直接 **粘贴图片（Cmd/Ctrl + V）**
* 或者 **拖入图片文件**

VS Code 会自动：

1. 检测图片是否来自**工作区外部（如剪贴板、桌面）**
2. 如果是，则会**复制到工作区内合适的目录**
3. 并在 Markdown 文档中自动插入语法：

   ```markdown
   ![](path/to/image.png)
   ```

---

## ⚙️ 二、核心配置：`markdown.copyFiles.destination`

该设置定义了：

> 「当图片文件从外部粘贴/拖入 Markdown 文档时，应复制到工作区内的哪个位置」。

### ✅ 语法结构

```jsonc
"markdown.copyFiles.destination": {
  "<glob匹配Markdown路径>": "<图片保存路径模板>"
}
```

* **键**（`/docs/**/*`）表示匹配哪些 Markdown 文件；
* **值**（`images/${documentBaseName}/`）表示对应的图片应保存在哪个文件夹中；
* 保存路径可以使用一些变量（如下）。

---

## 🧩 三、可用变量

| 变量                         | 含义                                            | 示例                                      |
| -------------------------- | --------------------------------------------- | --------------------------------------- |
| ${documentDirName}         | 当前 Markdown 文件的绝对父目录路径                   | /Users/me/myProject/docs                |
| ${documentRelativeDirName} | 相对于工作区的父目录路径（不在工作区时等同于 ${documentDirName}） | docs                                     |
| ${documentFileName}        | Markdown 文档的完整文件名                            | README.md                                |
| ${documentBaseName}        | Markdown 文档的基名（不含扩展名）                      | README                                   |
| ${documentExtName}         | Markdown 文档的扩展名（不含点或含点，视实现而定）           | md 或 .md                                |
| ${documentFilePath}        | Markdown 文档的绝对路径                               | /Users/me/myProject/docs/README.md      |
| ${documentRelativeFilePath}| 相对于工作区的 Markdown 文档路径（不在工作区时等同于 ${documentFilePath}） | docs/README.md                    |
| ${documentWorkspaceFolder} | Markdown 文档所属的工作区根路径（不在工作区时等同于 ${documentDirName}） | /Users/me/myProject                 |
| ${fileName}                | 被粘贴或拖入的文件名（例如图片名）                        | image.png                                |
| ${fileExtName}             | 被粘贴或拖入文件的扩展名（例如 png）                      | png                                      |
| ${unixTime}                | 当前 Unix 时间戳（毫秒）                               | 1717644032123                            |
| ${isoTime}                 | 当前时间 ISO 8601 格式                                  | 2025-06-06T08:40:32.123Z             |

---

## 🧮 四、基础示例

### 示例 1：将 `/docs` 下所有 Markdown 的图片放到同名文件夹

```jsonc
"markdown.copyFiles.destination": {
  "/docs/**/*": "images/${documentBaseName}/"
}
```

📁 当你在 `/docs/api/readme.md` 中粘贴一张图片时，结果是：

* 图片被保存到 `/docs/api/images/readme/image.png`
* Markdown 自动插入：

  ```markdown
  ![](images/readme/image.png)
  ```

---

### 示例 2：按首字母分文件夹

```jsonc
"markdown.copyFiles.destination": {
  "/docs/**/*": "images/${documentBaseName/(.).*/$1/}/"
}
```

📁 当文件是 `/docs/api/readme.md` 时：

* `${documentBaseName}` 是 `readme`
* `/readme/(.).*/$1/` 的正则替换结果是 `r`
* 图片保存路径变为 `/docs/api/images/r/image.png`

---

### 示例 3：全局默认规则

如果你希望所有 Markdown 文件（不论在哪）都放在一个统一目录：

```jsonc
"markdown.copyFiles.destination": {
  "**/*.md": "${documentWorkspaceFolder}/assets/images/"
}
```

结果：所有粘贴图片都会进入工作区根目录下的 `assets/images`。

---

## 🧭 五、项目级与用户级设置

| 层级      | 文件位置                          | 应用范围 | 推荐用途                       |
| ------- | ----------------------------- | ---- | -------------------------- |
| **用户级** | `settings.json`（VS Code 设置）   | 所有项目 | 统一规范，如都放到 `/assets/images` |
| **项目级** | `.vscode/settings.json`（项目目录） | 当前项目 | 为每个项目自定义图片结构               |

---

## 🧰 六、实际使用体验

使用时无需命令，只要在 Markdown 文件中：

* 截图 → 粘贴（Cmd/Ctrl + V）
* 或将图片拖入文档中

VS Code 就会：

1. 自动将图片复制到上面配置好的目录；
2. 自动插入 `![](相对路径)`；
3. 使用相对路径，方便 Markdown 文件迁移。

## ⚠️ 七、注意事项

如果用到了`Nuxt Content`，并希望将图片都放入`public/images`文件夹中，vscode内置扩展无法满足这个要求，需要用到[markdown-paste](../plugins/markdown-paste.md)这个插件。
