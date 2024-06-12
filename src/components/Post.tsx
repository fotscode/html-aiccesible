import { Post } from '@/interfaces/Community'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react'
import CommentCard from './Comment'
import { HeartIcon } from './HeartIcon'
import { poppins } from '@/app/fonts'

type PostProps = {
  post: Post
  position: number
  incrementLikes: () => void
}

export default function PostCard(props: PostProps) {
  const { post, incrementLikes, position } = props
  return (
    <article
      className='w-full sm:w-2/3 xl:w-[1024px]'
      aria-posinset={position}
      aria-setsize='-1'
    >
      <Card className='p-4'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          <h2 className={`${poppins.className} text-xl md:text-3xl`}>{post.title}</h2>
          <p>{post.description}</p>
        </CardHeader>
        <CardBody className='overflow-visible py-2'>
          <img src={post.image} alt={post.title} />
          <section className='flex gap-2 items-center justify-end mx-2 my-2'>
            <Button
              isIconOnly
              color='danger'
              aria-label='Like'
              onClick={incrementLikes}
            >
              <HeartIcon />
            </Button>
            {post.likes} Likes
          </section>
        </CardBody>
        <CardFooter className='flex justify-between items-center sm:px-4 py-2'>
          {post.comments.map((comment, index) => (
            <CommentCard comment={comment} position={index} key={index} />
          ))}
        </CardFooter>
      </Card>
    </article>
  )
}
