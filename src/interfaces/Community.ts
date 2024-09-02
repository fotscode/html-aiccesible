export interface Post {
  ID: number
  title: string
  before: string
  after: string
  likes: User[]
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

export interface User {
  ID: number
  username: string
}
