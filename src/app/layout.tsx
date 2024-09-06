import './globals.css'
import 'react-toastify/dist/ReactToastify.min.css';
import type { Metadata } from 'next'
import { NextUIProvider } from '@nextui-org/react'
import { roboto } from './fonts'
import Providers from './context/Provider'
import { Suspense } from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import RouteGuard from '@/components/RouteGuard'


export const metadata: Metadata = {
  title: 'HTML AIccesible',
  description:
    'Es una herramienta de inteligencia artificial que convierte automáticamente contenido HTML en formatos accesibles, siguiendo las pautas de accesibilidad web (WCAG).',
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
        <Suspense fallback={null}>
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
