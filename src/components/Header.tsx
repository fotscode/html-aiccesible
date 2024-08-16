import { poppins } from '@/app/fonts'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
} from '@nextui-org/react'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { MdLogout } from "react-icons/md";
import { isLoggedIn } from '@/utils/auth';


export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>(pathname);

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


  const confirmLogout = () => {
    confirmAlert({
      title: 'Confirmar cierre de sesión',
      message: '¿Está segurx de que desea cerrar sesión?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            sessionStorage.removeItem('token');
            console.log('User logged out');
            router.replace('/');
          },
          style: {
            backgroundColor: '#D14805',
            color: 'white',
          }
        },
        {
          label: 'No',
          onClick: () => console.log('User canceled logout'),
          style: {
            backgroundColor: '#D14805',
            color: 'white',
          }
        }
      ],
    });
  }

  return (
    <Navbar disableAnimation isBordered>
      <NavbarMenuToggle className="sm:hidden" />

      <NavbarBrand>
        <Link
          href={ loggedIn ? '/accesibility' : '/'}
          className={`${poppins.className} text-typography text-2xl font-bold`}
        >
          HTML{' '}
          <span className='logo ml-2'>
            AI
          </span>
          ccesible
        </Link>
      </NavbarBrand>

      <NavbarContent className='hidden sm:flex gap-4 items-center' justify='end'>
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
        <button className='flex items-center' aria-label="Cerrar sesión" onClick={confirmLogout}>
          <MdLogout size={32} color="#D14805" /> 
        </button>
        </NavbarItem>}

      </NavbarContent>

      <NavbarMenu>
        {[...Object.entries(menuItems)].map(([key, value], index) => (
          <NavbarMenuItem 
            key={`${key}-${index}-menu`}
            className={activeSection === value ? 'font-bold' : ''}
          >
            <Link className='w-full text-lg text-black' href={value} size='lg'>
              {key}
            </Link>
          </NavbarMenuItem>
        ))}
        {loggedIn && 
        <NavbarItem
          key={'logout'}
        >
        <button className='flex flex-row items-center text-lg' aria-label="Cerrar sesión" onClick={confirmLogout}>
           Cerrar sesión &nbsp;
           <MdLogout size={32} color="#D14805" /> 
        </button>
        </NavbarItem>}
      </NavbarMenu>
    </Navbar>
  )
}

