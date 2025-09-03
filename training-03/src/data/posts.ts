import type { Post } from '@/types/post'

// ダミー記事データ
export const posts: Post[] = [
  {
    id: '1',
    slug: 'HOGE',
    title: 'Post - 01',
    excerpt: 'This is the excerpt for the first post.',
    publishedAt: '2025-01-01'
  },
  {
    id: '2',
    slug: 'FUGA',
    title: 'Post - 02',
    excerpt: 'This is the excerpt for the second post.',
    publishedAt: '2025-01-02'
  },
  {
    id: '3',
    slug: 'HOGE',
    title: 'Post - 03',
    excerpt: 'This is the excerpt for the third post.',
    publishedAt: '2025-01-02'
  }
]