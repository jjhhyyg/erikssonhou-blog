---
date: 2025-10-21
title: Github Pages + Github Actions 免费部署网页
description: 介绍了`.github/workflows/deploy.yml`文件的作用、部署中注意事项等
---

## deploy.yml是什么？

在项目中创建`.github/workflows`文件夹后，在其中创建`deploy.yml`，具体内容如下：

```yml
# Sample workflow for building and deploying a Nuxt site to GitHub Pages
#
# To get started with Nuxt see: https://nuxtjs.org/docs/get-started/installation
#
name: Deploy Nuxt site to Pages

on:
    # 当推送到 main 分支时自动触发CI/CD流程
    push:
        branches: ["main"]

    # 允许从仓库的 Actions 界面中手动启动该流程
    workflow_dispatch:

# 设置GITHUB_TOKEN来允许部署到Github Pages
permissions:
    contents: read
    pages: write
    id-token: write

# 同一时间内仅允许一个部署进程，跳过当前正在部署至最后一个部署之间的流程（Github Actions中将一个 run 作为一个CI/CD流程的单位）
# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# 但是，请不要取消正在进行的运行，因为我们希望这些生产部署能够完成
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
    group: "pages"
    cancel-in-progress: false

jobs:
    # Build job
    build:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout
              uses: actions/checkout@v5
            - name: Setup pnpm
              uses: pnpm/action-setup@v4
              with:
                  version: 8
            - name: Detect package manager
              id: detect-package-manager
              run: |
                  if [ -f "${{ github.workspace }}/pnpm-lock.yaml" ]; then
                    echo "manager=pnpm" >> $GITHUB_OUTPUT
                    echo "command=install --frozen-lockfile" >> $GITHUB_OUTPUT
                    exit 0
                  elif [ -f "${{ github.workspace }}/yarn.lock" ]; then
                    echo "manager=yarn" >> $GITHUB_OUTPUT
                    echo "command=install" >> $GITHUB_OUTPUT
                    exit 0
                  elif [ -f "${{ github.workspace }}/package.json" ]; then
                    echo "manager=npm" >> $GITHUB_OUTPUT
                    echo "command=ci" >> $GITHUB_OUTPUT
                    exit 0
                  else
                    echo "Unable to determine package manager"
                    exit 1
                  fi
            - name: Setup Node
              uses: actions/setup-node@v6
              with:
                  node-version: "22"
                  cache: ${{ steps.detect-package-manager.outputs.manager }}
            - name: Setup Pages
              uses: actions/configure-pages@v5
              with:
                  # Automatically inject router.base in your Nuxt configuration file and set
                  # target to static (https://nuxtjs.org/docs/configuration-glossary/configuration-target/).
                  #
                  # You may remove this line if you want to manage the configuration yourself.
                  static_site_generator: nuxt
            - name: Restore cache
              uses: actions/cache@v4
              with:
                  path: |
                      dist
                      .nuxt
                  key: ${{ runner.os }}-nuxt-build-${{ hashFiles('dist') }}
                  restore-keys: |
                      ${{ runner.os }}-nuxt-build-
            - name: Install dependencies
              run: ${{ steps.detect-package-manager.outputs.manager }} install --no-frozen-lockfile
            - name: Static HTML export with Nuxt
              run: ${{ steps.detect-package-manager.outputs.manager }} run generate
            - name: Upload artifact
              uses: actions/upload-pages-artifact@v4
              with:
                  path: ./.output/public

    # Deployment job
    deploy:
        environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}
        runs-on: ubuntu-latest
        needs: build
        steps:
            - name: Deploy to GitHub Pages
              id: deployment
              uses: actions/deploy-pages@v4
```

该配置文件定义了以下内容：

1. 什么时候触发CI/CD流程？（当main分支有新推送时）
2. 持续集成与部署的具体步骤（定义在`jobs.build.steps`中）

## 注意事项

1. 如果使用的是`pnpm`作为包管理器，推荐的还是上传的时候带上`pnpm-lock.yaml`，因为在 `CI` 中禁用 `frozen-lockfile` 会导致 `CI/CD` 可能会安装与你本地不同的依赖包版本，破坏了 `CI/CD` 可重复构建 (Reproducible Builds) 的目的。

2. 如果使用的是`pnpm`作为包管理器，要确保本地生成 pnpm-lock.yaml 文件的 pnpm 版本，和 GitHub Actions CI 环境中使用的 pnpm 版本一致，否则会出现类似下面的提示：

```shell
Run pnpm install --frozen-lockfile
  pnpm install --frozen-lockfile
  shell: /usr/bin/bash -e {0}
  env:
    PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
    GITHUB_PAGES: true
  
 WARN  Ignoring not compatible lockfile at /home/runner/work/erikssonhou-blog/erikssonhou-blog/pnpm-lock.yaml
 ERR_PNPM_NO_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is absent
Note that in CI environments this setting is true by default. If you still need to run install in such cases, use "pnpm install --no-frozen-lockfile"
Error: Process completed with exit code 1.
```

具体来说，`pnpm-lock.yaml`的第一行指明了`pnpm`的`lockfileVersion`（本项目中为9.0），那在`Setup pnpm`这一步，就需要将对应的`version`改为`9.0`来和开发环境对齐。
