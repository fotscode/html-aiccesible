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

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { isLoggedIn } from '@/utils/auth';


export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>(pathname);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const menuItems = {
    Accesibilidad: '/accesibility',
    Comunidad: '/community',
    Configuración: '/config',
  }


  useEffect(() => {
    setActiveSection('/' + pathname.split('/')[1]?.toLowerCase());
  }, [pathname]);


  useEffect(() => {
    if (isLoggedIn())
      setLoggedIn(true);
  }, []);


  return (
    <Navbar className='bg-default-900' disableAnimation isBordered>
      <NavbarMenuToggle className="sm:hidden" />

      <NavbarBrand>
        <Link href={ loggedIn ? '/accesibility' : '/'}>
          <h1 className={`${poppins.className} text-primary text-2xl font-bold`}>
            HTML <span className='logo ml-2'>AI</span>ccesible
          </h1>
        </Link>
      </NavbarBrand>

      <NavbarContent className='hidden sm:flex gap-4 items-center' justify='center'>
        {[...Object.entries(menuItems)].map(([key, value], index) => (
          <NavbarItem 
            key={`${key}-${index}-nav`}
            className={activeSection === value ? 'font-bold' : ''}
          >
          <Link color='foreground' href={value}>
            {key}
          </Link>
          </NavbarItem>
        ))}

        {loggedIn && 
        <NavbarItem
          className='flex items-center'
          key={'logout'}
        >
          <Button isIconOnly className='w-full bg-primary' aria-label='Cerrar sesión' onPress={onOpen}><MdLogout className='text-primary-foreground' size={32}/></Button>
          <Modal 
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
                      onPress={() => {
                        sessionStorage.removeItem('token');
                        console.log('User logged out');
                        router.replace('/');
                      }}
                    >
                      Sí
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </NavbarItem>}

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
                }}
                className="transition-transform"
                name={ loggedIn ? "@tonyreichert" : "@invitado"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Acciones del usuario" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                { loggedIn ? (
                  <div> 
                    <p className="font-bold">Iniciaste sesión como</p>
                    <p className="font-bold">@tonyreichert</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-bold">No iniciaste sesión</p>
                    <a href='/login' className="font-bold link">Iniciar sesión</a>
                  </div>
                )}
              </DropdownItem>
              <DropdownItem key="settings">
                <Link className='text-foreground' href='/config' size='sm'>
                  Configuración
                </Link>
              </DropdownItem>
             {loggedIn && (
                <DropdownItem key="logout" color="danger">
                  Cerrar sesión
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>


      </NavbarContent>

      <NavbarMenu className=''>
        {[...Object.entries(menuItems)].map(([key, value], index) => (
          <NavbarMenuItem 
            key={`${key}-${index}-menu`}
            className={activeSection === value ? 'font-bold' : ''}
          >
            <Link className='w-full text-lg text-foreground my-1' href={value} size='lg'>
              {key}
            </Link>
          </NavbarMenuItem>
        ))}
        {loggedIn && 
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
        }
      </NavbarMenu>
    </Navbar>
  )
}

