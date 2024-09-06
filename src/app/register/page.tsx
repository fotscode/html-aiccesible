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
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'

export default function Register() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const t = useTranslations('RegisterPage');


  const isInvalidUsername = React.useMemo(() => {
    if (username === "") return false;
    if (username.length < 4) return true;

    return false;
  }, [username]);

  const isInvalidPassword = React.useMemo(() => {
    if (password === "") return false;
    if (password.length < 8) return true;

    return false;
  }, [password]);

  const isInvalidRepeatedPassword = React.useMemo(() => {
    if (password != repeatedPassword) return true;

    return false;
  }, [repeatedPassword]);


  const handleSubmit = (e: any) => {
    e.preventDefault();

    addUser(username, password)
      .then(response => {
        if (response.status === "Created") {
          router.push('/register/success');
        } else if (response.code === 400) {
            return response.json().then((errorResponse: any) => {
                toast.error(t('error'));
                console.error(errorResponse.message)
            });
        } else {
            toast.error(t('server_error'));
        }
    })
    .catch(err => {
      toast.error(t('error'));
      console.error(err.message)
    });
  };

  return (
    <>
      <main className='h-screen flex flex-col justify-center items-center py-8 px-4 sm:p-24 lg:p-32 gap-5 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center font-size-title-adjust-3xl md:font-size-title-adjust-6xl font-medium`}
        >
          {t('title')}
        </h1>
        <p className='mx-3 mt-3 text-center md:font-size-text-adjust-xl xl:mb-12'>
          {t('subtitle')}
        </p>
        <Card className='w-full md:w-3/4 2xl:w-1/2 p-5'>
          <CardBody className='px-1 sm:px-4'>
            <form id='register-form' className='flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='flex flex-col md:flex-row items-center justify-between gap-2 py-2'>
                <p id='username' className={`${roboto.className} font-size-text-adjust-sm md:font-size-text-adjust-lg font-medium`}>
                  {t('username')}
                </p>
                <Input
                  type='text'
                  placeholder='Accesibilizador01'
                  aria-label={t('username')}
                  className='w-full md:w-[190px] lg:w-[320px] xl:w-[400px] 2xl:w-[400px]'
                  labelPlacement='outside'
                  variant="bordered"
                  isInvalid={isInvalidUsername}
                  color={isInvalidUsername ? "danger" : "success"}
                  errorMessage={t('username_constraint')}
                  aria-describedby='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className='flex flex-col md:flex-row items-center justify-between gap-2 py-2'>
                <p id='password' className={`${roboto.className} font-size-text-adjust-sm md:font-size-text-adjust-lg font-medium`}>
                  {t('password')}
                </p>
                <Input
                  type='password'
                  placeholder='Bananas1'
                  aria-label={t('password')}
                  className='w-full md:w-[190px] lg:w-[320px] xl:w-[400px] 2xl:w-[400px]'
                  labelPlacement='outside'
                  variant="bordered"
                  isInvalid={isInvalidPassword}
                  color={isInvalidPassword ? "danger" : "success"}
                  errorMessage={t('password_constraint')}
                  aria-describedby='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className='flex flex-col md:flex-row items-center justify-between gap-2 py-2'>
                <p id='repeatedPassword' className={`${roboto.className} font-size-text-adjust-sm md:font-size-text-adjust-lg font-medium`}>
                  {t('repeat_password')}
                </p>
                <Input
                  type='password'
                  placeholder='Bananas1'
                  aria-label={t('repeat_password')}
                  className='w-full md:w-[190px] lg:w-[320px] xl:w-[400px] 2xl:w-[400px]'
                  labelPlacement='outside'
                  variant="bordered"
                  isInvalid={isInvalidRepeatedPassword}
                  color={isInvalidRepeatedPassword ? "danger" : "success"}
                  errorMessage={t('repeat_password_constraint')}
                  aria-describedby='repeatedPassword'
                  value={repeatedPassword}
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                />
              </div>
            </form>
          </CardBody>
        </Card>
        <div className='flex flex-col items-center'>
          <Button
            form='register-form'
            isDisabled={isInvalidUsername || isInvalidPassword || isInvalidRepeatedPassword}
            className='button w-full md:w-1/2 sm:font-size-text-adjust-xl my-1 md:my-0 md:mx-1'
            type="submit"
          >
            {t('submit')}
          </Button>
          <p className='text-center mx-3 mt-2'>
            {t('link.first')}
            &nbsp;
            <a href='/login' className='link'>
              {t('link.second')}
            </a>
            &nbsp; {t('link.third')} &nbsp;
            <a href='/accesibility' className='link'>
              {t('link.fourth')}
            </a>
            .
          </p>
        </div>
      </main>
    </>
  )
}
