import type { Metadata } from 'next'
import './globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { roboto } from './fonts'

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
      <body className={roboto.className}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  )
}
