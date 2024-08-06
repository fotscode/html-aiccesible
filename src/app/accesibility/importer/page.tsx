'use client'

import { Header } from '@/components/Header'
import Importer from '@/components/Importer'
import { poppins } from '../../fonts'
import React from 'react'

export default function ImporterPage() {

  return (
    <>
      <Header />
      <main className='flex h-full flex-col items-center py-8 px-4 sm:p-24 lg:p-32 gap-2 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center text-3xl md:text-6xl font-medium`}
        >
          Importar código HTML vía URL
        </h1>
        <p className='text-left mx-3 mt-1 md:text-center md:text-xl xl:mb-12'>
          Querés usar otro método?
          Podés &nbsp;
          <a href='/accesibility' 
          style={{ color: 'orangered' }}
          >
           elegir otra opción de carga 
          </a>
          &nbsp; del código HTML.
        </p>
        <Importer/>
      </main>
    </>
  )
}
