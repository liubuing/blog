import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export function formatDate(date: Date, lang = 'zh-CN'): string {
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function getReadingTime(text: string): number {
  const chars = text.length;
  const minutes = Math.max(1, Math.round(chars / 500));
  return minutes;
}

export function sortByDate(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export function filterPublished(posts: Post[]): Post[] {
  return posts.filter((p) => !p.data.draft);
}

export async function getAllPosts(): Promise<Post[]> {
  return sortByDate(filterPublished(await getCollection('blog')));
}

export function groupByYear(posts: Post[]): Map<number, Post[]> {
  const map = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.pubDate.getFullYear();
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(post);
  }
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]));
}

export function getAllTags(posts: Post[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(posts: Post[]): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    const c = post.data.category;
    if (!c) continue;
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function pickRandom<T>(arr: T[], seed = 0): T {
  return arr[Math.abs(seed) % arr.length];
}
