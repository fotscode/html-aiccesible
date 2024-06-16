import { Poppins, Roboto } from 'next/font/google'

export const poppins = Poppins({
  weight: ['500', '700'],
  subsets: ['latin'],
  adjustFontFallback: false,
})

export const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  adjustFontFallback: false,
})
