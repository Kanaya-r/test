import { posts } from '@/data/posts'

import type { Post, PostPreview } from '@/types/post'

export function getPostsPreview(): PostPreview[] {
  return posts.map(post => ({
    date: post.date,
    title: post.title,
    tag: post.tag,
    thumb: post.thumb,
    likes: post.likes
  }))
}