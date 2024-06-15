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

export const Header = () => {
  const menuItems = {
    Selección: '/selection',
    Comunidad: '/community',
    Configuración: '/config',
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
          <NavbarItem key={`${key}-${index}-nav`}>
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
