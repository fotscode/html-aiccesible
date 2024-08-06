'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import Card from '@/components/Card'
import { poppins } from '../fonts'
import React from 'react'
import Link from 'next/link'

export default function Accesibility() {
  const router = useRouter()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              if (typeof e.target?.result === 'string') {
                  localStorage.setItem('htmlCode', e.target.result);
                  router.push('/accesibility/editor');
              }
          };
          reader.readAsText(file); // Read file as text
      }
  };

  return (
    <>
      <Header />
      <main className='flex h-screen flex-col items-center py-8 px-4 sm:p-24 lg:p-32 gap-2 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center text-3xl md:text-6xl font-medium`}
        >
          Accesibilizá tu código
        </h1>
        <p className='text-left mx-3 mt-1 md:text-center md:text-xl xl:mb-12'>
          Podés cargar el código HTML de múltiples maneras.
        </p>
        <div className='flex flex-col md:flex-row'>
          <Link
            href='/accesibility/editor'
            className='card flex flex-row md:flex-col bg-secondary md:px-10 md:py-8 rounded-[20px] mx-3 my-3 md:max-w-[300px] cursor-pointer'
          >
            <Card
              title='Pegar código'
              description='Ingrese el código HTML en una casilla de texto.'
              image='/btn_new.png'
            />
          </Link>

          <input 
              type="file" 
              accept=".html" 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
              id="fileInput" 
          />
          <label htmlFor="fileInput" className='card flex flex-row md:flex-col bg-secondary md:px-10 md:py-8 rounded-[20px] mx-3 my-3 md:max-w-[300px] cursor-pointer'>
            <Card
              title='Cargar desde el equipo'
              description='Seleccione el archivo desde su computadora.'
              image='/btn_import.png'
            />
          </label>

          <Link
            href='/accesibility/importer'
            className='card flex flex-row md:flex-col md:px-10 md:py-8 bg-secondary rounded-[20px] mx-3 my-3 md:max-w-[300px] cursor-pointer'
          >
            <Card
              title='Examinar página web'
              description='Seleccione la URL de la página web a analizar.'
              image='/btn_link.png'
            />
          </Link>
        </div>
      </main>
    </>
  )
}
