'use client'
import { Header } from '@/components/Header'
import PostCard from '@/components/Post'
import data from '@/data/posts.json'
import { Post } from '@/interfaces/Community'
import { Divider, Spinner } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { poppins } from '../fonts'
import { getToken } from '@/utils/auth'
import { listPosts } from '@/utils/ApiPosts'
import { getUser } from '@/utils/ApiUser'
import ClosedPostCard from '@/components/ClosedPost'

const PAGE_SIZE=10

export default function Community() {
  const [loading, setLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchData = useCallback(async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      listPosts(pageNumber, PAGE_SIZE).then(async (response) => {
        const newPosts: Post[] = await Promise.all(response.data.map(async (post: Post) => {

          const commentsWithUser = await Promise.all(post.comments.map(async (comment: any) => {
            const userReponse = await getUser(comment.user_id)
            return {
              author: userReponse.username,
              date: comment.CreatedAt,
              title: comment.title,
              content: comment.content,
              avatar: "",
              comments: []
            }
          }))

          return {
            title: post.title,
            before: post.before,
            after: post.after, 
            likes: post.likes, 
            description: post.description,
            comments: commentsWithUser
          }
        }));

        setPosts(prevItems => [...prevItems, ...newPosts]);
        setHasMore(newPosts.length > 0); // Check if there's more data to load
      });
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [fetchData, page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  const incrementLikes = (ind: number) => {
    let postsCopy = [...posts]
    postsCopy[ind].likes++
    setPosts(postsCopy)
  }


  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center gap-5 py-8 font-size-text-adjust'>
        <h1 className={poppins.className+' font-size-title-adjust-3xl md:font-size-title-adjust-6xl font-medium'}>Comunidad</h1>
        <section
          className='flex flex-col w-full md:w-1/2 justify-center gap-x-10'
          aria-busy={loading}
          role='feed'
        >
          {posts.map((post, index) => (
              <div>
                <Divider/>
                <ClosedPostCard
                  post={post}
                  likes={post.likes.length}
                  comments={post.comments.length}
                  key={index}
                  incrementLikes={() => incrementLikes(index)}
                />
                <Divider/>
              </div>
          ))}
        </section>
        {loading && <Spinner aria-label='Loading...' color='warning' />}
      </main>
    </>
  )
}
