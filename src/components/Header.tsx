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


export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
    const storedValue = sessionStorage.getItem('isLoggedIn');
    if (storedValue) {
      setIsLoggedIn(true);
    }
  }, []);

  const confirmLogout = () => {
    confirmAlert({
      title: 'Confirmar cierre de sesión',
      message: '¿Está segurx de que desea cerrar sesión?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            sessionStorage.removeItem('isLoggedIn');
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
      ]
    });
  }

  return (
    <Navbar disableAnimation isBordered>
      <NavbarMenuToggle className="sm:hidden" />

      <NavbarBrand>
        <Link
          href='/'
          className={`${poppins.className} text-black text-2xl font-bold`}
        >
          HTML{' '}
          <span className='ml-2' style={{ color: '#D14805' }}>
            AI
          </span>
          ccesible
        </Link>
      </NavbarBrand>

      <NavbarContent className='hidden sm:flex gap-4' justify='end'>
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

        {isLoggedIn && 
        <NavbarItem
          key={'logout'}
        >
        <button onClick={confirmLogout}>
          <MdLogout size={32} color="#D14805" /> 
        </button>
        </NavbarItem>}

      </NavbarContent>

      <NavbarMenu>
        {[...Object.entries(menuItems)].map(([key, value], index) => (
          <NavbarMenuItem key={`${key}-${index}-menu`}>
            <Link className='w-full text-lg text-black' href={value} size='lg'>
              {key}
            </Link>
          </NavbarMenuItem>
        ))}
        {isLoggedIn && 
        <NavbarItem
          key={'logout'}
        >
        <button className='flex flex-row items-center text-lg' onClick={confirmLogout}>
           Cerrar sesión &nbsp;
           <MdLogout size={32} color="#D14805" /> 
        </button>
        </NavbarItem>}
      </NavbarMenu>
    </Navbar>
  )
}

