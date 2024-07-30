'use client'

import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import { poppins } from '../../fonts'
import { Header } from '@/components/Header'
import { Button } from '@nextui-org/react'

export default function CodeEditor() {

  const [isAccesibilized, setIsAccesibilized] = useState(false)

  const [code, setCode] = useState<string>(typeof localStorage.getItem('htmlCode') === 'string' ? localStorage.getItem('htmlCode') as string : '');

  useEffect(() => {
    localStorage.removeItem('htmlCode')
  }, []); // Empty dependency array ensures this runs only once


  const changeTextArea = () => {
    setIsAccesibilized(!isAccesibilized)
  }

  const copyCode = () => {}

  return (
    <>
      <Header />
      <main className='flex h-screen flex-col items-center justify-center px-4 sm:p-24 lg:p-32 gap-2 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center text-3xl md:text-6xl font-medium`}
        >
          Accesibilizador
        </h1>
        <p className='text-left mx-3 mt-1 md:text-center md:text-xl xl:mb-12'>
          Verificá que el código cargado es el deseado y presioná el botón naranja para accesibilizarlo. 
          Podés &nbsp;
          <a href='/accesibility' 
          style={{ color: 'orangered' }}
          >
           elegir otra opción de carga 
          </a>
          &nbsp; del código HTML
        </p>

        <div className='flex flex-row w-full h-screen justify-center items-center'>
          <div className='flex flex-col h-full w-full hidden md:flex'>
            <label
              htmlFor='code-results-big'
              className={
                poppins.className + ' text-xl md:text-2xl font-semibold mb-2'
              }
            >
              Código a accesibilizar
            </label>
           <Editor
              theme="vs-light"
              defaultLanguage="html" 
              defaultValue="// Copia tu código aquí" 
              options={{readOnly:false}}
              value={code}
              onChange={(value) => setCode(value || '')}
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
          <div className='flex flex-col h-full w-full hidden md:flex'>
            <label
              htmlFor='code-results-big'
              className={
                poppins.className + ' text-xl md:text-2xl font-semibold mb-2'
              }
            >
              Resultado
            </label>
           <Editor
              theme="vs-light"
              defaultLanguage="html" 
              defaultValue="// Código accesibilizado" 
              options={{readOnly:true}}
            />
          </div>

          <div className='flex flex-col h-full w-full md:hidden'>
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
