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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Slider,
  Switch
} from '@nextui-org/react'
import { useEffect, useMemo, useState, useContext } from 'react'
import { isLoggedIn, getToken } from '@/utils/auth'
import { getConfig, updateConfig } from '@/utils/ApiConfig'
import { ConfigContext, defaultConfig } from '../context/ConfigProvider'
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Config() {

  const [selectedKeysTheme, setSelectedKeysTheme] = useState(new Set([defaultConfig.theme]))

  const selectedTheme = useMemo(
    () => Array.from(selectedKeysTheme).join(', ').replaceAll('_', ' '),
    [selectedKeysTheme],
  )

  const [selectedKeysLanguage, setSelectedKeysLanguage] = useState(
    new Set([defaultConfig.language]),
  )

  const selectedLanguage = useMemo(
    () => Array.from(selectedKeysLanguage).join(', ').replaceAll('_', ' '),
    [selectedKeysLanguage],
  )

  const [sizeTitles, setSizeTitles] = useState<number>(defaultConfig.size_title);

  const [sizeText, setSizeText] = useState<number>(defaultConfig.size_text);

  const [likes, setLikes] = useState<boolean>(defaultConfig.show_likes);

  const [comments, setComments] = useState<boolean>(defaultConfig.show_comments);

  const [loading, setLoading] = useState<boolean>(true);

  const { changesConfig, setChangesConfig } = useContext(ConfigContext);

  const modalReset = useDisclosure();
  const modalApply = useDisclosure();

  const t = useTranslations('ConfigPage');

  const applyConfig = (config: Config) => {

    //THEME
    setSelectedKeysTheme(new Set([config.theme]));

    //LANGUAGE
    setSelectedKeysLanguage(new Set([config.language]));

    //LIKES 
    setLikes(config.show_likes)

    //COMMENTS
    setComments(config.show_comments)

    //TITLES
    setSizeTitles(config.size_title);

    //TEXT
    setSizeText(config.size_text);

  }

  useEffect(() => {
    if (isLoggedIn()){
      try {
        getConfig(getToken()).then((response) => {
          applyConfig(response.data as Config);
        });
      } catch (error: any) {
        console.error(error.message);
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

    const newConfig: Config = {
      theme: selectedKeysTheme.values().next().value,
      language: selectedKeysLanguage.values().next().value,
      show_likes: likes,
      show_comments: comments,
      size_title: sizeTitles,
      size_text: sizeText,
    };

    try {
      if (isLoggedIn()) {
        await updateConfig(getToken(), newConfig);
      } else {
        localStorage.setItem('config', JSON.stringify(newConfig));
      }
      setChangesConfig(changesConfig + 1);
      toast.success(t('apply.toast_success'));

    } catch (error: any) {
      console.error(error.message);
      toast.error(t('apply.toast_error'));
    }
  };

  const resetConfig = () => {

    //THEME
    setSelectedKeysTheme(new Set([defaultConfig.theme]));
    //LANGUAGE
    setSelectedKeysLanguage(new Set([defaultConfig.language]));
    //LIKES 
    setLikes(defaultConfig.show_likes)
    //COMMENTS
    setComments(defaultConfig.show_comments)
    //TITLES
    setSizeTitles(defaultConfig.size_title);
    //TEXT
    setSizeText(defaultConfig.size_text);

    if (isLoggedIn()) {
      try{
        updateConfig(getToken(), defaultConfig);
        toast.success(t('restore.toast_success'))
      } catch (error: any) {
        console.error(error.message);
        toast.error(t('restore.toast_error'));
      }
    } else {
      localStorage.removeItem('config');
      toast.success(t('restore.toast_success'))
    }
    setChangesConfig(changesConfig + 1);

  }


  return (
    <>
      <Header />
      <main className='flex flex-col h-full justify-center items-center gap-5 mx-5 my-5 font-size-text-adjust'>
        <Card className='w-full lg:w-3/4 xl:w-1/2 md:p-5'>
          <CardHeader className='flex flex-col'>
            <h1 className={`${poppins.className} font-size-title-adjust-2xl sm:font-size-title-adjust-3xl`}>
              { t('title') }
            </h1>
            <p className='text-center font-size-text-adjust-lg sm:font-size-text-adjust-xl'>
              { t('subtitle') }
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
                <p className={`${roboto.className} font-size-text-adjust-lg font-medium`}>
                  { t('theme.label') }
                </p>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant='bordered' className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px] font-size-text-adjust-base capitalize'>
                      {selectedTheme == 'light' ? t('theme.light') : t('theme.dark')}
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
                    <DropdownItem key='light'><p className='font-size-text-adjust-base'>{t('theme.light')}</p></DropdownItem>
                    <DropdownItem key='dark'><p className='font-size-text-adjust-base'>{t('theme.dark')}</p></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Divider />
              <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
                <p className={`${roboto.className} font-size-text-adjust-lg font-medium`}>
                  { t('language.label') }
                </p>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant='bordered' className='w-full sm:w-[180px] md:w-[200px] lg:w-[250px] xl:w-[150px] 2xl:w-[250px] font-size-text-adjust-base capitalize'>
                      {selectedLanguage == 'es' ? t('language.es') : t('language.en')}
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
                    <DropdownItem key='es'><p className='font-size-text-adjust-base'>{t('language.es')}</p></DropdownItem>
                    <DropdownItem key='en'><p className='font-size-text-adjust-base'>{t('language.en')}</p></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Divider />
              <div className='flex flex-row items-center justify-between gap-2 py-2 sm:py-5'>
                <p className={`${roboto.className} font-size-text-adjust-lg font-medium`}>
                  { t('likes.label') }
                </p>
                <Switch color="primary" isSelected={likes} onChange={() => {setLikes(!likes)}} />
              </div>
              <Divider />
              <div className='flex flex-row items-center justify-between gap-2 py-2 sm:py-5'>
                <p className={`${roboto.className} font-size-text-adjust-lg font-medium`}>
                  { t('comments.label') }
                </p>
                <Switch color="primary" isSelected={comments} onChange={() => {setComments(!comments)}} />
              </div>
              <Divider />
              <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
                <Slider 
                  label={t('titles.label')}
                  aria-labelledby='slider-titles'
                  hideValue 
                  showTooltip={true}
                  step={0.1} 
                  formatOptions={{style: "percent"}}
                  maxValue={2}
                  minValue={0.5}
                  marks={[
                    {
                      value: 0.5,
                      label: "50%",
                    },
                    {
                      value: 1,
                      label: "100%",
                    },
                    {
                      value: 1.5,
                      label: "150%",
                    },
                    {
                      value: 2,
                      label: "200%",
                    },
                  ]}
                  defaultValue={1}
                  value={sizeTitles}
                  //@ts-ignore
                  onChange={(value) => setSizeTitles(value)}
                  className="w-full"
                  renderLabel={() => <p id='slider-titles' className={`${roboto.className} font-size-text-adjust-lg font-medium mb-2`}>{t('titles.label')}</p>}
                />
              </div>
              <Divider/>
              <div className='flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-5'>
                <Slider 
                  label={t('texts.label')}
                  aria-labelledby='slider-texts'
                  hideValue
                  showTooltip={true}
                  step={0.1} 
                  formatOptions={{style: "percent"}}
                  maxValue={2}
                  minValue={0.5}
                  marks={[
                    {
                      value: 0.5,
                      label: "50%",
                    },
                    {
                      value: 1,
                      label: "100%",
                    },
                    {
                      value: 1.5,
                      label: "150%",
                    },
                    {
                      value: 2,
                      label: "200%",
                    },
                  ]}
                  defaultValue={1}
                  value={sizeText}
                  //@ts-ignore
                  onChange={(value) => setSizeText(value)}
                  className="w-full"
                  renderLabel={() => <p id='slider-texts' className={`${roboto.className} font-size-text-adjust-lg font-medium mb-2`}>{t('texts.label')}</p>}
                />
              </div>
              <Divider />
            </CardBody>
          )}
          <CardFooter className='flex flex-col sm:flex-row gap-2 sm:gap-5 md:px-20 mt-2'>
            <Button className='button w-full font-size-text-adjust-sm' onPress={modalApply.onOpen}>{t('apply.button')}</Button>
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
                    <ModalHeader className="flex flex-col gap-1">{t('apply.header')}</ModalHeader>
                    <ModalBody>
                      <p> 
                        {t('apply.body')}
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button 
                        className='font-size-text-adjust-sm'
                        color="danger" 
                        variant="light" 
                        onPress={onClose}
                      >
                        {t('apply.cancel')}
                      </Button>
                      <Button 
                        className='font-size-text-adjust-sm'
                        color="primary" 
                        onPress={() => {
                          console.log('Config updated');
                          const mockEvent = { preventDefault: () => {} };
                          handleSubmit(mockEvent);
                          modalApply.onClose();
                        }}
                      >
                        {t('apply.apply')}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Button className='w-full font-size-text-adjust-sm' onPress={modalReset.onOpen}>{t('restore.button')}</Button>
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
                    <ModalHeader className="flex flex-col gap-1">{t('restore.header')}</ModalHeader>
                    <ModalBody>
                      <p> 
                        {t('restore.body')}
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button 
                        className='font-size-text-adjust-sm'
                        color="danger" 
                        variant="light" 
                        onPress={onClose}
                      >
                        {t('restore.cancel')}
                      </Button>
                      <Button 
                        className='font-size-text-adjust-sm'
                        color="primary" 
                        onPress={() => {
                          console.log('Config resetted.');
                          resetConfig();
                          modalReset.onClose();
                        }}
                      >
                        {t('restore.continue')}
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
