import { poppins } from '../../fonts';
import { Header } from '@/components/Header'

export default function Editor() {
  return(
    <>
      <Header />
      <main className='flex h-screen flex-col items-center justify-center py-8 px-4 sm:p-24 lg:p-32 gap-2 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center text-3xl md:text-6xl font-medium`}
        >
        Editor de texto
        </h1>

        <div className='flex flex-row w-full h-screen justify-center items-center'>
          <div className='flex flex-col py-8 h-full w-full'>
            <label htmlFor="code-input" className='text-xl md:text-2xl font-medium'>
              Código ingresado
            </label>
            <textarea
              id="code-input"
              className='w-full h-full p-2 text-gray-600 border border-gray-300 rounded-md resize-none placeholder:text-gray-400'
              placeholder="Ingrese código HTML..."
            />
          </div>
          <div className='flex flex-col items-center px-10 hidden lg:flex'>
            <img src="/btn_start.png" alt="AIccesibilizar" className='min-w-[80px] w-3' />
            <h2 className='text-medium md:text-xl font-medium mt-5'>
            AIccesibilizar
            </h2>
          </div>
          <div className='flex flex-col py-8 h-full w-full hidden lg:flex'>
            <label htmlFor="code-input" className='text-xl md:text-2xl font-medium'>
              Resultado
            </label>
            <textarea
              id="code-results"
              className='w-full h-full p-2 text-gray-600 border border-gray-300 rounded-md resize-none placeholder:text-gray-400'
              placeholder="Resultado..."
            />
          </div>
        </div>

      </main>
    </>
  )
}
