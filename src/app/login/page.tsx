'use client'

import { poppins } from '../fonts'
import React, { useContext, useState } from 'react'
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
import { ConfigContext } from '../context/ConfigProvider'
import { setUserLocale } from '@/services/locale'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'

export default function LogIn() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { changesConfig, setChangesConfig } = useContext(ConfigContext);
  const t = useTranslations('LoginPage');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try{
      const savedUsername = username;
      const response = await loginUser(username, password);
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('username', savedUsername);
      setUserLocale(null); // clear cookies
      const returnUrl = searchParams.get('returnUrl') || '/accesibility';
      router.push(returnUrl);
      setChangesConfig(changesConfig + 1);
    } catch (error: any) {
      if(error.message === 'auth failed')
        toast.error(t('invalid_credentials'))
      else
        toast.error(t('error'))
      console.error(error.message)
    }
  };


  return (
    <>
      <main className='h-screen flex flex-col justify-center items-center py-8 px-4 sm:p-24 lg:p-32 gap-5 sm:gap-4 lg:gap-8'>
        <section className='flex items-center justify-center'>
          <Card className='w-full md:w-3/4 p-5'>
            <CardHeader className='flex justify-center'>
              <h1
                className={`${poppins.className} logo text-center font-size-title-adjust-3xl md:font-size-title-adjust-4xl lg:font-size-title-adjust-5xl font-bold`}
              >
                HTML <span className='text-primary'>AI</span>ccesible
              </h1>
            </CardHeader>
            <CardBody className='px-1 sm:px-4'>
              <form id='login-form' className='flex flex-col gap-2' onSubmit={handleSubmit}>
                <Input
                  type='text'
                  placeholder={t('username')}
                  aria-label={t('username')}
                  className='w-full'
                  variant='bordered'
                  labelPlacement='outside'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                  type='password'
                  placeholder={t('password')}
                  aria-label={t('password')}
                  className='w-full'
                  variant='bordered'
                  labelPlacement='outside'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
            </CardBody>

            <CardFooter className='flex flex-col items-center'>
              <Button
                form='login-form'
                className='button w-full md:w-1/2 sm:font-size-text-adjust-xl my-1 md:my-0 md:mx-1'
                type="submit"
              >
                {t('login')}
              </Button>
              <p className='mx-3 mt-2 text-center'>
                {t('link.first')}
                &nbsp;
                <a href='/register' className='link'>
                  {t('link.second')}
                </a>
                &nbsp; {t('link.third')} &nbsp;
                <a href='/accesibility' className='link'>
                  {t('link.fourth')}
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
