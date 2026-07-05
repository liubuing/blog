import rss from '@astrojs/rss';
import { getAllPosts } from '@/utils';
import { SITE } from '@/consts';

export async function GET(context: { site: URL }) {
  const posts = await getAllPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>zh-cn</language>`,
  });
}
