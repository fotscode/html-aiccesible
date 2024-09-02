export interface Post {
  title: string
  before: string
  after: string
  likes: number
  description: string
  comments: Comment[]
}

export interface Comment {
  author: string
  date: string
  title: string
  content: string
  avatar: string
  comments: Comment[]
}
