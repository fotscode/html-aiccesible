import React from 'react'
import { Button } from '@nextui-org/react'
import { roboto } from '@/app/fonts'
import Link from 'next/link'

interface Props {
  state: boolean
  setState: (val: boolean) => void
}

const Importer: React.FC<Props> = ({ state, setState }) => {
  const togglePopup = () => {
    setState(!state)
  }

  return (
    <section className='flex flex-col bg-gray-300 sm:px-4 py-4 sm:px-10 sm:py-8 rounded-[10px] sm:mx-3 my-3 md:max-w-[500px] justify-self-center'>
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
            type='text'
            aria-label='url del sitio web'
            id='url'
            placeholder='https://www.google.com'
            className='sm:w-full sm:px-2 py-1.5 outline-none text-base font-light'
          />
        </div>
      </section>

      <section className='px-3 md:px-0 flex flex-col gap-1 sm:flex-row justify-center'>
        <Button
          style={{
            backgroundColor: '#D14805',
            color: 'white',
            fontSize: '11pt',
            height: '30px',
          }}
          className='sm:px-5 sm:mx-1 sm:text-xl'
          as={Link}
          href='/selection/editor'
        >
          Obtener código HTML
        </Button>
        <Button
          style={{
            backgroundColor: '#D14805',
            color: 'white',
            fontSize: '11pt',
            height: '30px',
          }}
          className='sm:px-5 sm:mx-1 sm:text-xl'
          onClick={togglePopup}
        >
          Atrás
        </Button>
      </section>
    </section>
  )
}

export default Importer
