import { Button } from '@nextui-org/react'
import { poppins } from './fonts'
import Link from 'next/link'
import { useTranslations } from 'next-intl'


export default function Home() {

  const t = useTranslations('HomePage');

  return (
    <main className='flex h-screen flex-col items-center justify-center py-8 px-4 sm:p-24 lg:p-32 gap-2 sm:gap-4 lg:gap-8'>
      <h1
        className={`${poppins.className} logo text-center font-size-title-adjust-4xl md:font-size-title-adjust-6xl lg:font-size-title-adjust-8xl font-bold`}
      >
        HTML <span className='text-primary'>AI</span>ccesible
      </h1>
      <p className='text-center md:font-size-text-adjust-xl  xl:my-12'>
        {t('subtitle')}
      </p>

      <section className='flex flex-col'>
        <div className='flex flex-col md:flex-row justify-center'>
          <Button
            className='button sm:px-20 sm:font-size-text-adjust-xl my-1 md:my-0 md:mx-1'
            as={Link}
            href='/login'
          >
            {t('login')}
          </Button>

          <Button
            className='button sm:px-20 sm:font-size-text-adjust-xl my-1 md:my-0 md:mx-1'
            as={Link}
            href='/accesibility'
          >
            {t('guest')}
          </Button>
        </div>
        <p className='text-left mx-3 mt-2 md:text-center md:font-size-text-adjust-xl'>
          {t('link.first')}
          &nbsp;
          <a href='/register' className='link'>
            {t('link.second')}
          </a>
          .
        </p>
      </section>
    </main>
  )
}
