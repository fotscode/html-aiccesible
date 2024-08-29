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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { useEffect, useMemo, useState, useContext } from 'react'
import { isLoggedIn, getToken } from '@/utils/auth'
import { getConfig, updateConfig } from '@/utils/ApiConfig'
import { ConfigContext, defaultConfig, defaultConfigKeys } from '../context/ConfigProvider'


export default function Config() {

  const [selectedKeysTheme, setSelectedKeysTheme] = useState(new Set([defaultConfigKeys.theme]))

  const selectedTheme = useMemo(
    () => Array.from(selectedKeysTheme).join(', ').replaceAll('_', ' '),
    [selectedKeysTheme],
  )

  const [selectedKeysLanguage, setSelectedKeysLanguage] = useState(
    new Set([defaultConfigKeys.language]),
  )
  const selectedLanguage = useMemo(
    () => Array.from(selectedKeysLanguage).join(', ').replaceAll('_', ' '),
    [selectedKeysLanguage],
  )

  const [selKeysShowLikes, setSelKeysShowLikes] = useState(new Set([defaultConfigKeys.show_likes]))
  const showLikes = useMemo(
    () => Array.from(selKeysShowLikes).join(', ').replaceAll('_', ' '),
    [selKeysShowLikes],
  )

  const [selKeysShowComments, setSelKeysShowComments] = useState(
    new Set([defaultConfigKeys.show_comments]),
  )
  const showComments = useMemo(
    () => Array.from(selKeysShowComments).join(', ').replaceAll('_', ' '),
    [selKeysShowComments],
  )

  const [sizeTitles, setSizeTitles] = useState<string>(defaultConfigKeys.title_size);

  const [sizeText, setSizeText] = useState<string>(defaultConfigKeys.text_size);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  const { changesConfig, setChangesConfig } = useContext(ConfigContext);

  const modalReset = useDisclosure();
  const modalApply = useDisclosure();

  const applyConfig = (config: Config) => {

    //THEME
    setSelectedKeysTheme(new Set([config.theme]));

    //LANGUAGE
    setSelectedKeysLanguage(new Set([config.language]));

    //LIKES 
    if (config.show_likes === true)
      setSelKeysShowLikes(new Set(['likes-yes']));
    else 
      setSelKeysShowLikes(new Set(['likes-no']));

    //COMMENTS
    if (config.show_comments === true)
      setSelKeysShowComments(new Set(['comments-yes']));
    else 
      setSelKeysShowComments(new Set(['comments-no']));

    //TITLES
    setSizeTitles(`${config.size_title}`);

    //TEXT
    setSizeText(`${config.size_text}`);

  }

  useEffect(() => {
    if (isLoggedIn()){
      try {
        getConfig(getToken()).then((response) => {
          applyConfig(response.data as Config);
        });
      } catch (error: any) {
        setError(`Error: ${error.message}`);
      } 
    } else {
      if (!!localStorage.getItem('config')){ 
        const config: Config = JSON.parse(localStorage.getItem('config')!!);
        applyConfig(config);
      }
    }
    setLoading(false);
  }, []);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');


    const show_likes = selKeysShowLikes.values().next().value;
    const show_comments = selKeysShowComments.values().next().value;
    const theme = selectedKeysTheme.values().next().value;
    const language = selectedKeysLanguage.values().next().value;
    const size_title = +sizeTitles ;
    const size_text = +sizeText;

    const newConfig: Config = {
      show_likes: show_likes == 'likes-yes',
      show_comments: show_comments == 'comments-yes',
      theme: theme,
      language: language,
      size_title: size_title,
      size_text: size_text,
    };

    try {
      if (isLoggedIn()) {
        await updateConfig(getToken(), newConfig);
      } else {
        localStorage.setItem('config', JSON.stringify(newConfig));
      }
      setSuccess('Los cambios se han guardado con éxito');
      setChangesConfig(changesConfig + 1);

    } catch (error: any) {
      setError(`Error: ${error.message}`);
    }
  };

  const resetConfig = () => {

    //THEME
    setSelectedKeysTheme(new Set([defaultConfigKeys.theme]));
    //LANGUAGE
    setSelectedKeysLanguage(new Set([defaultConfigKeys.language]));
    //LIKES 
    setSelKeysShowLikes(new Set([defaultConfigKeys.show_likes]));
    //COMMENTS
    setSelKeysShowComments(new Set([defaultConfigKeys.show_comments]));
    //TITLES
    setSizeTitles(defaultConfigKeys.title_size);
    //TEXT
    setSizeText(defaultConfigKeys.text_size);

    if (isLoggedIn()) {
      try{
        updateConfig(getToken(), defaultConfig);
        setSuccess('La configuración ha sido restaurada con éxito');
      } catch (error: any) {
        setError(`Error: ${error.message}`);
      }
    } else {
      localStorage.removeItem('config');
      setSuccess('La configuración ha sido restaurada con éxito');
    }
    setChangesConfig(changesConfig + 1);

  }


  return (
    <>
      <Header />
      <main className='flex flex-col h-full justify-center items-center gap-5 mx-5 my-5 font-size-text-adjust'>
        <Card className='w-full lg:w-3/4 xl:w-1/2 md:p-5'>
          <CardHeader className='flex flex-col'>
            <h1 className={`${poppins.className} font-size-title-adjust text-2xl sm:text-3xl`}>
              Configuración
            </h1>
            <p className='text-center text-lg sm:text-xl'>
              Toda la configuración del sistema en un mismo lugar.
            </p>
          </CardHeader>
          {loading ? (
            <div className='flex justify-center items-center h-[400px]'>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
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
                    <DropdownItem key='light'>Claro</DropdownItem>
                    <DropdownItem key='dark'>Oscuro</DropdownItem>
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
                    <DropdownItem key='es'>Español</DropdownItem>
                    <DropdownItem key='eng'>Inglés</DropdownItem>
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
                    <DropdownItem key='likes-yes'>Si</DropdownItem>
                    <DropdownItem key='likes-no'>No</DropdownItem>
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
                    <DropdownItem key='comments-yes'>Si</DropdownItem>
                    <DropdownItem key='comments-no'>No</DropdownItem>
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
                      <span className='text-small'>px</span>
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
                      <span className='text-small'>px</span>
                    </div>
                  }
                />
              </div>
              <Divider />
              {error && <p className="text-danger text-sm text-center mt-2">{error}</p>}
              {success && <p className="text-success text-sm text-center mt-2">{success}</p>}
            </CardBody>
          )}
          <CardFooter className='flex flex-col sm:flex-row gap-2 sm:gap-5 md:px-20 mt-2'>
            <Button className='button w-full' onPress={modalApply.onOpen}>Aplicar cambios</Button>
            <Modal 
              backdrop="opaque" 
              isOpen={modalApply.isOpen} 
              onOpenChange={modalApply.onOpenChange}
              classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Confirmar cambios</ModalHeader>
                    <ModalBody>
                      <p> 
                        ¿Desea aplicar los cambios en la configuración?
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button 
                        color="danger" 
                        variant="light" 
                        onPress={onClose}
                      >
                        Cancelar 
                      </Button>
                      <Button 
                        color="primary" 
                        onPress={() => {
                          console.log('Config updated');
                          const mockEvent = { preventDefault: () => {} };
                          handleSubmit(mockEvent);
                          modalApply.onClose();
                        }}
                      >
                        Aplicar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Button className='w-full' onPress={modalReset.onOpen}>Restaurar</Button>
            <Modal 
              backdrop="opaque" 
              isOpen={modalReset.isOpen} 
              onOpenChange={modalReset.onOpenChange}
              classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Restaurar configuración</ModalHeader>
                    <ModalBody>
                      <p> 
                        ¿Desea volver a la configuración por defecto?
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button 
                        color="danger" 
                        variant="light" 
                        onPress={onClose}
                      >
                        Cancelar 
                      </Button>
                      <Button 
                        color="primary" 
                        onPress={() => {
                          console.log('Config resetted.');
                          resetConfig();
                          modalReset.onClose();
                        }}
                      >
                        Restaurar 
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </CardFooter>
        </Card>
      </main>
    </>
  )
}
