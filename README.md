# zhi-web 私有个人文章站

个人知识库/文章站：前端静态部署在 GitHub Pages，后端 API 跑在阿里云服务器。

- **前端**：Vike（SSG）+ Vue3 + Vite7，构建产物发布到 GitHub Pages
- **后端**：Hono（TypeScript），监听 127.0.0.1:3000，nginx 反代 /api，pm2 管理
- **内容**：`content/` 目录下的 Markdown 文章，push 后 GitHub Actions 自动构建发布

## 目录结构

```
zhi-web/
├── .github/workflows/deploy.yml   # 前端构建 + 发布 GitHub Pages
├── frontend/                       # Vike + Vue3 SSG 前端
├── server/                         # Hono 后端 API
├── content/                        # 文章 Markdown 源（唯一内容入口）
└── 总汇文档                         # 架构 / 路由表 / 部署流程总汇
```

## 写文章

在 `content/<分类>/<slug>.md` 新建 Markdown 文件（带 frontmatter）：

```markdown
---
title: 文章标题
date: 2026-08-20
category: 技术
tags: [Vue, 前端]
summary: 一句话摘要
---

正文内容（Markdown）
```

然后 `git add . && git commit -m "feat: 新增文章" && git push`，GitHub Actions 自动构建并发布 Pages。

## 本地开发

```bash
# 前端（dev server）
cd frontend && npm install && npm run dev

# 前端构建（产出 dist/client/）
cd frontend && npm run build

# 后端
cd server && npm install && npm run dev
```

## 部署

详见 `总汇文档`。前端由 Actions 自动部署到 GitHub Pages；后端需 ssh 到服务器拉取代码、`npm ci && npm run build`，再 `pm2 start ecosystem.config.js` 守护。
