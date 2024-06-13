'use client'
import { Header } from '@/components/Header'
import PostCard from '@/components/Post'
import data from '@/data/posts.json'
import { Post } from '@/interfaces/Community'
import { Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export default function Comunnity() {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState(data.posts)
  // detect 300 px below the bottom of the page on scroll, then load more posts
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <
          document.documentElement.offsetHeight - 300 ||
        loading
      ) {
        return
      }
      setLoading(true)
      setTimeout(() => {
        setPosts([...posts, ...data.posts])
        setLoading(false)
      }, 1000)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading])

  const incrementLikes = (post: Post, ind: number) => {
    let postsCopy = [...posts]
    postsCopy[ind].likes++
    setPosts(postsCopy)
  }

  return (
    <>
      <Header />
      <main
        className='flex flex-col justify-center items-center gap-5 mx-2 my-5'
        aria-busy={loading}
        role='feed'
      >
        {posts.map((post, index) => (
          <PostCard
            post={post}
            position={index}
            key={index}
            incrementLikes={() => incrementLikes(post, index)}
          />
        ))}
        {loading && <Spinner aria-label='Loading...' color='warning' />}
      </main>
    </>
  )
}
