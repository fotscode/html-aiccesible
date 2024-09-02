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
import { CopyBlock, dracula } from 'react-code-blocks'

type PostProps = {
  post: Post
  position: number
  incrementLikes: () => void
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


export default function OpenPostCard(props: PostProps) {
  const { post, incrementLikes, position } = props
  return (
    <article
      className='w-full sm:w-2/3 xl:w-[1024px]'
    >
      <Card className='p-4'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          <h2 className={`${poppins.className} font-size-title-adjust-xl md:font-size-title-adjust-3xl`}>
            {post.title}
          </h2>
          <p>{post.description}</p>
        </CardHeader>
        <CardBody className='overflow-visible py-2 flex justify-end items-end'>
          <section className='w-full flex flex-col justify-center items-start'>
            <h3 className='font-size-title-adjust-base'>Antes:</h3>
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
          </section>
          <Button
            isIconOnly
            color='danger'
            aria-label='Like'
            onPress={incrementLikes}
          >
            <HeartIcon />
          </Button>
          {post.likes} Likes
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
