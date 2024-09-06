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
import { useContext } from 'react';
import { ConfigContext } from '@/app/context/ConfigProvider';
import { useTranslations } from 'next-intl';
import { RiArrowRightSLine } from "react-icons/ri";

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

  const { likes: showLikes, comments: showComments } = useContext(ConfigContext)

  const t = useTranslations('ClosedPostCard')

  return (
    <>
      <Divider />
      <Card 
        isBlurred 
        aria-label={t('label')}
        shadow='none' 
        className='border-none bg-transparent transition-all duration-300 hover:shadow-lg my-2 w-full p-4'
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
          <CardFooter className='flex flex-row justify-between gap-0 py-2'>
            <div className='flex flex-row items-center'>
              { showLikes && (
                isLoggedIn ? (
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
                    className='font-size-text-adjust-base'
                    variant='light'
                    color='danger'
                  >
                    {post.likes.length} {t('likes')}
                  </Chip>
                )
              )}
              { showComments && (
                <Button
                  className='font-size-text-adjust-xs'
                  color='danger'
                  radius='md'
                  aria-label={t('comments')}
                  onPress={() => { router.push(`/community/post/${post.ID}?scrollTo=comments`) }}
                  variant="light"
                  startContent={<BiCommentDetail className='h-1/2 w-1/2' />}
                >
                  {comments}
                </Button>
              )}
            </div>
            <Button 
              className='font-size-text-adjust-base'
              onPress={() => { router.push(`/community/post/${post.ID}`) }}
              aria-label={t('enter.label')}
              variant='light'
              radius='md'
              color='primary'
              endContent={<RiArrowRightSLine className='h-1/2 w-1/2'/>}
            >
              {t('enter.title')}
            </Button>
          </CardFooter>
      </Card>
      <Divider/>
    </>
  )
}
