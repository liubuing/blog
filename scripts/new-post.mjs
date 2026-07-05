// 新建文章脚本: npm run new "文章标题"
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const title = process.argv[2] || '未命名文章';
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const slug =
  title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'post';

const dir = resolve(__dirname, '..', 'src', 'content', 'blog');
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const filename = `${dateStr}-${slug}.md`;
const filepath = resolve(dir, filename);
if (existsSync(filepath)) {
  console.error(`\x1b[31m文章已存在: ${filename}\x1b[0m`);
  process.exit(1);
}

const content = `---
title: '${title}'
description: ''
pubDate: ${dateStr}
category: '未分类'
tags: []
draft: true
---

开始写作吧 ✍️
`;

writeFileSync(filepath, content, 'utf-8');
console.log(`\x1b[32m✓ 已创建文章:\x1b[0m src/content/blog/${filename}`);
console.log(`  标题: ${title}`);
console.log(`  日期: ${dateStr}`);
