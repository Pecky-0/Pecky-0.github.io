---
title: 本站搭建记录
date: 2026-09-29
description: 记录这个网站的技术选型与搭建过程：Next.js 静态导出到 GitHub Pages。
tags: [Next.js, GitHub Pages]
---

## 技术选型

做个人网站有很多方案，我选择了 **Next.js + GitHub Pages**：

1. React 生态最大，资料最多
2. GitHub Pages 免费托管，配合 GitHub Actions 全自动部署
3. 静态导出（`output: 'export'`）后就是一个纯静态站，速度快、维护简单

## 关键配置

静态导出有几个关键点：

- `output: "export"`：构建产物输出到 `out/` 目录
- `trailingSlash: true`：让每页输出为 `目录/index.html`，子页面直接刷新不会 404
- `images: { unoptimized: true }`：静态导出必须关闭图片优化

## 博客的实现

文章放在 `posts/` 目录下的 Markdown 文件里，构建时用 gray-matter 解析 frontmatter、remark 渲染成 HTML。写新文章只需新增一个 `.md` 文件，push 之后自动上线。

## 部署流程

GitHub Actions 监听 main 分支的 push，自动构建并把 `out/` 目录发布到 GitHub Pages，全程无需手动操作。
