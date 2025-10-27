import type { Post } from "@/types/post";

export const posts: Post[] = [
  {
    slug: "hello-next-15",
    title: "Next.js 15 触ってみた",
    excerpt: "React 19 とあわせて体験した初期の気づきを紹介します。",
    content: "本文（ダミー）。ここに実際の文章が入ります。",
    date: "2025-08-20",
    tags: ["nextjs", "react"],
    image: "",
    likes: 12
  },
  {
    slug: "scss-architecture",
    title: "SCSS設計のはじめかた",
    excerpt: "コロケーションとグローバルの住み分け、@use/@forwardの最小セット。",
    content: "本文（ダミー）。ここに実際の文章が入ります。",
    date: "2025-08-25",
    tags: ["scss"],
    image: "",
    likes: 5
  },
  {
    slug: "routing-basics",
    title: "App Routerの基本",
    excerpt: "layout/page/テンプレートの関係と動的ルートの考え方。",
    content: "本文（ダミー）。ここに実際の文章が入ります。",
    date: "2025-08-28",
    tags: ["nextjs"],
    image: "",
    likes: 20
  },
  {
    slug: "typescript-tips",
    title: "TypeScript小技集",
    excerpt: "as const / 型の分割統治 / Utility Types など。",
    content: "本文（ダミー）。ここに実際の文章が入ります。",
    date: "2025-08-30",
    tags: ["typescript"],
    image: "",
    likes: 8
  },
  {
    slug: "state-management",
    title: "状態管理の最小原則",
    excerpt: "まずは props と context、必要になってから拡張。",
    content: "本文（ダミー）。ここに実際の文章が入ります。",
    date: "2025-09-01",
    tags: ["react"],
    image: "",
    likes: 16
  }
];
