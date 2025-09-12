import { posts } from "@/data/posts"

import { PostCard } from "@/components/PostCard/PostCard"

export const metadata = {
  title: "BLOG一覧",
};

export default function BlogPage() {
  return (
    <>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={ post.date + post.title }>
            <PostCard 
              date={ post.date }
              title={ post.title }
              tags={ post.tag }
            />
          </li>
        ))}
      </ul>
    </>
  )
}