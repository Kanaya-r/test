export type Post = {
  date: string
  title: string
  tag: string[]
  content: string
  thumb?: string
  likes?: number
}

export type PostPreview = Pick<Post, 'date' | 'title' | 'tag' | 'thumb' | 'likes'>
