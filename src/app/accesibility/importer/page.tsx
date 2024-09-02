'use client'

import { Header } from '@/components/Header'
import Importer from '@/components/Importer'
import { poppins } from '../../fonts'
import React from 'react'
import { useTranslations } from 'next-intl'

export default function ImporterPage() {

  const t = useTranslations('ImporterPage')

  return (
    <>
      <Header />
      <main className='flex h-full flex-col items-center py-8 px-4 sm:p-24 gap-2 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center font-size-title-adjust-3xl md:font-size-title-adjust-6xl font-medium`}
        >
          {t('title')}
        </h1>
        <p className='mx-3 mt-1 text-center md:font-size-text-adjust-xl xl:mb-12'>
          {t('subtitle.first')}
          &nbsp;
          <a href='/accesibility' className='link'>
            {t('subtitle.second')}
          </a>
          &nbsp; {t('subtitle.third')}
        </p>
        <Importer/>
      </main>
    </>
  )
}
