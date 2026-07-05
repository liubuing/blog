# 琉卜的大脑

> 生物以无性之美,体现有性之美。

一个生物 × 计算机交叉从业者的个人博客。基于 [Astro](https://astro.build) 构建,视觉灵感来源于 Hexo [LiveForCode](https://github.com/first19326/Hexo-LiveForCode) 主题,并加入 **DNA 双螺旋** 作为首页意象,呼应站点关于"无性之美 / 有性之美"的哲学命题。

## ✨ 功能特性

- 📝 Markdown / MDX 写作,内容集合(Content Collections)类型校验
- 📑 文章自动目录(TOC),滚动高亮当前章节
- 🏷️ 标签云与分类聚合,归档时间线
- 🔍 Pagefind 静态站内搜索(构建时生成索引,`Ctrl/⌘ + K` 唤起)
- 💬 Giscus 评论系统(基于 GitHub Discussions)
- 🌓 深色 / 浅色模式切换,记忆偏好,防闪烁
- 📡 RSS 订阅 + 站点地图
- ⚡ 默认零 JS 输出,顶部阅读进度条,失焦标题切换
- 🧬 DNA 双螺旋首页装饰

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器(http://localhost:4321)
npm run dev

# 构建生产版本(含 Pagefind 搜索索引)
npm run build

# 本地预览构建产物
npm run preview
```

## ✍️ 写作

新建一篇文章:

```bash
npm run new "我的新文章"
```

会在 `src/content/blog/` 生成带 frontmatter 的模板。文章 frontmatter 字段:

```yaml
---
title: '文章标题'           # 必填
description: '摘要描述'      # 选填,用于列表与 SEO
pubDate: 2024-12-01          # 必填,发布日期
updatedDate: 2025-01-02      # 选填,更新日期
category: '生物信息'         # 必填,分类
tags: ['Python', '序列分析'] # 选填,标签数组
cover: '/images/posts/xx.jpg'# 选填,文章头图
draft: false                 # 选填,草稿不构建,默认 false
pinned: false                # 选填,首页置顶,默认 false
---
```

文章正文支持标准 Markdown 与 MDX(可在文中引入 Astro 组件)。代码块自动高亮,支持明暗双主题。

## ⚙️ 个性化配置

所有站点级配置集中在 `src/consts.ts`:

| 配置项 | 说明 |
| :- | :- |
| `SITE` | 站点标题、作者、头图、页脚等 |
| `SITE.heroMotto` | 首页哲学标语(无性之美 / 有性之美) |
| `NAV` | 顶部导航菜单 |
| `SOCIAL_LINKS` | 社交链接(GitHub / 知乎 / RSS 等) |
| `GISCUS` | 评论系统配置(需填 `repo`/`repoId`/`categoryId`) |

### 开启评论

1. 前往 [giscus.app](https://giscus.app) 配置你的 GitHub 仓库(需开启 Discussions)
2. 将生成的 `repo`、`repoId`、`category`、`categoryId` 填入 `src/consts.ts` 的 `GISCUS`
3. 重新构建即可

### 修改头图

替换 `SITE.heroImages`(首页头图,支持多张随机切换)与 `SITE.postHeroImages`(文章默认头图)。建议使用 1920×1080 以上尺寸。

## 🚢 部署

构建产物为纯静态文件,输出在 `dist/`,可部署到任意静态托管:

```bash
npm run build
# 将 dist/ 上传到你的服务器 / Nginx / 对象存储
```

也可直接推送到 Vercel / Cloudflare Pages / GitHub Pages 等平台,自动识别 Astro。

## 🧬 关于哲学命题

> 生物以无性之美,体现有性之美。

- **无性之美**:同一性的纯粹复制——DNA 精确拷贝、比特无损传输、程序确定执行,是自足的、闭合的、数学般确定的美
- **有性之美**:差异的交融与新生——减数分裂重组、变异与选择、演化涌现,是开放的、不可完全预测的、永远在生成之中的美

两者互为底色:计算机是"无性之美"的极致,生物是"有性之美"的原型,用前者建模后者,正是本站作者每日所做之事。

## 🛠 技术栈

- **框架**:Astro 4 + MDX
- **样式**:Tailwind CSS + Typography
- **搜索**:Pagefind(构建时索引)
- **评论**:Giscus
- **订阅**:@astrojs/rss
- **SEO**:@astrojs/sitemap
- **代码高亮**:Shiki(明暗双主题)

---

© 琉卜的大脑 · 以代码致敬生命
