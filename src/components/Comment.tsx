import { Comment } from '@/interfaces/Community'
import { Card, CardBody, CardHeader, User } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

type CommentProps = {
  comment: Comment
}

export default function CommentCard(props: CommentProps) {
  const { comment } = props

  const t = useTranslations('CommentCard')

  return (
    <Card aria-label={t('label')} shadow='md' className='bg-transparent border-none my-2 py-2'>
      <CardHeader>
        <User
          name={comment.author}
          description={(<span className='text-typography'>{comment.date}</span>)}
          avatarProps={{ 
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
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
