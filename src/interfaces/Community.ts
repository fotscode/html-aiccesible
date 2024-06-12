export interface Post {
  title: string
  image: string
  likes: number
  description: string
  html: string
  comments: Comment[]
}

export interface Comment {
  author: string
  date: string
  title: string
  avatar: string
  content: string
  comments: Comment[]
}
