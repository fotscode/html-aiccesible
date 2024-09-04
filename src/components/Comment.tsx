import { Comment } from '@/interfaces/Community'
import { Card, CardBody, CardHeader, User } from '@nextui-org/react'

type CommentProps = {
  comment: Comment
}

export default function CommentCard(props: CommentProps) {
  const { comment } = props

  return (
    <Card shadow='none' className='bg-transparent border-none'>
      <CardHeader>
        <User
          name={comment.author}
          description={(<span className='text-typography'>{comment.date}</span>)}
          avatarProps={{ 
            src: comment.avatar ,
            size: 'sm',
          }}
        />
      </CardHeader>
      <CardBody>
        <h3 className='font-bold font-size-title-adjust-base'>{comment.title}</h3>
        <p>{comment.content}</p>
      </CardBody>
    </Card>
  )
}
