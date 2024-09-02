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
import { BiCommentDetail } from "react-icons/bi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { poppins } from '@/app/fonts'
import { CopyBlock, dracula } from 'react-code-blocks'

type ClosedPostProps = {
  post: Post
  likes: number
  comments: number
  incrementLikes: () => void
}

export default function ClosedPostCard(props: ClosedPostProps) {
  const { post, likes, comments, incrementLikes } = props

  return (
    <Card isBlurred shadow='sm' className='border-none bg-background/60 dark:bg-default-100/50 my-2 w-full p-4'>
      <CardHeader className='pt-2 flex-col items-start'>
        <h2 className={`${poppins.className} font-size-title-adjust-xl md:font-size-title-adjust-2xl font-bold`}>
          {post.title}
        </h2>
      </CardHeader>
      <CardBody className='overflow-visible py-2 flex justify-end items-end'>
        <section className='w-full flex flex-col justify-center items-start'>
          <p className='truncate-multiline'>{post.description}</p>
        </section>
      </CardBody>
      <CardFooter className='flex flex-row justify-start gap-0 py-2'>
        <Button
          className='font-size-text-adjust-xs'
          color='danger'
          aria-label='Like'
          onPress={incrementLikes}
          variant="light"
          startContent={<GoHeart className='h-1/2 w-1/2'/>}
        >
          {likes}
        </Button>
        <Button
          className='font-size-text-adjust-xs'
          color='danger'
          aria-label='Like'
          onPress={() => {}}
          variant="light"
          startContent={<BiCommentDetail className='h-1/2 w-1/2'/>}
        >
          {comments}
        </Button>
      </CardFooter>
    </Card>
  )
}
