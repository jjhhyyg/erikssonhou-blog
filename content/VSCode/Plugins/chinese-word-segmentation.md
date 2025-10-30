---
date: 2025-10-30
title: 通过 Jieba 插件实现中文分词跳转
description: 介绍了使用 Jieba 插件的目的及其功能
---

## 目的

在用`markdown`记笔记的时候，常常出现中英文混合输入的情况，对于中文来说，VS Code 默认会将一整段文字识别为一个单元，用`Ctrl + 方向键(command + 方向键)`跳转的时候很不方便，故使用该插件。

## 插件安装

在插件市场中搜索`Jieba`，安装插件。

## 插件快捷键

| 命令 | 描述 | 默认键位 |
| --- | --- | --- |
| jieba.forwardWord | 将光标移至词尾 | Shift + Alt + F |
| jieba.backwardWord | 将光标移至词首 | Shift + Alt + B |
| jieba.killWord | 光标前进删除一个词 | Shift + Alt + D |
| jieba.backwardKillWord | 光标后退删除一个词 | Shift + Alt + Backspace |
| jieba.selectWord | 选中光标下方的一个词 | Shift + Alt + 2 |
| jieba.forwardSelectWord | 将光标移至词尾（选择模式下） |  |
| jieba.backwardSelectWord | 将光标移至词首（选择模式下） |  |

我用到的就只有`将光标移至词尾`和`将光标移至词首`两个功能，通过`cmd + shift + P`来打开菜单，搜索`jieba`，即可设置这两个功能的快捷键为自己习惯的方式。
