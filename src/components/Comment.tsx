import { Comment } from '@/interfaces/Community'
import { Card, CardBody, CardHeader, User } from '@nextui-org/react'
type CommentProps = {
  comment: Comment
  position: number
}
export default function CommentCard(props: CommentProps) {
  const { comment, position } = props
  return (
    <article className='flex gap-2 flex-col w-full mx-0'>
      <Card className='sm:p-2'>
        <CardHeader>
          <User
            name={comment.author}
            description={(<span className="text-black">{comment.date}</span>)}
            // change color of description to black
            avatarProps={{ src: comment.avatar }}
          />
        </CardHeader>
        <CardBody>
          <h3 className='font-bold'>{comment.title}</h3>
          <p>{comment.content}</p>
        </CardBody>
      </Card>
    </article>
  )
}
