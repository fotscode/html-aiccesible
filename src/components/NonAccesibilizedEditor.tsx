import React from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl';

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

  const t = useTranslations('NonAccesibilizedEditor')


  return (
    <Editor
      className='border border-default py-0.5 rounded-b'
      theme={theme == 'light' ? 'light' : 'vs-dark'} 
      defaultLanguage='html'
      defaultValue={`<!-- ${t('default')} -->`}
      value={code}
      onChange={(value) => setCode(value || '')}
      aria-labeledBy={label}
      loading={t('loading')}
    />
  )
};

export default NonAccesibilizedEditor; 

