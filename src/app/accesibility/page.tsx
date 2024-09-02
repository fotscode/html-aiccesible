'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import OptionCard from '@/components/OptionCard'
import { poppins } from '../fonts'
import React from 'react'
import Link from 'next/link'
import { BiSolidFileHtml } from "react-icons/bi";
import { MdOpenInBrowser } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { useTranslations } from 'next-intl'

export default function Accesibility() {
  const router = useRouter()

  const t = useTranslations('AccesibilityPage');

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
      <main className='flex h-full flex-col items-center py-8 px-4 sm:p-24 lg:p-32 gap-2 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center font-size-title-adjust-3xl md:font-size-title-adjust-6xl font-medium`}
        >
          { t('title') }
        </h1>
        <p className='text-left mx-3 mt-1 md:text-center md:font-size-text-adjust-xl xl:mb-12'>
          { t('subtitle') }
        </p>
        <section className='flex flex-col md:flex-row'>
          <Link href='/accesibility/editor' passHref>
            <OptionCard
              title={t('paste.title')}
              description={t('paste.description')}
              Icon={BiSolidFileHtml}
              alt={t('paste.alt')}
            />
          </Link>

          <input 
              type="file" 
              accept=".html" 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
              id="fileInput" 
          />
          <label tabIndex={0} htmlFor="fileInput"> 
            <OptionCard
              title={t('load_file.title')}
              description={t('load_file.description')}
              Icon={MdOpenInBrowser}
              alt={t('load_file.alt')}
            />
          </label>

          <Link href='/accesibility/importer' passHref>
            <OptionCard
              title={t('load_url.title')}
              description={t('load_url.description')}
              Icon={FiLink}
              alt={t('load_url.alt')}
            />
          </Link>
        </section>
      </main>
    </>
  )
}
