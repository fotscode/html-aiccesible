import { Button } from '@nextui-org/react'
import { poppins } from './fonts'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center py-8 px-4 sm:p-24 lg:p-96'>
      <h1
        className={`${poppins.className} text-center  text-4xl md:text-6xl lg:text-8xl font-bold`}
      >
        HTML <span style={{ color: '#E44D25' }}>AI</span>ccesible
      </h1>
      <p className='text-center md:text-xl mt-4'>
        Es una herramienta de inteligencia artificial que convierte
        automáticamente contenido HTML en formatos accesibles, siguiendo las
        pautas de accesibilidad web (WCAG).
      </p>

      <Button
        style={{
          backgroundColor: '#E44D25',
          color: 'white',
          marginTop: '20px',
        }}
        className='sm:px-20 sm:text-xl'
      >
        Comenzar
      </Button>
    </main>
  )
}
