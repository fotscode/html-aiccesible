import { Button } from '@nextui-org/react'
import { poppins } from './fonts'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-center py-8 px-4 sm:p-24 lg:p-32 gap-2 sm:gap-4 lg:gap-8'>
      <h1
        className={`${poppins.className} text-center  text-4xl md:text-6xl lg:text-8xl font-bold`}
      >
        HTML <span style={{ color: '#D14805' }}>AI</span>ccesible
      </h1>
      <p className='text-center md:text-xl  xl:my-12'>
        Es una herramienta de inteligencia artificial que convierte
        automáticamente contenido HTML en formatos accesibles, siguiendo las
        pautas de accesibilidad web (WCAG).
      </p>

      <Button
        style={{
          backgroundColor: '#D14805',
          color: 'white',
        }}
        className='sm:px-20 sm:text-xl'
        as={Link}
        href='/selection'
      >
        Comenzar
      </Button>
    </main>
  )
}
