'use client'

import { Header } from '@/components/Header'
import { Post } from '@/interfaces/Community'
import { Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { getToken, getUsername, isLoggedIn } from '@/utils/auth'
import { getPost, likePost } from '@/utils/ApiPosts'
import { formatPost } from '@/utils/post'
import OpenedPost from '@/components/OpenedPost'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'


export default function PostPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post>();
  const [liked, setLiked] = useState<boolean>(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { id } = useParams() as { id: string }; 

  const t = useTranslations('PostPage')


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
        setError(`${error}`);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost()
  }, [id])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsUserLoggedIn(isLoggedIn());
    }
  }, []); 

  if (loading) {
    return (
      <div className='flex min-h-screen justify-center items-center flex-col'>
        <div className='flex justify-center items-center'>
          <Spinner aria-label={t('loading')} color='primary' role='status'/>
        </div>
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>{t('not_found')}</div>; 
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
          className='flex flex-col w-full px-2 md:w-3/4 lg:w-1/2 justify-center'
          aria-busy={loading}
          aria-label={t('section')}
        >
          <OpenedPost post={post} toggleLikes={() => like(post.ID)} liked={liked} isLoggedIn={isUserLoggedIn}/>
        </section>
        {loading && <Spinner className='flex justify-center items-center' aria-label={t('loading')} color='primary' role='status'/>}
      </main>
    </>
  )
}

