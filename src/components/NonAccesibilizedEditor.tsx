import React from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'

interface EditorProps {
    code: string,
    setCode: (value: string) => void,
    label: string,
}

const NonAccesibilizedEditor: React.FC<EditorProps> = ({
    code,
    setCode,
    label,
}) => {

  const {theme} = useTheme()


  return (
    <Editor
      className='border border-black py-0.5 rounded-b'
      theme={theme == 'light' ? 'light' : 'vs-dark'} 
      defaultLanguage='html'
      defaultValue='// Copia tu código aquí'
      value={code}
      onChange={(value) => setCode(value || '')}
      aria-labeledBy={label}
    />
  )
};

export default NonAccesibilizedEditor; 

