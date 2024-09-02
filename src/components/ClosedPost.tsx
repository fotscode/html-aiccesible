import { Post } from '@/interfaces/Community'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react'
import CommentCard from './Comment'
import { HeartIcon } from './HeartIcon'
import { BiCommentDetail } from "react-icons/bi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { poppins } from '@/app/fonts'

type ClosedPostProps = {
  post: Post
  comments: number
  incrementLikes: () => void
}

const loggedUser = {
  ID: 3,
  username: "fots"
}

export default function ClosedPostCard(props: ClosedPostProps) {
  const { post, comments, incrementLikes } = props

  return (
    <>
      <Divider />
      <Card isBlurred shadow='none' className='border-none bg-transparent transition-all duration-300 hover:bg-primary-100 hover:shadow-lg hover:cursor-pointer dark:hover:bg-default-900 my-2 w-full p-4'>
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
                radius='md'
                aria-label='Like'
                onPress={incrementLikes}
                variant="light"
                startContent={post.likes.includes(loggedUser) ? (
                    <GoHeartFill className="h-6 w-6" />
                ) : (
                    <GoHeart className="h-6 w-6" />
                )}
            >
                {post.likes.length}
            </Button>
            <Button
                className='font-size-text-adjust-xs'
                color='danger'
                radius='md'
                aria-label='Comment'
                onPress={() => { } }
                variant="light"
                startContent={<BiCommentDetail className='h-1/2 w-1/2' />}
            >
                {comments}
            </Button>
        </CardFooter>
      </Card>
      <Divider/>
    </>
  )
}
