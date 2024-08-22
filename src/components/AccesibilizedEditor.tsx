import React from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'

interface EditorProps {
    label: string,
    func: (value: any) => void
}

const NonAccesibilizedEditor: React.FC<EditorProps> = ({
    label,
    func,
}) => {

  const {theme} = useTheme()


  return (
    <Editor
      className='border border-default py-0.5 rounded-b'
      theme={theme == 'light' ? 'light' : 'vs-dark'} 
      defaultLanguage='html'
      defaultValue='<!-- Código accesibilizado -->'
      onMount={(editor) => func(editor)}
      options={{ readOnly: true }}
      aria-describedBy={label}
      loading='Cargando...'
    />
  )
};

export default NonAccesibilizedEditor; 

