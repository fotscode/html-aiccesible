import { getUser } from "./ApiUser"

export function formatDate(dateString: string): string {
    // Parse the input date string into a Date object
    const date = new Date(dateString);
    
    // Extract day, month, year, hours, and minutes
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() is zero-based
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
    // Format the output string
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}


export async function formatPost(post: any) {

  const commentsWithUser = await Promise.all(post.comments.map(async (comment: any) => {
    const userResponse = await getUser(comment.user_id)
    return {
      ID: comment.ID,
      author: userResponse.username,
      date: formatDate(comment.CreatedAt),
      title: comment.title,
      content: comment.content,
      avatar: "",
    }
  }))

  const likesWithUser = await Promise.all(post.likes.map(async (like: any) => {
    return {
      username: like.username
    } 
  }))

  const author = await getUser(post.user_id)

  return {
    ID: post.ID,
    author: author.username,
    date: formatDate(post.CreatedAt),
    title: post.title,
    before: post.before,
    after: post.after, 
    likes: likesWithUser, 
    description: post.description,
    comments: commentsWithUser
  }
}

