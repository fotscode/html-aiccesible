import React from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl';

interface EditorProps {
    code: string,
    label: string,
    setCode: ((value: string) => void) | null,
    readonly: boolean,
}

const CodeBlock: React.FC<EditorProps> = ({
    code,
    label,
    setCode,
    readonly
}) => {

  const {theme} = useTheme()
  const t = useTranslations('AccesibilizedEditor')


  return (
    <Editor
      className='border border-default py-0.5 rounded-lg'
      theme={theme == 'light' ? 'light' : 'vs-dark'} 
      defaultLanguage='html'
      value={code}
      options={{ readOnly: readonly }}
      onChange={(value) => { 
        if (setCode)
          setCode(value || '')
      }}
      aria-describedBy={label}
      loading={t('loading')}
    />
  )
};

export default CodeBlock; 

