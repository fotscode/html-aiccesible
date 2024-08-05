'use client'
import { Header } from '@/components/Header'
import { poppins, roboto } from '../fonts'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { isLoggedIn, getToken } from '@/utils/auth'
import { getConfig, updateConfig } from '@/utils/ApiConfig'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

//TODO add logic for storing config for guest users
//TODO add logic for all the parameters

export default function Config() {
  const [selectedKeysTheme, setSelectedKeysTheme] = useState(new Set(['Claro']))

  const selectedTheme = useMemo(
    () => Array.from(selectedKeysTheme).join(', ').replaceAll('_', ' '),
    [selectedKeysTheme],
  )

  const [selectedKeysLanguage, setSelectedKeysLanguage] = useState(
    new Set(['Español']),
  )
  const selectedLanguage = useMemo(
    () => Array.from(selectedKeysLanguage).join(', ').replaceAll('_', ' '),
    [selectedKeysLanguage],
  )

  const [selKeysShowLikes, setSelKeysShowLikes] = useState(new Set(['Sí']))
  const showLikes = useMemo(
    () => Array.from(selKeysShowLikes).join(', ').replaceAll('_', ' '),
    [selKeysShowLikes],
  )

  const [selKeysShowComments, setSelKeysShowComments] = useState(
    new Set(['Sí']),
  )
  const showComments = useMemo(
    () => Array.from(selKeysShowComments).join(', ').replaceAll('_', ' '),
    [selKeysShowComments],
  )

  const [sizeTitles, setSizeTitles] = useState<string>('30');

  const [sizeText, setSizeText] = useState<string>('20');

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isLoggedIn()){
      try {
        getConfig(getToken()).then((response) => {

          //THEME
          if (response.data.theme === 'light')
            setSelectedKeysTheme(new Set(['claro']));
          else 
            setSelectedKeysTheme(new Set(['oscuro']));

          //LANGUAGE
          if (response.data.language === 'es')
            setSelectedKeysLanguage(new Set(['español']));
          else 
            setSelectedKeysLanguage(new Set(['inglés']));

          //LIKES 
          if (response.data.show_likes === true)
            setSelKeysShowLikes(new Set(['Sí']));
          else 
            setSelKeysShowLikes(new Set(['No']));

          //COMMENTS
          if (response.data.show_comments === true)
            setSelKeysShowComments(new Set(['Sí']));
          else 
            setSelKeysShowComments(new Set(['No']));

          //TITLES
          setSizeTitles(`${response.data.size_title}`);

          //TEXT
          setSizeText(`${response.data.size_text}`);
        });
      } catch (error: any) {
        setError(`Error: ${error.message}`);
      }
    }
    setLoading(false);
  }, []);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    const show_likes = selKeysShowLikes.values().next().value;
    const show_comments = selKeysShowComments.values().next().value;
    const theme = selectedKeysTheme.values().next().value;
    const language = selectedKeysLanguage.values().next().value;
    const size_title = +sizeTitles ;
    const size_text = +sizeText;

    try{
      const newConfig = {
        show_likes: show_likes == 'Sí' ? true : false,
        show_comments: show_comments == 'Sí' ? true : false,
        theme: theme == 'Claro' ? 'light' : 'dark',
        language: language == 'Español' ? 'es' : 'eng',
        size_title: size_title,
        size_text: size_text,
      };

      updateConfig(getToken(), newConfig);
      setSuccess('Los cambios se han guardado con éxito');
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    }
  };

  const resetConfig = () => {

    //THEME
    setSelectedKeysTheme(new Set(['claro']));
    //LANGUAGE
    setSelectedKeysLanguage(new Set(['español']));
    //LIKES 
    setSelKeysShowLikes(new Set(['No']));
    //COMMENTS
    setSelKeysShowComments(new Set(['No']));
    //TITLES
    const default_titles = 30;
    setSizeTitles(`${default_titles}`);
    //TEXT
    const default_text = 20;
    setSizeText(`${default_text}`);

    if (isLoggedIn()) {
      try{
        const newConfig = {
          show_likes: false,
          show_comments: false,
          theme: 'light',
          language: 'es',
          size_title: default_titles,
          size_text: default_text,
        };

        updateConfig(getToken(), newConfig);
        setSuccess('La configuración ha sido restaurada con éxito');
      } catch (error: any) {
        setError(`Error: ${error.message}`);
      }
    }

  }

  const applyChanges = () => {
    confirmAlert({
      title: 'Confirmar cambios',
      message: '¿Desea aplicar los cambios en la configuración?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            console.log('Config updated');
            handleSubmit;
          },
          style: {
            backgroundColor: '#D14805',
            color: 'white',
          }
        },
        {
          label: 'No',
          onClick: () => console.log('User canceled apply changes'),
          style: {
            backgroundColor: '#D14805',
            color: 'white',
          }
        }
      ]
    });
  }

  const confirmReset = () => {
    confirmAlert({
      title: 'Restaurar configuración',
      message: '¿Desea volver a la configuración por defecto?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            console.log('Config resetted.');
            resetConfig();
          },
          style: {
            backgroundColor: '#D14805',
            color: 'white',
          }
        },
        {
          label: 'No',
          onClick: () => console.log('User canceled config reset'),
          style: {
            backgroundColor: '#D14805',
            color: 'white',
          }
        }
      ]
    });
  }

  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center gap-5 mx-5 my-5'>
        <Card className='w-full lg:w-3/4 xl:w-1/2 md:p-5'>
          <CardHeader className='flex flex-col'>
            <h1 className={`${poppins.className} text-2xl sm:text-3xl`}>
              Configuración
            </h1>
            <p className='text-center text-lg sm:text-xl'>
              Toda la configuración del sistema en un mismo lugar.
            </p>
          </CardHeader>
          {loading ? (
            <div className='flex justify-center items-center h-[400px]'>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#D14805]"></div>
            </div>
          ) : (
            <CardBody className='px-20'>
              <Divider />
              <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
                <p className={`${roboto.className} text-lg font-medium`}>
                  Tema del sitio:
                </p>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant='bordered' className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px] capitalize'>
                      {selectedTheme}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label='Tema del sitio'
                    variant='flat'
                    disallowEmptySelection
                    selectionMode='single'
                    selectedKeysTheme={selectedKeysTheme}
                    //@ts-ignore
                    onSelectionChange={setSelectedKeysTheme}
                  >
                    <DropdownItem key='Claro'>Claro</DropdownItem>
                    <DropdownItem key='Oscuro'>Oscuro</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Divider />
              <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
                <p className={`${roboto.className} text-lg font-medium`}>
                  Idioma:
                </p>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant='bordered' className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px] capitalize'>
                      {selectedLanguage}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label='Idioma del sitio'
                    variant='flat'
                    disallowEmptySelection
                    selectionMode='single'
                    selectedKeysTheme={selectedKeysLanguage}
                    //@ts-ignore
                    onSelectionChange={setSelectedKeysLanguage}
                  >
                    <DropdownItem key='Español'>Español</DropdownItem>
                    <DropdownItem key='English'>Inglés</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Divider />
              <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
                <p className={`${roboto.className} text-lg font-medium`}>
                  Mostrar likes:
                </p>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant='bordered' className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px] capitalize'>
                      {showLikes}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label='Mostrar likes'
                    variant='flat'
                    disallowEmptySelection
                    selectionMode='single'
                    selectedKeysTheme={selKeysShowLikes}
                    //@ts-ignore
                    onSelectionChange={setSelKeysShowLikes}
                  >
                    <DropdownItem key='Si'>Si</DropdownItem>
                    <DropdownItem key='No'>No</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Divider />
              <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
                <p className={`${roboto.className} text-lg font-medium`}>
                  Mostrar comentarios:
                </p>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant='bordered' className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px] capitalize'>
                      {showComments}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label='Mostrar comentarios'
                    variant='flat'
                    disallowEmptySelection
                    selectionMode='single'
                    selectedKeysTheme={selKeysShowComments}
                    //@ts-ignore
                    onSelectionChange={setSelKeysShowComments}
                  >
                    <DropdownItem key='Si'>Si</DropdownItem>
                    <DropdownItem key='No'>No</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Divider />
              <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
                <p
                  id='titleSize'
                  className={`${roboto.className} text-lg font-medium`}
                >
                  Tamaño de títulos (en píxeles):
                </p>
                <Input
                  type='number'
                  placeholder='30'
                  value={sizeTitles}
                  onChange={(e) => setSizeTitles(e.target.value)}
                  aria-label='Tamaño de títulos (en píxeles)'
                  className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px]'
                  labelPlacement='outside'
                  aria-describedby='titleSize'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-black text-small'>px</span>
                    </div>
                  }
                />
              </div>
              <Divider />
              <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
                <p
                  id='textSize'
                  className={`${roboto.className} text-lg font-medium`}
                >
                  Tamaño de textos (en píxeles):
                </p>
                <Input
                  aria-label={'Tamaño de textos (en píxeles)'}
                  type='number'
                  value={sizeText}
                  onChange={(e) => setSizeText(e.target.value)}
                  placeholder='20'
                  className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px]'
                  aria-describedby='textSize'
                  labelPlacement='outside'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-black text-small'>px</span>
                    </div>
                  }
                />
              </div>
              <Divider />
            </CardBody>
          )}
          <CardFooter className='flex flex-col sm:flex-row gap-5 md:px-20 mt-2'>
            <Button
              className='w-full'
              onClick={applyChanges}
              style={{ backgroundColor: '#D14805', color: '#FFFFFF' }}
            >
              Aplicar cambios
            </Button>
            <Button 
              className='w-full'
              onClick={confirmReset}
            >
              Restaurar
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  )
}
