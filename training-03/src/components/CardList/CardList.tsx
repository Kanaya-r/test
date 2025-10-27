import { PostCard } from '@/components/PostCard/PostCard';
import { posts } from '@/data/posts';

import styles from './CardList.module.scss';

export function CardList() {
  return (
    <ul className={styles['blog-list']}>
      {posts.map(post => (
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