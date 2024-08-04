'use client'
import { Header } from '@/components/Header'
import { poppins, roboto } from '../fonts'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react'
import { useMemo, useState } from 'react'

export default function Config() {
  const [selectedKeysTheme, setSelectedKeysTheme] = useState(new Set(['claro']))

  const selectedTheme = useMemo(
    () => Array.from(selectedKeysTheme).join(', ').replaceAll('_', ' '),
    [selectedKeysTheme],
  )

  const [selectedKeysLanguage, setSelectedKeysLanguage] = useState(
    new Set(['Español']),
  )
  const selectedLanguage = useMemo(
    () => Array.from(selectedKeysLanguage).join(', ').replaceAll('_', ' '),
    [selectedKeysLanguage],
  )

  const [selKeysShowLikes, setSelKeysShowLikes] = useState(new Set(['Sí']))
  const showLikes = useMemo(
    () => Array.from(selKeysShowLikes).join(', ').replaceAll('_', ' '),
    [selKeysShowLikes],
  )

  const [selKeysShowComments, setSelKeysShowComments] = useState(
    new Set(['Sí']),
  )
  const showComments = useMemo(
    () => Array.from(selKeysShowComments).join(', ').replaceAll('_', ' '),
    [selKeysShowComments],
  )

  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center gap-5 mx-5 my-5'>
        <Card className='w-full lg:w-3/4 xl:w-1/2 md:p-5'>
          <CardHeader className='flex flex-col'>
            <h1 className={`${poppins.className} text-2xl sm:text-3xl`}>
              Configuración
            </h1>
            <p className='text-center text-lg sm:text-xl'>
              Toda la configuración del sistema en un mismo lugar.
            </p>
          </CardHeader>
          <CardBody className='px-20'>
            <Divider />
            <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
              <p className={`${roboto.className} text-lg font-medium`}>
                Tema del sitio:
              </p>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant='bordered' className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px] capitalize'>
                    {selectedTheme}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Tema del sitio'
                  variant='flat'
                  disallowEmptySelection
                  selectionMode='single'
                  selectedKeysTheme={selectedKeysTheme}
                  //@ts-ignore
                  onSelectionChange={setSelectedKeysTheme}
                >
                  <DropdownItem key='claro'>Claro</DropdownItem>
                  <DropdownItem key='oscuro'>Oscuro</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Divider />
            <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
              <p className={`${roboto.className} text-lg font-medium`}>
                Idioma:
              </p>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant='bordered' className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px] capitalize'>
                    {selectedLanguage}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Idioma del sitio'
                  variant='flat'
                  disallowEmptySelection
                  selectionMode='single'
                  selectedKeysTheme={selectedKeysLanguage}
                  //@ts-ignore
                  onSelectionChange={setSelectedKeysLanguage}
                >
                  <DropdownItem key='Español'>Español</DropdownItem>
                  <DropdownItem key='English'>Inglés</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Divider />
            <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
              <p className={`${roboto.className} text-lg font-medium`}>
                Mostrar likes:
              </p>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant='bordered' className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px] capitalize'>
                    {showLikes}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Mostrar likes'
                  variant='flat'
                  disallowEmptySelection
                  selectionMode='single'
                  selectedKeysTheme={selKeysShowLikes}
                  //@ts-ignore
                  onSelectionChange={setSelKeysShowLikes}
                >
                  <DropdownItem key='Si'>Si</DropdownItem>
                  <DropdownItem key='No'>No</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Divider />
            <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
              <p className={`${roboto.className} text-lg font-medium`}>
                Mostrar comentarios:
              </p>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant='bordered' className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px] capitalize'>
                    {showComments}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='Mostrar comentarios'
                  variant='flat'
                  disallowEmptySelection
                  selectionMode='single'
                  selectedKeysTheme={selKeysShowComments}
                  //@ts-ignore
                  onSelectionChange={setSelKeysShowComments}
                >
                  <DropdownItem key='Si'>Si</DropdownItem>
                  <DropdownItem key='No'>No</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Divider />
            <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
              <p
                id='titleSize'
                className={`${roboto.className} text-lg font-medium`}
              >
                Tamaño de títulos (en píxeles):
              </p>
              <Input
                type='number'
                placeholder='30'
                aria-label='Tamaño de títulos (en píxeles)'
                className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px]'
                labelPlacement='outside'
                aria-describedby='titleSize'
                endContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-black text-small'>px</span>
                  </div>
                }
              />
            </div>
            <Divider />
            <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
              <p
                id='textSize'
                className={`${roboto.className} text-lg font-medium`}
              >
                Tamaño de textos (en píxeles):
              </p>
              <Input
                aria-label={'Tamaño de textos (en píxeles)'}
                type='number'
                placeholder='20'
                className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px]'
                aria-describedby='textSize'
                labelPlacement='outside'
                endContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-black text-small'>px</span>
                  </div>
                }
              />
            </div>
            <Divider />
          </CardBody>
          <CardFooter className='flex flex-col sm:flex-row gap-5 md:px-20 mt-2'>
            <Button
              className='w-full'
              style={{ backgroundColor: '#D14805', color: '#FFFFFF' }}
            >
              Aplicar cambios
            </Button>
            <Button className='w-full'>Restaurar</Button>
          </CardFooter>
        </Card>
      </main>
    </>
  )
}
