import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react'
import { roboto } from '@/app/fonts'
import { useState } from 'react'
import DOMPurify from 'dompurify';
import { fetchHtml } from './HtmlFetcher'

const Importer = () => {
  const router = useRouter()
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateUrl = (url: string) => ('https://' + url).match(/^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})([\/\w .-]*)*\/?$/);

  const isInvalidUrl = React.useMemo(() => {
    if (url === "") return false;

    return validateUrl(url) ? false : true;
  }, [url]);

  const fetchHTML = async () => {
      setError(''); 
      try {
        const data = await fetchHtml('https://' + url);
        const sanitizedHtml = DOMPurify.sanitize(data);
        console.log(sanitizedHtml)
        localStorage.setItem('htmlCode', sanitizedHtml);
        router.push('/accesibility/editor');
      } catch (error) {
          if (error instanceof Error) {
              setError('Error al leer la URL: ' + error.message);
          } else {
              setError('Ha ocurrido un error desconocido al intentar leer la URL.');
          }
      }
  };


  return (
    <Card className='flex flex-col w-3/4 md:w-1/2 sm:px-4 py-8 rounded-[10px] sm:mx-3 my-3 justify-self-center'>
      <CardHeader className='flex flex-col text-center'>
        <h2
          className={`${roboto.className} text-xl font-medium pb-3`}
        >
          Examinar página web
        </h2>
      </CardHeader>

      <CardBody className='flex flex-row justify-center py-5'>
        <Input
          type="url"
          aria-label='url del sitio web'
          label="Sitio web"
          placeholder="www.google.com"
          labelPlacement="outside"
          variant="bordered"
          isInvalid={isInvalidUrl}
          color={isInvalidUrl ? "danger" : "success"}
          errorMessage="Por favor, ingrese un enlace válido"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-[#55555E] text-small">https://</span>
            </div>
          }
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </CardBody>

      <CardFooter className='px-3 md:px-0 flex flex-col gap-1 sm:flex-row justify-center'>
        <Button
          className='button w-full md:w-auto sm:px-5 sm:mx-1 text-medium'
          onClick={fetchHTML}
          size='sm'
        >
          Obtener HTML
        </Button>
        <Button
          className='button w-full md:w-auto sm:px-5 sm:mx-1 text-medium'
          onClick={() => {router.back()}}
          size='sm'
        >
          Atrás
        </Button>
      </CardFooter>
      <section className='py-2 justify-center'>
        { error && (
          <p style={{color: 'red'}}>Ha ocurrido un error al intentar examinar la URL especificada</p>
        )}
      </section>
    </Card>
  )
}

export default Importer


