'use client'

import { poppins } from '../fonts'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from '@nextui-org/react'
import { loginUser } from '@/utils/ApiUser';

export default function LogIn() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    try{
      const response = await loginUser(username, password);
      sessionStorage.setItem('token', response.data.token);
      const returnUrl = searchParams.get('returnUrl') || '/accesibility';
      router.push(returnUrl);
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    }
  };


  return (
    <>
      <main className='h-screen flex flex-col justify-center items-center py-8 px-4 sm:p-24 lg:p-32 gap-5 sm:gap-4 lg:gap-8'>
        <section className='flex items-center justify-center'>
          <Card className='w-full md:w-3/4 p-5'>
            <CardHeader className='flex justify-center'>
              <h1
                className={`${poppins.className} text-center text-3xl md:text-4xl lg:text-5xl font-bold`}
              >
                HTML <span style={{ color: '#D14805' }}>AI</span>ccesible
              </h1>
            </CardHeader>
            <CardBody className='px-1 sm:px-4'>
              <form id='login-form' onSubmit={handleSubmit}>
                <div className='py-2'>
                  <Input
                    type='text'
                    placeholder='Nombre de usuario'
                    aria-label='Nombre de usuario'
                    className='w-full border'
                    labelPlacement='outside'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className='py-2'>
                  <Input
                    type='password'
                    placeholder='Contraseña'
                    aria-label='Contraseña'
                    className='w-full border'
                    labelPlacement='outside'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </form>

              {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            </CardBody>

            <CardFooter className='flex flex-col items-center'>
              <Button
                form='login-form'
                style={{
                  backgroundColor: '#D14805',
                  color: 'white',
                }}
                className='w-full md:w-1/2 sm:text-xl my-1 md:my-0 md:mx-1'
                type="submit"
              >
                Iniciar sesión 
              </Button>
              <p className='mx-3 mt-2 text-center'>
                ¿Todavía no tenés una cuenta o no querés tener una?
                &nbsp;
                <a href='/register' 
                style={{ color: '#8F3200' }}
                >
                  Registrate
                </a>
                &nbsp; o &nbsp;
                <a href='/accesibility' 
                style={{ color: '#8F3200' }}
                >
                  ingresá como invitado
                </a>
                .
              </p>
            </CardFooter>
          </Card>
        </section>
      </main>
    </>
  )
}
