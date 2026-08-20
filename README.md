# zhi-web 私有个人文章站

个人知识库/文章站：前端构建期 SSR 生成静态站，发布到 GitHub Pages

- **前端**：Vite7 + Vue3（SSR 预渲染），构建产物是真 HTML，按路由拆分 CSS，发布到 GitHub Pages
- **后端**：Hono + node:sqlite，监听 127.0.0.1:3000，nginx 反代 /api，pm2 管理
- **内容**：`content/` 目录下的 Markdown 文章，push 后 GitHub Actions 自动构建发布
- **包管理**：pnpm workspace monorepo

## 目录结构

```
zhi-web/
├── .github/workflows/deploy.yml   # CI: 前端构建 + 发布 GitHub Pages
├── content/                        # 文章 Markdown 源（唯一内容入口）
├── frontend/
│   ├── scripts/
│   │   ├── ssg.mjs                # SSG 构建：Vite 多入口 → 按路由注入 CSS → 产出真实 HTML
│   │   └── dev.mjs                # 开发 SSR 预览（Vite middleware）
│   ├── src/
│   │   ├── app/                   # Layout, 路由匹配, 路由定义 + 数据加载
│   │   ├── assets/css/            # 按路由拆分的 CSS
│   │   │   ├── style.css          # 通用（body, layout, article-list, article-content）
│   │   │   ├── index.css          # 首页
│   │   │   └── page/
│   │   │       ├── category/      # 分类页
│   │   │       └── article/       # 文章内容页
│   │   ├── pages/                 # 页面组件（HomePage / CategoryPage / ArticlePage）
│   │   ├── lib/                   # frontmatter 解析, Markdown 渲染, 类型定义
│   │   ├── entry-client.ts        # 通用客户端入口（style.css + 浏览量上报）
│   │   ├── entry-client-*.ts      # 按路由的客户端入口（home/category/article）
│   │   └── entry-server.ts        # SSR 入口：render(url) 渲染页面
│   ├── template.html
│   └── vite.config.ts             # 多入口配置（main/home/category/article）
├── server/                        # Hono 后端 API
│   ├── src/
│   │   ├── index.ts               # 应用入口 + CORS
│   │   └── app/Foundation/
│   │       ├── api.ts             # 路由：健康检查, 浏览量, 搜索
│   │       ├── config.ts          # 环境变量
│   │       └── db.ts              # SQLite 初始化
│   └── ecosystem.config.js        # pm2 配置
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

## 写文章

在 `content/<英文分类>/<英文slug>.md` 新建 Markdown 文件（带 frontmatter）：

```markdown
---
title: 文章标题
date: 2026-08-20
category: tech          # 英文，用于 URL（必填，与目录名一致）
categoryName: 技术      # 中文显示名（可省略，缺省用 category）
tags: [Vue, 前端]
summary: 一句话摘要
---

正文内容（Markdown）
```

约定：**目录名/文件名用英文**（URL 干净），`title` / `categoryName` 用中文（页面显示）。文章 URL 形如 `/zhi-web/page/tech/vue-reactivity`。

改完 `git add . && git commit -m "feat: 新增文章" && git push`，GitHub Actions 自动构建发布 Pages。

## 本地开发

```bash
# 安装依赖
pnpm install

# 前端开发预览（SSR，端口 5173）
pnpm --filter zhi-web-frontend dev

# 前端构建（SSG）
BASE_URL=/zhi-web/ pnpm --filter zhi-web-frontend build

# 类型检查
pnpm --filter zhi-web-frontend typecheck
pnpm --filter zhi-web-server typecheck

# 后端
pnpm --filter zhi-web-server dev
```

## 部署

前端由 GitHub Actions 自动部署到 GitHub Pages；后端需 ssh 到服务器拉取代码、`pnpm install && pnpm build`，再 `pm2 start ecosystem.config.js` 守护。│   │   ├── Layout.vue             # 全站布局
│   │   └── styles.css             # 全局样式（含 markdown 内容样式）
│   ├── lib/                       # 内容解析（frontmatter / markdown / 读取）
│   ├── scripts/
│   │   ├── ssg.mjs                # 构建：客户端+SSR bundle → 渲染全部页面 → dist/client
│   │   └── dev.mjs                # 开发 SSR 预览（vite middleware）
│   ├── template.html              # 页面 HTML 模板
│   └── vite.config.ts
├── server/                        # Hono 后端 API
└── content/                       # 文章 Markdown 源（唯一内容入口）
```

## 写文章

在 `content/<英文分类>/<英文slug>.md` 新建 Markdown 文件（带 frontmatter）：

```markdown
---
title: 文章标题
date: 2026-08-20
category: tech          # 英文，用于 URL（必填，与目录名一致）
categoryName: 技术      # 中文显示名（可省略，缺省用 category）
tags: [Vue, 前端]
summary: 一句话摘要
---

正文内容（Markdown）
```

约定：**目录名/文件名用英文**（URL 干净），`title` / `categoryName` 用中文（页面显示）。文章 URL 形如 `/zhi-web/page/tech/vue-reactivity`。

改完 `git add . && git commit -m "feat: 新增文章" && git push`，GitHub Actions 自动构建发布 Pages。

## 本地开发

```bash
# 前端开发预览（SSR，端口 5173）
cd frontend && npm install && npm run dev

# 前端构建（产出 dist/client/，可设 BASE_URL 控制路径前缀）
cd frontend && npm run build
cd frontend && BASE_URL=/zhi-web/ npm run build   # GitHub Pages 默认子路径

# 后端
cd server && npm install && npm run dev
```

## 部署

前端由 Actions 自动部署到 GitHub Pages；后端需 ssh 到服务器拉取代码、`npm ci && npm run build`，再 `pm2 start ecosystem.config.js` 守护。
