export const SITE = {
  title: '琉卜的大脑',
  description: '在生物的无性之美与有性之美间,以代码丈量生命。',
  author: '琉卜',
  startYear: 2020,
  url: 'https://example.com',
  email: '3434216105@qq.com',
  social: {
    github: 'https://github.com/liubuing',
    zhihu: '',
    weibo: '',
  },
  // 哲学主题:生物以无性之美,体现有性之美
  // 无性繁殖 = 同一性的纯粹复制,有性生殖 = 差异的交融与新生
  heroTitle: '琉卜的大脑',
  heroSubtitle: '在生物的无性之美与有性之美之间,以代码丈量生命',
  heroMotto: '生物以无性之美,体现有性之美',
  // 头图:符玄(崩坏:星穹铁道)官方立绘 —— 来自 HoYoWiki entry 804
  // 图片下载至 public/images/,源自 upload-static.hoyoverse.com
  // 用于首页 Hero 轮播(居中 contain 展示,不裁切)
  heroImages: [
    '/images/fuxuan-3.webp',
    '/images/fuxuan-4.webp',
    '/images/HoYoWiki-image.jpg',
    '/images/HoYoWiki-image.png',
    '/images/HoYoWiki-image (2).png',
  ],
  // 符玄角色PV「法眼无遗」(B站官方)
  characterPV: {
    bvid: 'BV1R94y1W7pL',
    title: '《崩坏:星穹铁道》符玄角色PV——「法眼无遗」',
    cover: '/images/fuxuan-emblem.webp',
  },
  postHeroImages: [
    '/images/fuxuan-portrait.png',
  ],
  footerText: '© {year} 琉卜的大脑 · 以代码致敬生命',
};

export const NAV = [
  { name: '首页', href: '/', icon: 'home' },
  { name: '分类', href: '/categories/', icon: 'folder' },
  { name: '标签', href: '/tags/', icon: 'tag' },
  { name: '归档', href: '/archive/', icon: 'archive' },
  { name: '关于', href: '/about/', icon: 'about' },
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', href: SITE.social.github, icon: 'github' },
  { name: '知乎', href: SITE.social.zhihu, icon: 'zhihu' },
  { name: '微博', href: SITE.social.weibo, icon: 'weibo' },
  { name: 'RSS', href: '/rss.xml', icon: 'rss' },
];

export const GISCUS = {
  enabled: false,
  repo: 'liubuing/liubuing',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  mapping: 'pathname',
  reactionsEnabled: '1',
  theme: 'light',
  lang: 'zh-CN',
};
