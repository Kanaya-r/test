import { posts } from "@/data/posts";
import type { Post, PostPreview } from "@/types/post";

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPreviews(): PostPreview[] {
  return getAllPosts().map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    image: p.image,
    likes: p.likes,
    tags: p.tags
  }));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}

/**
 * “TOP用にいいね上位N件”の土台（後でローカルの増減と合算する想定）
 */
export function getTopLikedBase(n: number): PostPreview[] {
  const all = getAllPreviews();
  return all.sort((a, b) => b.likes - a.likes).slice(0, n);
}
