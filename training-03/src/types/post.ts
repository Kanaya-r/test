export type Post = {
  slug: string;        // 例: "first-post"
  title: string;
  excerpt: string;
  content: string;     // 記事ページで使用（まずはプレーンテキストでもOK）
  date: string;        // ISO (例: "2025-08-20")
  tags: string[];
  image?: string;       // サムネイル画像のパス（任意）
  likes: number;       // ベースの“いいね”数（データ起点）
};

export type PostPreview = Pick<Post, "slug" | "title" | "excerpt" | "date" | "image" | "likes" | "tags">;
