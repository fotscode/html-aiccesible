export interface Post {
  ID: number
  date: string
  author: string
  title: string
  before: string
  after: string
  likes: User[]
  description: string
  comments: Comment[]
}

export interface Comment {
  ID: number
  author: string
  date: string
  title: string
  content: string
  avatar: string
}

export interface User {
  username: string
}
