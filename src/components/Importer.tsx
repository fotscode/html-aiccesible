import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react'
import { roboto } from '@/app/fonts'
import { useState } from 'react'
import DOMPurify from 'dompurify';
import { fetchHtml } from '@/utils/htmlFetcher'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'

const Importer = () => {
  const router = useRouter()
  const [url, setUrl] = useState<string>('');
  const t = useTranslations('Importer');

  const validateUrl = (url: string) => ('https://' + url).match(/^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})([\/\w .-]*)*\/?$/);

  const isInvalidUrl = React.useMemo(() => {
    if (url === "") return false;

    return validateUrl(url) ? false : true;
  }, [url]);

  const fetchHTML = async () => {
      try {
        const data = await fetchHtml('https://' + url);
        const sanitizedHtml = DOMPurify.sanitize(data);
        console.log(sanitizedHtml)
        localStorage.setItem('htmlCode', sanitizedHtml);
        router.push('/accesibility/editor');
      } catch (error) {
          toast.error(t('browse_error'));
          console.error(error)
      }
  };


  return (
    <Card className='flex flex-col w-3/4 md:w-1/2 sm:px-4 py-8 rounded-[10px] sm:mx-3 my-3 justify-self-center'>
      <CardHeader className='flex flex-col text-center'>
        <h2
          className={`${roboto.className} font-size-title-adjust-xl font-medium pb-3`}
        >
          {t('title')}
        </h2>
      </CardHeader>

      <CardBody className='flex flex-row justify-center py-5'>
        <Input
          type="url"
          aria-label={t('aria-label')}
          label={t('label')}
          placeholder="www.google.com"
          labelPlacement="outside"
          variant="bordered"
          isInvalid={isInvalidUrl}
          color={isInvalidUrl ? "danger" : "success"}
          errorMessage={t('error_input')}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-500 font-size-text-adjust-sm">https://</span>
            </div>
          }
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </CardBody>

      <CardFooter className='px-3 md:px-0 flex flex-col gap-1 sm:flex-row justify-center'>
        <Button
          className='button w-full md:w-auto sm:px-5 sm:mx-1 font-size-text-adjust-sm'
          onClick={fetchHTML}
        >
          {t('get')}
        </Button>
        <Button
          className='button w-full md:w-auto sm:px-5 sm:mx-1 font-size-text-adjust-sm'
          onClick={() => {router.back()}}
        >
          {t('back')}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Importer


