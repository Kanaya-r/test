import type { Post } from '@/types/post'

// ダミー記事データ
export const posts: Post[] = [
  {
    date: '2025-01-01',
    title: 'Post - 01',
    tag: ['HOGE'],
    content: 'This is the content for the first post.',
    likes: 0
  },
  {
    date: '2025-01-02',
    title: 'Post - 02',
    tag: ['FUGA'],
    content: 'This is the content for the second post.',
    likes: 0
  },
  {
    date: '2025-01-03',
    title: 'Post - 03',
    tag: ['HOGE', 'FUGA'],
    content: 'This is the content for the third post.',
    likes: 0
  },
]