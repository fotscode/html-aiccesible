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
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { isLoggedIn } from '@/utils/auth';
import { ConfigContext } from '@/app/context/ConfigProvider';


export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>(pathname);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { changesConfig, setChangesConfig } = useContext(ConfigContext);


  const desktopMenuItems = {
    Home: '/accesibility',
    Comunidad: '/community',
  }

  const mobileMenuItems = {
    Home: '/accesibility',
    Comunidad: '/community',
    Configuración: '/config',
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
              <ModalHeader className="flex flex-col gap-1">Confirmar cierre de sesión</ModalHeader>
              <ModalBody>
                <p> 
                  ¿Está segurx de que desea cerrar sesión?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={onClose}
                >
                  No
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleLogout}
                >
                  Sí
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
          <Link color='foreground' href={value}>
            {key}
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
                  showFallback: true,
                  fallback: <FaUserCircle className="animate-pulse text-default-500 h-10 w-10" fill="currentColor"/>,
                  name: loggedIn ? username.charAt(0).toUpperCase() + username.slice(1) : "Invitado"
                }}
                className="transition-transform"
                name={ loggedIn ? username.charAt(0).toUpperCase() + username.slice(1) : "Invitado"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Acciones del usuario" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" showDivider isReadOnly={loggedIn} href={ loggedIn ? '#' : '/login'}>
                <p className="font-bold">{loggedIn ? "Iniciaste sesión como" : "No iniciaste sesión"}</p>
                <p className="font-bold text-primary">{loggedIn ? `@${username}` : "Iniciar sesión"}</p>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link className='text-foreground' href='/config' size='sm'>
                  Configuración
                </Link>
              </DropdownItem>
              { loggedIn && (
                <DropdownItem key="logout" color="danger" onPress={onOpen}>
                  Cerrar sesión
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
            <Link className='w-full text-lg text-foreground my-1' href={value} size='lg'>
              {key}
            </Link>
          </NavbarMenuItem>
        ))}
        {
        /*
        loggedIn && 
          <NavbarItem
            key={'logout'}
            className='mt-auto mb-3'
          >
            <Button 
              className='w-full bg-primary text-primary-foreground text-lg' 
              aria-label='Cerrar sesión' 
              onPress={onOpen} 
              endContent={<MdLogout className='text-primary-foreground' 
              size={32}/>}
            >
              Cerrar sesión
            </Button>
          </NavbarItem>
        */
        }
        {loggedIn && 
          <NavbarMenuItem
            key={'logout-menu'}
          >
            <Link className='my-1 hover:cursor-pointer' color='danger' aria-label='Cerrar sesión' onPress={onOpen} size='lg'>
              Cerrar sesión
            </Link>
          </NavbarMenuItem>
        }
      </NavbarMenu>
    </Navbar>
  )
}

