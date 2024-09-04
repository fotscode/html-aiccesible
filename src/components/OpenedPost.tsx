import { Post, User } from '@/interfaces/Community'
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
import { CopyBlock, dracula } from 'react-code-blocks'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { BiCommentDetail } from 'react-icons/bi'

type PostProps = {
  post: Post
  incrementLikes: () => void
  liked: boolean
}

function format(html) {
  var tab = '  '
  var result = ''
  var indent = ''

  html.split(/>\s*</).forEach(function (element) {
    if (element.match(/^\/\w/)) {
      indent = indent.substring(tab.length)
    }

    result += indent + '<' + element + '>\r\n'

    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input')) {
      indent += tab
    }
  })

  return result.substring(1, result.length - 3)
}


export default function OpenedPostCard(props: PostProps) {
  const { post, incrementLikes, liked} = props


  return (
    <article
      className='w-full'
    >
      <Card shadow='none' className='p-4 bg-transparent border-none'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          <h2 className={`${poppins.className} font-size-title-adjust-xl md:font-size-title-adjust-3xl`}>
            {post.title}
          </h2>
        </CardHeader>
        <CardBody className='overflow-visible py-2 flex justify-end items-end'>
          <section className='w-full flex flex-col justify-center items-start'>
            <p>{post.description}</p>
            <h3 className='font-size-title-adjust-base'>Antes:</h3>
            {/*
            <CopyBlock
              text={format(post.before)}
              language='html'
              showLineNumbers={false}
              theme={dracula}
              wrapLongLines
            />
            <h3 className='font-size-title-adjust-base'>Despues:</h3>
            <CopyBlock
              text={format(post.after)}
              language='html'
              showLineNumbers={false}
              theme={dracula}
              wrapLongLines
            />
            */}
            <div className='flex flex-row'>
              <Button
                  className='font-size-text-adjust-xs'
                  color='danger'
                  radius='md'
                  aria-label='Like'
                  onPress={incrementLikes}
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
                  onPress={() => {  } }
                  variant="light"
                  startContent={<BiCommentDetail className='h-1/2 w-1/2' />}
              >
                  {post.comments.length}
              </Button>
            </div>
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
