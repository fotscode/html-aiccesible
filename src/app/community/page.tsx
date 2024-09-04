'use client'

import { Post } from '@/interfaces/Community'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getPost, getPosts, likePost } from '@/utils/ApiPosts'
import { formatPost } from '@/utils/post'
import { poppins } from '@/app/fonts'
import { Header } from '@/components/Header'
import ClosedPostCard from '@/components/ClosedPost'
import { getToken, getUsername } from '@/utils/auth'
import { Spinner } from '@nextui-org/react'

const NUMBER_OF_POSTS_TO_FETCH = 10

export default function Community() {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView()
  const [posts, setPosts] = useState<Post[]>([])
  const [myLikes, setMyLikes] = useState<boolean[]>([]);

  const loadMorePosts = async () => {
    setLoading(true)

    try {
      const fetchedPosts = await getPosts(page, NUMBER_OF_POSTS_TO_FETCH)
      const formattedPosts = await Promise.all(
        fetchedPosts.map(async (post: any) => await formatPost(post))
      );
      setPosts([...posts, ...formattedPosts])
      setPage(page + 1)
    } catch (error: unknown) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (inView) {
      loadMorePosts()
    }
  }, [inView])

  useEffect(() => {
    setMyLikes(posts.map((post: Post) => 
        post.likes.some(like => like.username === getUsername())
    ));
  }, [posts])

  const toggleLike = async (id: number) => {
    try {
      await likePost(getToken(), id)
      /* from server 
      const response = await getPost(id)
      const likedPost: Post = response.data
      const updatedPosts = [...posts]
      updatedPosts[id - 1] = await formatPost(likedPost)
      myLikes[id - 1] = !myLikes[id - 1]
      */

      /* from client */
      const loggedUser = getUsername()
      const updatedPosts = [...posts]
      if (updatedPosts[id - 1].likes.some(like => like.username === loggedUser))
        updatedPosts[id - 1].likes = updatedPosts[id - 1].likes.filter(like => like.username !== loggedUser)
      else 
        updatedPosts[id - 1].likes.push({username: loggedUser})

      const updatedMyLikes = [...myLikes]
      updatedMyLikes[id - 1] = !updatedMyLikes[id - 1]
      setMyLikes(updatedMyLikes)
      setPosts(updatedPosts)
    } catch (error: any) {
      console.error(error.message);
    }
  }

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
              likes={myLikes}
              comments={post.comments.length}
              toggleLike={() => {toggleLike(post.ID)}}
            />
          ))}
          <div ref={ref} />
          {loading && <Spinner aria-label='Loading...' color='warning' />}
        </section>
      </main>
    </>
  )
}
