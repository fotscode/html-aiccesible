import type { Metadata } from 'next'
import './globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { roboto } from './fonts'
import Providers from './context/Provider'

export const metadata: Metadata = {
  title: 'HTML AIccesible',
  description:
    'Es una herramienta de inteligencia artificial que convierte automáticamente contenido HTML en formatos accesibles, siguiendo las pautas de accesibilidad web (WCAG).',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={`${roboto.className} flex flex-col h-screen font-size-text-adjust-base`}>
        <NextUIProvider>
          <Providers>
            {children}
          </Providers>
        </NextUIProvider>
      </body>
    </html>
  )
}
