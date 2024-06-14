"use client"

import { poppins } from '../../fonts';
import { Header } from '@/components/Header'
import { Button } from '@nextui-org/react'
import { roboto } from '@/app/fonts'

export default function Editor() {

  const changeTextArea = () => {
  };

  return(
    <>
      <Header />
      <main className='flex h-screen flex-col items-center justify-center py-8 px-4 sm:p-24 lg:p-32 gap-2 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center text-3xl md:text-6xl font-medium`}
        >
        Editor de texto
        </h1>

        <div className='flex flex-row w-full h-screen justify-center items-center'>
          <div className='flex flex-col py-8 h-full w-full'>
            <label htmlFor="code-input" className='text-xl md:text-2xl font-medium hidden md:flex'>
              Código ingresado
            </label>

            <div className='card flex flex-row bg-neutral-900 px-5 py-2 rounded-t-[20px] mt-3 w-full md:hidden'>

              <Button
                style={{
                  backgroundColor: '#E44D25',
                  color: 'white',
                  fontSize: '11pt',
                  height: '30px',
                }}
                className='sm:px-5 mx-1 sm:text-xl font-medium'
                onClick={changeTextArea}
              >
                AIccesibilizar
              </Button>
            </div>

            <textarea
              id="code-input"
              className='w-full h-full p-2 text-gray-600 border border-gray-300 rounded-b-md lg:rounded-t-md resize-none placeholder:text-gray-400'
              placeholder="Ingrese código HTML..."
            />
          </div>
          <div className='flex flex-col items-center px-10 hidden md:flex'>
            <img src="/btn_start.png" alt="AIccesibilizar" className='min-w-[80px] w-3' />
            <h2 className='text-medium md:text-xl font-medium mt-5'>
            AIccesibilizar
            </h2>
          </div>
          <div className='flex flex-col py-8 h-full w-full hidden md:flex'>
            <label htmlFor="code-input" className='text-xl md:text-2xl font-medium'>
              Resultado
            </label>
            <textarea
              id="code-results"
              className='w-full h-full p-2 text-gray-600 border border-gray-300 rounded-md resize-none placeholder:text-gray-400'
              placeholder="Resultado..."
            />
          </div>
        </div>

      </main>
    </>
  )
}
