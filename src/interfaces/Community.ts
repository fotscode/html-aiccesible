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
  avatar: string
  content: string
  comments: Comment[]
}
