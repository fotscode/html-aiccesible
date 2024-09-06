'use client'

import React, { useState, useEffect } from 'react'
import { poppins, roboto } from '../../fonts'
import { Header } from '@/components/Header'
import { Button, Card, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@nextui-org/react'
import { listModels, accesibilizeCode } from '@/utils/ApiModels'
import NonAccesibilizedEditor from '@/components/NonAccesibilizedEditor'
import AccesibilizedEditor from '@/components/AccesibilizedEditor'
import { FaWandMagicSparkles } from "react-icons/fa6";
import { PiBroomFill } from "react-icons/pi";
import { MdContentCopy } from "react-icons/md";
import BouncingDotsLoader from '@/components/BouncingDotsLoader'
import { toast } from 'react-toastify';
import PaginationDots from '@/components/PaginationDots'
import '@/styles/buttonAnimated.css';
import '@/styles/editorAnimated.css';
import { useTranslations } from 'next-intl'
import { beautifyHTML } from '@/utils/beautifier'

export default function CodeEditor() {
  const [isAccesibilizePressed, setIsAccesibilizePressed] = useState(false);

  const [isAccesibilizing, setIsAccesibilizing] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);

  const [direction, setDirection] = useState('');

  const [accesibilizeColor, setAccesibilizeColor] = useState('primary');

  const [code, setCode] = useState<string>('');

  const [codeAccesibilized, setCodeAccesibilized] = useState<string>('');

  const [models, setModels] = useState<{ key: string; label: string }[]>([]);

  const [selectedModel, setSelectedModel] = useState(new Set(['']));

  const t = useTranslations('EditorPage');


  useEffect(() => {
    if (typeof localStorage.getItem('htmlCode') === 'string') {
      const beautifiedCode = beautifyHTML(
        localStorage.getItem('htmlCode') as string,
      )
      setCode(beautifiedCode)
    }
    localStorage.removeItem('htmlCode')
  }, []) // Empty dependency array ensures this runs only once

  useEffect(() => {
    const loadModels = async () => {
      try {
        const models = await listModels()
        const formattedModels = models.data.map((model: string) => ({
          key: model,
          label: model,
        }))
        setModels(formattedModels)
        if (formattedModels.length > 0) 
          setSelectedModel(new Set([formattedModels[0].label]))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    loadModels()
  }, []) // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (accesibilizeColor != 'primary')
      setAccesibilizeColor('primary');
  }, [code])

  const accesibilize = async () => {
    setIsAccesibilizing(true);
    setCurrentPage(1);
    setCodeAccesibilized("")

    try {
      const responseBody = await accesibilizeCode(selectedModel.values().next().value, code)
      const reader = responseBody
        .pipeThrough(new TextDecoderStream())
        .getReader()
      setIsAccesibilizePressed(true)
      let accesibilizedContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }

        const data = value.split('\n')[1]?.slice(5)
        if (data) {
          const parsedData = JSON.parse(data)
          if (!parsedData.done) {
            accesibilizedContent += parsedData.response // Accumulate the response

            setCodeAccesibilized(accesibilizedContent)
          }
        }
      }

      setAccesibilizeColor('success');
      toast.success(t('toast_success'));
    } catch (error) {
      setIsAccesibilizePressed(true)
      setAccesibilizeColor('danger');
      console.error('Error sending code:', error)
      toast.error(t('toast_error'))
    }

    setIsAccesibilizing(false);
  }

  const copyCode = async (buttonId: string) => {
    try {
      let textToCopy;

      if (buttonId === 'accesibilizedButton') {
        textToCopy = codeAccesibilized;
      } else {
        textToCopy = code;
      }

      await navigator.clipboard.writeText(textToCopy);
      console.log('Texto copiado en el portapapeles');
      toast.info(t('toast_copy'), {
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Fallo al copiar: ', err);
    }
  }

  const clearCode = () => {
    setCode('')
  }


  return (
    <>
      <Header />
      <main className='h-full flex flex-col justify-center px-4 pt-10 lg:p-20 gap-2 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center font-size-title-adjust-4xl md:font-size-title-adjust-6xl font-medium`}
        >
          {t('title')}
        </h1>
        <p className='text-center mx-3 mt-1 md:font-size-text-adjust-xl'>
          {t('subtitle.first')} &nbsp; 
          <a href='/accesibility' className='link'>
            {t('subtitle.second')}
          </a>
          &nbsp; {t('subtitle.third')}
        </p>

        <div className='flex flex-col items-center justify-center w-full'>
          <h2 className={`${roboto.className} text-center font-size-title-adjust-base font-medium`}>
            {t('selector')}
          </h2>
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                className="capitalize font-size-title-adjust-base"
              >
                {selectedModel}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label={t('selector-aria')}
              variant="flat" 
              disallowEmptySelection 
              selectionMode="single" 
              items={models}
              selectedKeys={selectedModel} 
              //@ts-ignore
              onSelectionChange={setSelectedModel}
            >
              {(item) => (
                <DropdownItem
                  key={item.key}
                >
                  <p className='font-size-text-adjust-base'>{item.label}</p>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>

        <section className='flex flex-col xl:flex-row w-full h-[50vh] xl:h-[40vh] justify-center items-center'>
          <Card className='h-full w-full hidden xl:flex xl:flex-col'>
            <CardHeader className='flex flex-row px-6 py-2 rounded-t-[20px] w-full justify-between'>
              <h2
                id='code-nonaccesibilized-desktop'
                className={
                  poppins.className + 'font-size-title-adjust-xl md:font-size-title-adjust-2xl font-semibold'
                }
              >
                {t('nonaccesibilized.title')}
              </h2>

              <div className='flex flex-row gap-1'>
                {!isAccesibilizePressed && (
                  <Button isIconOnly aria-label={t('nonaccesibilized.button_clear')} variant='light' color='primary' className='font-size-text-adjust-sm' onPress={clearCode} disabled={code.length == 0}>
                    <PiBroomFill className='h-3/4 w-3/4'/>
                  </Button>
                )}
                <Button isIconOnly aria-label={t('nonaccesibilized.button_copy')} variant='light' color='primary' className='font-size-text-adjust-sm' onPress={() => copyCode('nonAccesibilizedButton')} disabled={code.length == 0}>
                  <MdContentCopy className='h-3/4 w-3/4'/>
                </Button>
              </div>
            </CardHeader>

            <NonAccesibilizedEditor code={code} setCode={setCode} label='code-nonaccesibilized-desktop'/>
          </Card>

          <div className='hidden xl:flex xl:flex-col text-medium lg:font-size-text-adjust-xl font-medium items-center justify-center px-5'>
            <Button 
              isIconOnly 
              className='h-32 w-32 p-2'
              spinner={<Spinner size='lg' color='default'/>} 
              //@ts-ignore
              color={accesibilizeColor}
              aria-label={t('accesibilize')}
              radius="full" 
              isLoading={isAccesibilizing}
              isDisabled={code == ''} 
              onPress={accesibilize}
            >
              <FaWandMagicSparkles className='text-primary-foreground w-1/2 h-1/2'/> 
            </Button>    
            <p className='mt-1'>{t('accesibilize')}</p>
          </div> 

          <Card className='h-full w-full hidden xl:flex xl:flex-col'>
            <CardHeader className='flex flex-row px-6 py-2 rounded-t-[20px] w-full justify-between'>
              <h2
                id='code-nonaccesibilized-desktop'
                className={
                  poppins.className + 'font-size-title-adjust-xl md:font-size-title-adjust-2xl font-semibold'
                }
              >
                {t('accesibilized.title')}
              </h2>

              <div className='flex flex-row gap-1'>
                <Button isIconOnly aria-label={t('accesibilized.button_copy')} variant='light' color='primary' className='font-size-text-adjust-sm' onPress={() => copyCode('accesibilizedButton')} disabled={code.length == 0}>
                  <MdContentCopy className='h-3/4 w-3/4'/>
                </Button>
              </div>
            </CardHeader>
            <AccesibilizedEditor code={codeAccesibilized} label='code-accesibilized-desktop'/>
          </Card>

          <Card className={`flex flex-col h-full w-full xl:hidden dots-container ${isAnimating ? direction : ''}`}>
            <CardHeader className='flex flex-row px-6 py-2 rounded-t-[20px] w-full xl:hidden justify-between'>
              {isAccesibilizing ? <BouncingDotsLoader/> : (
                currentPage == 0 ? (
                  <h2
                    id='code-nonaccesibilized-desktop'
                    className={
                      poppins.className + 'font-size-title-adjust-xl md:font-size-title-adjust-2xl font-semibold'
                    }
                  >
                    {t('nonaccesibilized.title')}
                  </h2>
                ) : (
                  <h2
                    id='code-nonaccesibilized-desktop'
                    className={
                      poppins.className + 'font-size-title-adjust-xl md:font-size-title-adjust-2xl font-semibold'
                    }
                  >
                    {t('accesibilized.title')}
                  </h2>
                )
              )}
              <div className='flex flex-row gap-1'>
                {currentPage == 0 && (
                  <Button isIconOnly aria-label={t('nonaccesibilized.button_clear')} variant='light' color='primary' className='font-size-text-adjust-sm' onPress={clearCode} disabled={code.length == 0}>
                    <PiBroomFill className='h-3/4 w-3/4'/>
                  </Button>
                )}
                <Button isIconOnly aria-label={currentPage == 0 ? t('nonaccesibilized.button_copy') : t('accesibilized.button_copy')} variant='light' color='primary' className='font-size-text-adjust-sm' onPress={() => copyCode(isAccesibilizePressed? "accesibilizedButton" : "nonAccesibilizedButton")} disabled={code.length == 0}>
                  <MdContentCopy className='h-3/4 w-3/4'/>
                </Button>
              </div>
            </CardHeader>


            <div className='h-full w-full'>
              {currentPage == 0 ? (
                <NonAccesibilizedEditor label='code-nonaccesibilized-mobile' code={code} setCode={setCode}/>
              ) : (
                <AccesibilizedEditor code={codeAccesibilized} label='code-accesibilized-mobile'/>
              )}
            </div>
          </Card>

          <div className='xl:hidden mt-5'>
            {currentPage == 0 && (
              <Button
                className={`button button-animated sm:px-5 mx-1 font-size-text-adjust-base sm:font-size-text-adjust-xl font-medium ${currentPage === 0 ? 'animate' : ''}`}                
                //@ts-ignore
                color={accesibilizeColor}
                aria-label={t('accesibilize')}
                onPress={accesibilize}
                endContent={<FaWandMagicSparkles className='text-primary-foreground'/>}
                isDisabled={code === ''} 
              >
                {t('accesibilize')}
              </Button>
            )}
            {isAccesibilizePressed && ! isAccesibilizing && (
              <div className='mt-2 flex justify-center'>
                <PaginationDots currentPage={currentPage} totalPages={2} setCurrentPage={setCurrentPage} setIsAnimating={setIsAnimating} setDirection={setDirection}/>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
