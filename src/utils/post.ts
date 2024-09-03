import { Post } from "@/interfaces/Community"
import { getUser } from "./ApiUser"

export async function formatPost(post: Post) {

  const commentsWithUser = await Promise.all(post.comments.map(async (comment: any) => {
    const userReponse = await getUser(comment.user_id)
    return {
      author: userReponse.username,
      date: comment.CreatedAt,
      title: comment.title,
      content: comment.content,
      avatar: "",
      comments: []
    }
  }))

  const likesWithUser = await Promise.all(post.likes.map(async (like: any) => {
    return {
      username: like.username
    } 
  }))

  return {
    ID: post.ID,
    title: post.title,
    before: post.before,
    after: post.after, 
    likes: likesWithUser, 
    description: post.description,
    comments: commentsWithUser
  }
}

