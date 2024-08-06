import React from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'

interface EditorProps {
    func: (value: any) => void
}

const NonAccesibilizedEditor: React.FC<EditorProps> = ({
    func,
}) => {

  const {theme} = useTheme()


  return (
    <Editor
      className='border border-black py-0.5 rounded-b'
      theme={theme == 'light' ? 'light' : 'vs-dark'} 
      defaultLanguage='html'
      defaultValue='// Código accesibilizado'
      onMount={(editor) => func(editor)}
      options={{ readOnly: true }}
    />
  )
};

export default NonAccesibilizedEditor; 

