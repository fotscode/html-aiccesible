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
import { usePathname } from 'next/navigation'

export const Header = () => {
  const pathname = usePathname(); 
  const [activeSection, setActiveSection] = useState<string>(pathname);

  const menuItems = {
    Accesibilidad: '/accesibility',
    Comunidad: '/community',
    Configuración: '/config',
  }


  useEffect(() => {
    setActiveSection(pathname);
  }, [pathname]);

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
      </NavbarContent>

      <NavbarMenu>
        {[...Object.entries(menuItems)].map(([key, value], index) => (
          <NavbarMenuItem key={`${key}-${index}-menu`}>
            <Link className='w-full' href={value} size='lg'>
              {key}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

