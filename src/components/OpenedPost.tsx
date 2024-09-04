import { Post } from '@/interfaces/Community'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  User,
} from '@nextui-org/react'
import CommentCard from './Comment'
import { poppins } from '@/app/fonts'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { BiCommentDetail } from 'react-icons/bi'
import CommentBar from './CommentBar'
import { useRef } from 'react'
import { beautifyHTML } from '@/utils/beautifier'
import CodeBlock from './CodeBlock'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation'

type PostProps = {
  post: Post
  toggleLikes: () => void
  liked: boolean
}

export default function OpenedPostCard(props: PostProps) {
  const { post, toggleLikes, liked} = props

  const targetRef = useRef<HTMLDivElement>(null);

  const router = useRouter()


  return (
    <article
      className='w-full'
    >
      <Card shadow='none' className='w-full py-4 bg-transparent border-none'>
        <CardHeader className='py-2 flex-row justify-between'>
          <Button 
            isIconOnly 
            variant='light'
            className='h-10 w-10'
            radius='full'
            color='primary'
            onPress={() => {router.back()}}
          >
            <IoArrowBackCircleSharp className='h-full w-full' />
          </Button>
          <User
            name={post.author}
            description={(<span className='text-typography'>{post.date}</span>)}
            avatarProps={{ 
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              size: 'sm',
            }}
          />
        </CardHeader>
        <Divider/>
        <CardBody className='overflow-visible py-2 flex justify-end items-end'>
          <section className='w-full flex flex-col justify-center items-start'>
            <h2 className={`${poppins.className} font-size-title-adjust-xl md:font-size-title-adjust-3xl`}>
              {post.title}
            </h2>
            <p>{post.description}</p>
            <div className='h-[40vh] w-full py-5'>
              <h3 className='font-size-title-adjust-base'>Antes:</h3>
              <CodeBlock
                code={beautifyHTML(post.before)}
                label="Código antes de ser accesible"
              />
            </div>
            <div className='h-[40vh] w-full py-5'>
              <h3 className='font-size-title-adjust-base'>Después:</h3>
              <CodeBlock
                code={beautifyHTML(post.after)}
                label="Código accesible"
              />
            </div>
          </section>
        </CardBody>
        <CardFooter className='flex flex-row justify-start items-center sm:px-4 py-2'>
            <Button
                className='font-size-text-adjust-xs'
                color='danger'
                radius='md'
                aria-label='Like'
                onPress={toggleLikes}
                variant="light"
                startContent={ liked ? (
                    <GoHeartFill className="h-6 w-6 transition-all ease-in" />
                ) : (
                    <GoHeart className="h-6 w-6 transition-all ease-out" />
                )}
            >
                {post.likes.length}
            </Button>
            <Button
                className='font-size-text-adjust-xs'
                color='danger'
                radius='md'
                aria-label='Comment'
                onPress={() => { 
                  if (targetRef.current)
                    targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
                }}
                variant="light"
                startContent={<BiCommentDetail className='h-1/2 w-1/2' />}
            >
                {post.comments.length}
            </Button>
        </CardFooter>
        <Divider className='my-2'/>
        <section className='mx-2' ref={targetRef}>
          <CommentBar postID={post.ID}/>
          {post.comments.map((comment) => (
            <CommentCard comment={comment} key={comment.ID} />
          ))}
        </section>
      </Card>
    </article>
  )
}
