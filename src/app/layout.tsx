import './globals.css'
import 'react-toastify/dist/ReactToastify.min.css';
import { NextUIProvider, Spinner } from '@nextui-org/react'
import { roboto } from './fonts'
import Providers from './context/Provider'
import { Suspense } from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import {getLocale, getMessages} from 'next-intl/server';
import RouteGuard from '@/components/RouteGuard'

 
export async function generateMetadata() {
  const t = await getTranslations('Layout');
 
  return {
    title: 'HTML AIccesible',
    description: t("description"),
  };
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${roboto.className} flex flex-col h-screen font-size-text-adjust-base`}>
        <Suspense fallback={<Spinner/>}>
          <NextIntlClientProvider messages={messages}>
            <NextUIProvider>
              <Providers>
                <RouteGuard>
                  {children}
                </RouteGuard>
              </Providers>
            </NextUIProvider>
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  )
}
