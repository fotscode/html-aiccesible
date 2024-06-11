import { Header } from '@/components/Header'
import Card from '@/components/Card'
import { poppins } from '../fonts'

export default function Selection() {
  return (
    <>
      <Header />
      <main className='flex h-screen flex-col items-center justify-center py-8 px-4 sm:p-24 lg:p-32 gap-2 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center  text-4xl md:text-6xl lg:text-8xl font-medium`}
        >
        Código HTML a mejorar
        </h1>
        <p className='text-center md:text-xl  xl:my-12'>
          El código que será accesible puede cargarse de múltiples maneras.
        </p>
        <div className='flex flex-row'>

          <Card 
            title="Pegar código"
            description="Ingrese el codigo HTML en una casilla de texto."
            image="/btn_new.png"
          />
        </div>
      </main>
    </>
  )
}
