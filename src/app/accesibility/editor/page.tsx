'use client'

import React, { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { poppins } from '../../fonts'
import { Header } from '@/components/Header'
import { Button } from '@nextui-org/react'
import { html } from 'js-beautify'
import { listModels, accesibilizeCode } from '@/components/ApiModels'
import Dropdown from '@/components/Dropdown'

export default function CodeEditor() {
  const [editorAccesibilized, setEditorAccesibilized] = useState(null)

  const [isAccesibilizePressed, setIsAccesibilizePressed] = useState(false)

  const [code, setCode] = useState<string>('')

  const [models, setModels] = useState<{ value: string; label: string }[]>([])

  const [selectedModel, setSelectedModel] = useState<string>('')

  const beautifyHTML = (code: string): string => {
    return html(code, {
      indent_size: 2,
      indent_char: ' ',
      max_preserve_newlines: 0,
      preserve_newlines: false,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: 'normal',
      brace_style: 'collapse',
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: false,
      wrap_line_length: 0,
      indent_inner_html: false,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false,
    })
  }

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
          value: model,
          label: model,
        }))
        setModels(formattedModels)
        if (formattedModels.length > 0) {
          setSelectedModel(formattedModels[0].value)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    loadModels()
  }, []) // Empty dependency array ensures this runs only once

  const accesibilize = async () => {
    try {
      const responseBody = await accesibilizeCode(selectedModel, code)
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
            // @ts-ignore
            editorAccesibilized.setValue(accesibilizedContent) // Update editor
          }
        }
      }
    } catch (error) {
      setIsAccesibilizePressed(true)
      console.error('Error sending code:', error)
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      console.log('Texto copiado en el portapapeles')
    } catch (err) {
      console.error('Fallo al copiar: ', err)
    }
  }

  return (
    <>
      <Header />
      <main className='flex h-screen flex-col justify-center px-4 sm:p-24 lg:p-20 gap-2 sm:gap-4 lg:gap-8'>
        <h1
          className={`${poppins.className} text-center text-3xl md:text-6xl font-medium`}
        >
          Accesibilizador
        </h1>
        <p className='text-left mx-3 mt-1 md:text-center md:text-xl'>
          Verificá que el código cargado es el deseado y presioná el botón
          naranja para accesibilizarlo. Podés &nbsp;
          <a href='/accesibility' style={{ color: 'orangered' }}>
            elegir otra opción de carga
          </a>
          &nbsp; del código HTML.
        </p>

        <div className='flex flex-col items-center justify-center w-full'>
          <h2 className={`${poppins.className} text-center`}>
            Elegí el modelo de IA
          </h2>
          <Dropdown
            models={models}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        </div>

        <div className='flex flex-row w-full h-screen justify-center items-center'>
          <div className='flex flex-col h-full w-full hidden md:flex'>
            <label
              htmlFor='code-results-big'
              className={
                poppins.className + ' text-xl md:text-2xl font-semibold mb-2'
              }
            >
              Código a accesibilizar
            </label>

            <Editor
              className='border border-black py-0.5 rounded-b'
              theme='vs-light'
              defaultLanguage='html'
              defaultValue='// Copia tu código aquí'
              value={code}
              onChange={(value) => setCode(value || '')}
            />
          </div>

          <button
            className='flex flex-col items-center px-10 hidden md:flex text-medium md:text-xl font-medium mt-5'
            onClick={accesibilize}
          >
            <img
              src='/btn_start.png'
              alt='AIccesibilizar'
              className='min-w-[80px] w-3'
            />
            AIccesibilizar
          </button>

          <div className='flex flex-col h-full w-full hidden md:flex'>
            <label
              htmlFor='code-results-big'
              className={
                poppins.className + ' text-xl md:text-2xl font-semibold mb-2'
              }
            >
              Resultado
            </label>
            <Editor
              className='border border-black py-0.5 rounded-b'
              theme='vs-light'
              defaultLanguage='html'
              defaultValue='// Código accesibilizado'
              onMount={(editor) => setEditorAccesibilized(editor)}
              options={{ readOnly: true }}
            />
          </div>

          <div className='flex flex-col h-full w-full md:hidden'>
            <div className='card flex flex-row bg-neutral-900 px-6 py-2 rounded-t-[20px] mt-3 w-full md:hidden justify-between'>
              <Button
                style={{
                  backgroundColor: '#D14805',
                  color: 'white',
                  fontSize: '11pt',
                  height: '30px',
                }}
                className='sm:px-5 mx-1 sm:text-xl font-medium'
                onClick={accesibilize}
              >
                AIccesibilizar
              </Button>

              <button
                className='w-8'
                onClick={copyCode}
                disabled={code.length == 0}
              >
                <img
                  src='/btn_copy.png'
                  alt='Copy code'
                  className='rounded-md'
                />
              </button>
            </div>

            {!isAccesibilizePressed ? (
              <div className='h-full w-full'>
                <Editor
                  className='border border-black py-0.5 rounded'
                  theme='vs-light'
                  defaultLanguage='html'
                  defaultValue='// Copia tu código aquí'
                  options={{ readOnly: false }}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                />
              </div>
            ) : (
              <div className='h-full w-full'>
                <Editor
                  className='border border-black py-0.5 rounded'
                  theme='vs-light'
                  defaultLanguage='html'
                  defaultValue='// Código accesibilizado'
                  onMount={(editor) => setEditorAccesibilized(editor)}
                  options={{ readOnly: true }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
