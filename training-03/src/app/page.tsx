import { getTopLikedBase } from "@/lib/posts";
import { CardList } from "@/components/CardList/CardList";

export default function Home() {
  const posts = getTopLikedBase(3);
  return (
    <>
      <h1>Welcome to Next.js Training</h1>
      <CardList topPosts={ posts }/>
    </>
  );
}
