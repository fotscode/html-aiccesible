'use client'
import { Header } from '@/components/Header'
import { Post } from '@/interfaces/Community'
import { Spinner } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { poppins } from '../fonts'
import { getToken } from '@/utils/auth'
import { getPost, likePost, listPosts } from '@/utils/ApiPosts'
import { formatPost } from '@/utils/post'
import ClosedPostCard from '@/components/ClosedPost'

const PAGE_SIZE=10

export default function Community() {
  const [loading, setLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<Post[]>([]);
  const [myLikes, setMyLikes] = useState<boolean[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);
    try {
      listPosts(page, PAGE_SIZE).then(async (response) => {
        const newPosts: Post[] = await Promise.all(response.data.map(async (post: Post) => {
          return await formatPost(post)
        }));

        // Combine previous posts with new posts and filter duplicates
        //@ts-ignore
        setPosts(prevItems => {
            const updatedPosts = [...prevItems, ...newPosts];
            const uniquePosts = Array.from(new Set(updatedPosts.map(post => post.ID)))
                .map(id => updatedPosts.find(post => post.ID === id));
            return uniquePosts; 
        });

        setHasMore(newPosts.length > 0); // Check if there's more data to load
        setPage(prevPage => prevPage + 1);
        const myUsername = "fots" //TODO load username on login
        setMyLikes(posts.map((post: Post) => 
            post.likes.some(like => like.username === myUsername)
        ));
      });
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]); 

  const like = async (id: number) => {
    try {
      await likePost(getToken(), id)
      /* from server */
      const response = await getPost(id)
      const likedPost: Post = response.data
      const updatedPosts = [...posts]
      updatedPosts[id - 1] = await formatPost(likedPost)
      myLikes[id - 1] = !myLikes[id - 1]

      /* from client 
      const loggedUser = sessionStorage.getItem('username')!!
      const updatedPosts = [...posts]
      if (!updatedPosts[index].likes.includes(loggedUser))
        updatedPosts[index].likes.push(loggedUser)
      else
        updatedPosts[index].likes.pop(loggedUser)
      */

      setPosts(updatedPosts)
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
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
          {posts.map(post => (
            <ClosedPostCard
              key={post.ID}
              post={post}
              likes={myLikes}
              comments={post.comments.length}
              toggleLike={() => like(post.ID)}
            />
          ))}
        </section>
        {loading && <Spinner aria-label='Loading...' color='warning' />}
      </main>
    </>
  )
}
