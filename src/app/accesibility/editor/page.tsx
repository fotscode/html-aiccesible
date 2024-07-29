'use client'

import React, { useState, useRef, useEffect } from 'react'
import { poppins } from '../../fonts'
import { Header } from '@/components/Header'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

export default function Editor() {
  const [code, setCode] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const codeRef = useRef<HTMLPreElement | null>(null);
  const [isAccesibilized, setIsAccesibilized] = useState(false)

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.textContent = code;
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const changeTextArea = () => {
    setIsAccesibilized(!isAccesibilized)
  }

  const copyCode = () => {}

  return (
    <>
      <Header />
      <main className='flex h-screen flex-col items-center justify-center py-8 px-4 sm:p-24 lg:p-32 gap-2 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center text-3xl md:text-6xl font-medium`}
        >
          Editor de texto
        </h1>
        <Button
          style={{
            backgroundColor: '#D14805',
            color: 'white',
            fontSize: '11pt',
          }}
          as={Link}
          href='/accesibility'
        >
          Volver Atrás
        </Button>

        <div className='flex flex-row w-full h-screen justify-center items-center'>
          <div className='flex flex-col py-8 h-full w-full hidden md:flex'>
            <pre className="lang-html"> 
              <code ref={codeRef} />
            </pre>
            <label
              htmlFor='code-input-big'
              className={
                poppins.className + ' text-xl md:text-2xl font-semibold mb-2'
              }
            >
              Código ingresado
            </label>
            <textarea
              id='code-input-big'
              className='w-full h-full p-2 text-gray-600 border border-gray-300 rounded-b-md lg:rounded-t-md resize-none placeholder:text-gray-400'
              value={code}
              placeholder='Ingrese código HTML...'
              ref={textareaRef}
              onChange={handleInputChange}
              spellCheck="false"
            />
          </div>

          <button className='flex flex-col items-center px-10 hidden md:flex text-medium md:text-xl font-medium mt-5'>
            <img
              src='/btn_start.png'
              alt='AIccesibilizar'
              className='min-w-[80px] w-3'
            />
            AIccesibilizar
          </button>
          <div className='flex flex-col py-8 h-full w-full hidden md:flex'>
            <label
              htmlFor='code-results-big'
              className={
                poppins.className + ' text-xl md:text-2xl font-semibold mb-2'
              }
            >
              Resultado
            </label>
            <textarea
              id='code-results-big'
              className='w-full h-full p-2 text-gray-600 border border-gray-300 rounded-md resize-none placeholder:text-gray-400'
              placeholder='Resultado...'
            />
          </div>

          <div className='flex flex-col py-8 h-full w-full md:hidden'>
            <div className='card flex flex-row bg-neutral-900 px-6 py-2 rounded-t-[20px] mt-3 w-full md:hidden justify-between'>
              <Button
                style={{
                  backgroundColor: '#D14805',
                  color: 'white',
                  fontSize: '11pt',
                  height: '30px',
                }}
                className='sm:px-5 mx-1 sm:text-xl font-medium'
                onClick={changeTextArea}
              >
                AIccesibilizar
              </Button>

              <div className='w-8' onClick={copyCode}>
                <img
                  src='/btn_copy.png'
                  alt='Copy code'
                  className='rounded-md'
                />
              </div>
            </div>

            {!isAccesibilized ? (
              <div className='w-full h-full'>
                <textarea
                  id='code-input-small'
                  aria-label='Código ingresado'
                  className='w-full h-full p-2 text-gray-600 border border-gray-300 rounded-b-md md:rounded-t-md resize-none placeholder:text-gray-400'
                  placeholder='Ingrese código HTML...'
                />
              </div>
            ) : (
              <div className='w-full h-full'>
                <textarea
                  id='code-results-small'
                  aria-label='Resultado'
                  className='w-full h-full p-2 text-gray-600 border border-gray-300 rounded-b-md md:rounded-t-md resize-none placeholder:text-gray-400'
                  placeholder='Resultado...'
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
