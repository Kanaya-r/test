import { PostCard } from '@/components/PostCard/PostCard';
import { getAllPreviews } from '@/lib/posts';
import type { PostPreview } from "@/types/post";


import styles from './CardList.module.scss';

export function CardList({ topPosts }: { topPosts?: PostPreview[] }) {
  const getAllPosts = getAllPreviews();
  const viewPosts = topPosts ? topPosts : getAllPosts;
  return (
    <ul className={styles['blog-list']}>
      {viewPosts.map(post => (
        <li key={ post.date + post.title }>
          <PostCard
            slug={ post.slug }
            title={ post.title }
            excerpt={ post.excerpt }
            date={ post.date }
            tags={ post.tags }
            image={ post.image }
            likes={ post.likes }
          />
        </li>
      ))}
    </ul>
  )
}