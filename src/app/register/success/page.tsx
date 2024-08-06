'use client'

import { poppins, roboto } from '../../fonts'
import React from 'react'
import {
  Button,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function RegisterSuccess() {

  const router = useRouter();

  return (
    <>
      <main className='h-screen flex flex-col justify-center items-center py-8 px-4 sm:p-24 lg:p-32 gap-5 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center text-3xl md:text-6xl font-medium`}
        >
          Registro de cuenta exitoso
        </h1>
        <p className='mx-3 mt-3 text-center md:text-xl xl:mb-12'>
          Ahora podés 
          &nbsp;
          <a href='/' 
          style={{ color: '#8F3200' }}
          >
            iniciar sesión 
          </a>
          &nbsp; utilizando tu nombre de usuario y contraseña.
        </p>
        <Button
          style={{
            backgroundColor: '#D14805',
            color: 'white',
          }}
          className='w-full md:w-1/2 sm:text-xl my-1 md:my-0 md:mx-1'
          onClick={() => {router.push('/')}}
        >
          Volver a la página principal
        </Button>
      </main>
    </>
  )
}
