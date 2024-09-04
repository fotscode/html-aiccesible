'use client'

import { Post } from '@/interfaces/Community'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getPosts } from '@/utils/ApiPosts'
import { formatPost } from '@/utils/post'
import { poppins } from '@/app/fonts'
import { Header } from './Header'
import ClosedPostCard from './ClosedPost'

const NUMBER_OF_POSTS_TO_FETCH = 10

type PostsListProps = {
  initialPosts: Post[]
}

export default function PostsList({ initialPosts }: PostsListProps) {
  const [page, setPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView()
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const loadMorePosts = async () => {
    setLoading(true)
    const fetchedPosts = await getPosts(page, NUMBER_OF_POSTS_TO_FETCH)
    const formattedPosts = await Promise.all(
      fetchedPosts.map(async (post: any) => await formatPost(post))
    );
    setPosts([...posts, ...formattedPosts])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
    if (inView && !loading) {
      loadMorePosts()
    }
  }, [inView, loading])

  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center gap-5 py-8 font-size-text-adjust'>
        <h1 className={poppins.className +' font-size-title-adjust-3xl md:font-size-title-adjust-6xl font-medium'}>Comunidad</h1>
        <section
          className='flex flex-col w-full md:w-1/2 justify-center gap-x-10'
          aria-busy={loading}
          role='feed'
        >
          {posts.map((post: Post) => (
            <ClosedPostCard
              key={post.ID}
              post={post}
              likes={[]}
              comments={post.comments.length}
              incrementLikes={() => {}}
            />
          ))}
          <div ref={ref} />
        </section>
      </main>
    </>
  )
}
