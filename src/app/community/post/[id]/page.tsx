'use client'

import { Header } from '@/components/Header'
import { Post } from '@/interfaces/Community'
import { Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { getToken, getUsername } from '@/utils/auth'
import { getPost, likePost } from '@/utils/ApiPosts'
import { formatPost } from '@/utils/post'
import OpenedPost from '@/components/OpenedPost'
import { useParams } from 'next/navigation'


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

        if (formattedPost.likes.some(like => like.username === getUsername())) {
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
    return <Spinner aria-label='Loading...' color='primary' />;
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
        post.likes = post.likes.filter(like => like.username !== getUsername());
      else 
        post.likes.push({username: getUsername()})
      setLiked(!liked)
    } catch (error: any) {
      console.error(error.message);
    }
  }



  return (
    <>
      <Header />
      <main className='h-full flex flex-col justify-center items-center gap-5 py-8 font-size-text-adjust'>
        <section
          className='flex flex-col w-full px-2 md:w-1/2 justify-center'
          aria-busy={loading}
          role='feed'
        >
          <OpenedPost post={post} toggleLikes={() => like(post.ID)} liked={liked}/>
        </section>
        {loading && <Spinner className='flex justify-center items-center' aria-label='Loading...' color='primary' />}
      </main>
    </>
  )
}

