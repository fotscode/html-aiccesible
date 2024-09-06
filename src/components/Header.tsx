import { poppins } from '@/app/fonts'
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  User
} from '@nextui-org/react'

import { useState, useEffect, useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { FaUserCircle } from "react-icons/fa";
import { isLoggedIn } from '@/utils/auth';
import { ConfigContext } from '@/app/context/ConfigProvider';
import { setUserLocale } from '@/services/locale';
import { useTranslations } from 'next-intl';


export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>(pathname);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { changesConfig, setChangesConfig } = useContext(ConfigContext);
  const t = useTranslations('Header');

  const desktopMenuItems = {
    home: '/accesibility',
    community: '/community',
  }

  const mobileMenuItems = {
    home: '/accesibility',
    community: '/community',
    settings: '/config',
  }


  useEffect(() => {
    setActiveSection('/' + pathname.split('/')[1]?.toLowerCase());
  }, [pathname]);


  useEffect(() => {
    if (isLoggedIn()) {
      setLoggedIn(true);
      setUsername(sessionStorage.getItem('username')!!);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    setUserLocale(null); // clear cookies
    console.log('User logged out');
    router.replace('/');
    setChangesConfig(changesConfig + 1);
  };

  return (
    <Navbar className='bg-default-900' isBordered>
      <Modal //Modal for logout
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{t('logout.header')}</ModalHeader>
              <ModalBody>
                <p> 
                  {t('logout.body')}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button 
                  className='font-size-text-adjust-sm'
                  color="danger" 
                  variant="light" 
                  onPress={onClose}
                >
                  {t('logout.no')}
                </Button>
                <Button 
                  className='font-size-text-adjust-sm'
                  color="primary" 
                  onPress={handleLogout}
                >
                  {t('logout.yes')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <NavbarMenuToggle className="sm:hidden" />

      <NavbarBrand>
        <Link href={ loggedIn ? '/accesibility' : '/'}>
          <h1 className={`${poppins.className} logo font-size-title-adjust-2xl font-bold`}>
            HTML <span className='text-primary ml-2'>AI</span>ccesible
          </h1>
        </Link>
      </NavbarBrand>

      <NavbarContent className='hidden sm:flex gap-4 items-center' justify='center'>
        {[...Object.entries(desktopMenuItems)].map(([key, value], index) => (
          <NavbarItem 
            key={`${key}-${index}-nav`}
            isActive={activeSection === value}
          >
          <Link className='font-size-text-adjust-base' color='foreground' href={value}>
            {t(`${key}`)}
          </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='flex items-center'>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: loggedIn ? "https://i.pravatar.cc/150?u=a042581f4e29026024d" : "",
                  alt: loggedIn ? `${t('user.alt_image.logged')} ${username}` : t('user.alt_image.guest'),
                  showFallback: true,
                  fallback: <FaUserCircle className="animate-pulse text-default-500 h-10 w-10" fill="currentColor"/>,
                  name: loggedIn ? username.charAt(0).toUpperCase() + username.slice(1) : t('user.guest'),
                }}
                className="transition-transform"
                name=
                  <span className="font-size-text-adjust-base">
                    {loggedIn ? username.charAt(0).toUpperCase() + username.slice(1) : t('user.guest')}
                  </span>
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Acciones del usuario" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" showDivider isReadOnly={loggedIn} href={ loggedIn ? '#' : '/login'} textValue={loggedIn ? t('user.logged_as') : t('user.not_logged_as')}>
                <p className="font-bold font-size-text-adjust-sm">{loggedIn ? t('user.logged_as') : t('user.not_logged_as')}</p>
                <p className="font-bold text-primary font-size-text-adjust-sm">{loggedIn ? `@${username}` : t('user.login')}</p>
              </DropdownItem>
              <DropdownItem key="settings" className='font-size-text-adjust-sm' textValue={t('settings')} onPress={() => {router.push('/config')}}>
                {t('settings')}
              </DropdownItem>
              { loggedIn && (
                <DropdownItem key="logout" color="danger" onPress={onOpen} textValue={t('logout.title')}> 
                  <p className='font-size-text-adjust-sm'>{t('logout.title')}</p>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

      </NavbarContent>

      <NavbarMenu className=''>
        {[...Object.entries(mobileMenuItems)].map(([key, value], index) => (
          <NavbarMenuItem 
            key={`${key}-${index}-menu`}
            isActive={activeSection === value}
          >
            <Link className='w-full font-size-text-adjust-lg text-foreground my-1' href={value} size='lg'>
              {t(`${key}`)}
            </Link>
          </NavbarMenuItem>
        ))}
        {loggedIn && 
          <NavbarMenuItem
            key={'logout-menu'}
          >
            <Link className='my-1 hover:cursor-pointer font-size-text-adjust-lg' color='danger' aria-label='Cerrar sesión' onPress={onOpen}>
              {t('logout.title')}
            </Link>
          </NavbarMenuItem>
        }
      </NavbarMenu>
    </Navbar>
  )
}

