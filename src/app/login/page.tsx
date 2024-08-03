'use client'

import { poppins, roboto } from '../fonts'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Card,
  CardBody,
  Input,
} from '@nextui-org/react'
import { addUser } from '@/components/ApiUser'

export default function LogIn() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError('');

    addUser(username, password)
    .then(response => {
      if (response.status === "Created") {
        router.push('/register/success');
      } else if (response.code === 400) {
          return response.json().then((errorResponse: any) => {
              setError(`Fallo: ${errorResponse.message}`);
          });
      } else {
          setError('Error inesperado');
      }
    })
    .catch(err => setError(`Error: ${err.message}`));
  };

  return (
    <>
      <main className='h-screen flex flex-col justify-center items-center py-8 px-4 sm:p-24 lg:p-32 gap-5 sm:gap-4 lg:gap-8'>
        <Card className='w-full md:w-3/4 2xl:w-1/2 p-5'>
          <CardBody className='px-1 sm:px-4'>
            <Input
              type='text'
              placeholder='Accesibilizador01'
              aria-label='Nombre de usuario'
              className='w-full md:w-[190px] lg:w-[320px] xl:w-[400px] 2xl:w-[400px]'
              labelPlacement='outside'
              aria-describedby='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              type='password'
              placeholder='Bananas1'
              aria-label='Contraseña'
              className='w-full md:w-[190px] lg:w-[320px] xl:w-[400px] 2xl:w-[400px]'
              labelPlacement='outside'
              aria-describedby='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          </CardBody>

          <div className='flex flex-col items-center'>
            <Button
              style={{
                backgroundColor: '#D14805',
                color: 'white',
              }}
              className='w-full md:w-1/2 sm:text-xl my-1 md:my-0 md:mx-1'
              onClick={handleSubmit}
            >
              Iniciar sesión 
            </Button>
            <p className='text-left mx-3 mt-2 md:text-center md:text-xl'>
              ¿Ya tenés una cuenta o no querés tener una? 
              &nbsp;
              <a href='/' 
              style={{ color: 'orangered' }}
              >
                Iniciá sesión o ingresá como invitado
              </a>
              .
            </p>
          </div>
        </Card>
      </main>
    </>
  )
}
