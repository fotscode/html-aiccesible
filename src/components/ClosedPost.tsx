import { Post } from '@/interfaces/Community'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from '@nextui-org/react'
import { BiCommentDetail } from "react-icons/bi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { poppins } from '@/app/fonts'
import { useRouter } from 'next/navigation';

type ClosedPostProps = {
  post: Post
  likes: boolean[]
  comments: number
  toggleLike: () => void
  isLoggedIn: boolean
}


export default function ClosedPostCard(props: ClosedPostProps) {
  const { post, likes, comments, toggleLike, isLoggedIn} = props
  const router = useRouter()

  return (
    <>
      <Divider />
      <Card 
        isBlurred 
        isHoverable 
        onPressStart={() => { router.push(`/community/post/${post.ID}`) }}
        shadow='none' 
        className='border-none bg-transparent transition-all duration-300 hover:bg-primary-100 hover:shadow-lg hover:cursor-pointer dark:hover:bg-default-900 my-2 w-full p-4'
      >
        <div
          className='cursor-pointer'
          onClick={() => router.push(`/community/post/${post.ID}`)}
        >
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
            { isLoggedIn ? (
              <Button
                className='font-size-text-adjust-xs'
                color='danger'
                radius='md'
                aria-label='Like'
                onPress={toggleLike}
                variant="light"
                startContent={likes[post.ID - 1] ? (
                  <GoHeartFill className="h-6 w-6 transition-all ease-in" />
                ) : (
                  <GoHeart className="h-6 w-6 transition-all ease-out" />
                )}
              >
                  {post.likes.length}
              </Button>
            ) : (
              <Chip 
                variant='light'
                color='danger'
              >
                {post.likes.length} likes
              </Chip>
            )}
            <Button
              className='font-size-text-adjust-xs'
              color='danger'
              radius='md'
              aria-label='Comment'
              onPress={() => { router.push(`/community/post/${post.ID}?scrollTo=comments`) }}
              variant="light"
              startContent={<BiCommentDetail className='h-1/2 w-1/2' />}
            >
              {comments}
            </Button>
          </CardFooter>
        </div>
      </Card>
      <Divider/>
    </>
  )
}
