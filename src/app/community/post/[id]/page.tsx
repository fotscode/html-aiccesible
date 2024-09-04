'use client'

import { Header } from '@/components/Header'
import { Post, User } from '@/interfaces/Community'
import { Spinner } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { getToken } from '@/utils/auth'
import { getPost, likePost } from '@/utils/ApiPosts'
import { formatPost } from '@/utils/post'
import OpenedPost from '@/components/OpenedPost'
import { useParams } from 'next/navigation'

const myUser: User = {
  username: sessionStorage.getItem('username')!!
}

export default function PostPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post>();
  const [liked, setLiked] = useState<boolean>(false);
  const { id } = useParams() as { id: string }; 

  const fetchPost = async () => {
    try {
        const postResponse = await getPost(+id);
        const formattedPost = await formatPost(postResponse.data);
        setPost(formattedPost);

        if (formattedPost.likes.some(like => like.username === myUser.username)) {
          setLiked(true)
        } else {
          setLiked(false)
        }
    } catch (error) {
        console.error(error);
        setError('Failed to fetch post');
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost()
  }, [id])

  if (loading) {
    return <Spinner aria-label='Loading...' color='warning' />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Post not found.</div>; // Handle case where post is null
  }

  const like = async (id: number) => {
    try {
      await likePost(getToken(), id)
      if (liked) 
        post.likes = post.likes.filter(like => like.username !== myUser.username);
      else 
        post.likes.push(myUser)
      setLiked(!liked)
    } catch (error: any) {
      console.error(error.message);
    }
  }



  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center gap-5 py-8 font-size-text-adjust'>
        {loading && <Spinner aria-label='Loading...' color='warning' />}
        <section
          className='flex flex-col w-full md:w-1/2 justify-center'
          aria-busy={loading}
          role='feed'
        >
          <OpenedPost post={post} incrementLikes={() => like(post.ID)} liked={liked}/>
        </section>
      </main>
    </>
  )
}

