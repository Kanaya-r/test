import { CardList } from '@/components/CardList/CardList';

export const metadata = {
  title: "BLOG一覧",
};

export default function BlogPage() {
  return (
    <>
      <h1>Blog</h1>
      <CardList />
    </>
  )
}