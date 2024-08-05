import type { Metadata } from 'next'
import './globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { roboto } from './fonts'
import Providers from './context/ThemeProvider'
import ThemeSwitcher from '@/components/ThemeSwitcher'

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
        <Providers>
          <ThemeSwitcher>
            <NextUIProvider>{children}</NextUIProvider>
          </ThemeSwitcher>
        </Providers>
      </body>
    </html>
  )
}
