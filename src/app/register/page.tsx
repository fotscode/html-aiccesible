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
import { addUser } from '@/utils/ApiUser';

export default function Register() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatedPasswordError, setRepeatedPasswordError] = useState('');

  const validatePassword = (pass: string) => {
    if (pass.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const validateRepeatedPassword = (repeatedPass: string) => {
    if (password != repeatedPass) {
      setRepeatedPasswordError('La contraseña repetida no coincide con la primera.');
    } else {
      setRepeatedPasswordError('');
    }
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError('');

    if (password !== repeatedPassword) {
      setError('Las contraseñas no coinciden.');
    } else {
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
    }
  };

  return (
    <>
      <main className='h-screen flex flex-col justify-center items-center py-8 px-4 sm:p-24 lg:p-32 gap-5 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center text-3xl md:text-6xl font-medium`}
        >
          Registro de cuenta 
        </h1>
        <p className='mx-3 mt-3 text-center md:text-xl xl:mb-12'>
          Se solicitarán datos mínimos para poder publicar artículos a tu nombre.
        </p>
        <Card className='w-full md:w-3/4 2xl:w-1/2 p-5'>
          <CardBody className='px-1 sm:px-4'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-2 py-2'>
              <p id='username' className={`${roboto.className} text-sm md:text-lg font-medium`}>
                Nombre de usuario:
              </p>
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
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between gap-2 py-2'>
              <p id='password' className={`${roboto.className} text-sm md:text-lg font-medium`}>
                Contraseña:
              </p>
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
                  validatePassword(e.target.value);
                }}
              />
            </div>

            {passwordError && (
              <p className='text-center text-red-500 text-sm'>{passwordError}</p>
            )}

            <div className='flex flex-col md:flex-row items-center justify-between gap-2 py-2'>
              <p id='repeatedPassword' className={`${roboto.className} text-sm md:text-lg font-medium`}>
                Repetir contraseña:
              </p>
              <Input
                type='password'
                placeholder='Bananas1'
                aria-label='Repetir contraseña'
                className='w-full md:w-[190px] lg:w-[320px] xl:w-[400px] 2xl:w-[400px]'
                labelPlacement='outside'
                aria-describedby='repeatedPassword'
                value={repeatedPassword}
                onChange={(e) => {
                  setRepeatedPassword(e.target.value);
                  validateRepeatedPassword(e.target.value);
                }}
              />
            </div>
            {repeatedPasswordError && (
              <p className='text-center text-red-500 text-sm'>{repeatedPasswordError}</p>
            )}

            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          </CardBody>
        </Card>
        <div className='flex flex-col items-center'>
          <Button
            className='button w-full md:w-1/2 sm:text-xl my-1 md:my-0 md:mx-1'
            onClick={handleSubmit}
          >
            Registrar
          </Button>
          <p className='text-center mx-3 mt-2'>
            ¿Ya tenés una cuenta o no querés tener una? 
            &nbsp;
            <a href='/login' className='link'>
              Iniciá sesión 
            </a>
            &nbsp; o &nbsp;
            <a href='/accesibility' className='link'>
              ingresá como invitado
            </a>
            .
          </p>
        </div>
      </main>
    </>
  )
}
