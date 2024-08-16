import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { roboto } from '@/app/fonts'
import { useState } from 'react'
import DOMPurify from 'dompurify';
import { fetchHtml } from './HtmlFetcher'

const Importer = () => {
  const router = useRouter()
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');


  const fetchHTML = async () => {
      setError(''); 
      try {
        const data = await fetchHtml(url);
        const sanitizedHtml = DOMPurify.sanitize(data);
        console.log(sanitizedHtml)
        localStorage.setItem('htmlCode', sanitizedHtml);
        router.push('/accesibility/editor');
      } catch (error) {
          if (error instanceof Error) {
              setError('Error al leer la URL: ' + error.message);
          } else {
              setError('Ha ocurrido un error desconocido al intentar leer la URL.');
          }
      }
  };

  const backToMenu = () => {
    router.back()
  }

  return (
    <section className='flex flex-col bg-secondary sm:px-4 py-4 sm:py-8 rounded-[10px] sm:mx-3 my-3 justify-self-center'>
      <h2
        className={`${roboto.className} text-center card-title font-medium pb-3`}
      >
        Examinar página web
      </h2>

      <section className='search-bar flex flex-row justify-center py-5'>
        <img
          src='/link.png'
          alt='Examinar página web'
          className='md:pb-3 max-w-[40px]'
        />
        <div className='flex flex-col sm:w-full'>
          <input
            className='sm:w-full sm:px-2 py-1.5 outline-none text-base font-light'
            type='text'
            aria-label='url del sitio web'
            id='url'
            placeholder='https://www.google.com'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </section>

      <section className='px-3 md:px-0 flex flex-col gap-1 sm:flex-row justify-center'>
        <Button
          className='button sm:px-5 sm:mx-1 sm:text-xl'
          onClick={fetchHTML}
          style={{
            fontSize: '11pt',
            height: '30px',
          }}
        >
          Obtener código HTML
        </Button>
        <Button
          className='button sm:px-5 sm:mx-1 sm:text-xl'
          onClick={backToMenu}
          style={{
            fontSize: '11pt',
            height: '30px',
          }}
        >
          Atrás
        </Button>
      </section>
      <section className='py-2 justify-center'>
        { error && (
          <p style={{color: 'red'}}>Ha ocurrido un error al intentar examinar la URL especificada</p>
        )}
      </section>
    </section>
  )
}

export default Importer


