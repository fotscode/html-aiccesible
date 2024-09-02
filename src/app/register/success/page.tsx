'use client'

import { poppins } from '../../fonts'
import React from 'react'
import {
  Button,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function RegisterSuccess() {

  const router = useRouter();

  const t = useTranslations('RegisterSuccessPage');

  return (
    <>
      <main className='h-screen flex flex-col justify-center items-center py-8 px-4 sm:p-24 lg:p-32 gap-5 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center font-size-title-adjust-3xl md:font-size-title-adjust-6xl font-medium`}
        >
          {t('title')}
        </h1>
        <p className='mx-3 mt-3 text-center md:font-size-text-adjust-xl xl:mb-12'>
          {t('subtitle.first')}
          &nbsp;
          <a href='/' className='link'>
            {t('subtitle.second')}
          </a>
          &nbsp; {t('subtitle.third')}
        </p>
        <Button
          className='button w-full md:w-1/2 sm:font-size-text-adjust-xl my-1 md:my-0 md:mx-1'
          onClick={() => {router.push('/')}}
        >
          {t('back')}
        </Button>
      </main>
    </>
  )
}
