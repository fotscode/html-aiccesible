import React from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl';

interface EditorProps {
    code: string,
    label: string,
}

const AccesibilizedEditor: React.FC<EditorProps> = ({
    code,
    label,
}) => {

  const {theme} = useTheme()
  const t = useTranslations('AccesibilizedEditor')


  return (
    <Editor
      className='border border-default py-0.5 rounded-b'
      theme={theme == 'light' ? 'light' : 'vs-dark'} 
      defaultLanguage='html'
      defaultValue={`<!-- ${t('default')} -->`}
      value={code}
      options={{ readOnly: true }}
      aria-describedBy={label}
      loading={t('loading')}
    />
  )
};

export default AccesibilizedEditor; 

