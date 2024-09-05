import { Post, Comment } from '@/interfaces/Community'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  User,
} from '@nextui-org/react'
import CommentCard from './Comment'
import { poppins } from '@/app/fonts'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { BiCommentDetail } from 'react-icons/bi'
import CommentBar from './CommentBar'
import { useEffect, useRef, useState } from 'react'
import { beautifyHTML } from '@/utils/beautifier'
import CodeBlock from './CodeBlock'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useRouter, useSearchParams } from 'next/navigation'
import { getToken, getUsername } from '@/utils/auth'
import { addComment } from '@/utils/ApiComments'
import { formatDate } from '@/utils/post'

type PostProps = {
  post: Post
  toggleLikes: () => void
  liked: boolean
  isLoggedIn: boolean
}

export default function OpenedPostCard(props: PostProps) {
  const { post, toggleLikes, liked, isLoggedIn} = props

  const targetRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const router = useRouter()

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [textAreaOpened, setTextAreaOpened] = useState<boolean>(false);


  const submitComment = async (e: any) => {
    e.preventDefault();

    try {
      const comment = {
        post_id: post.ID,
        author: getUsername(),
        title: title,
        content: content,
      }

      const unformattedComment = await addComment(getToken(), comment);
      const formattedComment: Comment = {
        ID: unformattedComment.ID,
        author: getUsername(),
        date: formatDate(unformattedComment.CreatedAt),
        title: comment.title,
        content: comment.content,
        avatar: "",
      }

      setComments((prevComments) => [formattedComment, ...prevComments]);
      
      setTitle('');
      setContent('');
      setTextAreaOpened(false);
    } catch (error: any) {
      console.error(error.message);
    }
  }


    useEffect(() => {
        if (searchParams.get('scrollTo') === 'comments') {
            targetRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [searchParams]);


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
                setCode={null}
                label="Código antes de ser accesible"
                readonly={true}
              />
            </div>
            <div className='h-[40vh] w-full py-5'>
              <h3 className='font-size-title-adjust-base'>Después:</h3>
              <CodeBlock
                code={beautifyHTML(post.after)}
                setCode={null}
                label="Código accesible"
                readonly={true}
              />
            </div>
          </section>
        </CardBody>
        <CardFooter className='flex flex-row justify-start items-center sm:px-4 py-2'>
          { isLoggedIn ? (
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
          <CommentBar submitComment={submitComment} title={title} setTitle={setTitle} content={content} setContent={setContent} textAreaOpened={textAreaOpened} setTextAreaOpened={setTextAreaOpened}/>
          {comments.map((comment) => (
            <CommentCard comment={comment} key={comment.ID} />
          ))}
        </section>
      </Card>
    </article>
  )
}
