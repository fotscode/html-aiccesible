import React from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'

interface EditorProps {
    code: string,
    label: string,
}

const AccesibilizedEditor: React.FC<EditorProps> = ({
    code,
    label,
}) => {

  const {theme} = useTheme()


  return (
    <Editor
      className='border border-default py-0.5 rounded-b'
      theme={theme == 'light' ? 'light' : 'vs-dark'} 
      defaultLanguage='html'
      defaultValue='<!-- Código accesibilizado -->'
      value={code}
      options={{ readOnly: true }}
      aria-describedBy={label}
      loading='Cargando...'
    />
  )
};

export default AccesibilizedEditor; 

