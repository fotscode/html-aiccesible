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
    Selection: '/selection',
    Community: '/community',
    Configuration: '/config',
    Editor: '/editor',
  }

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className='sm:hidden pr-3' justify='center'>
        <NavbarBrand>
          <Link href='/' className={`${poppins.className} text-black text-xl font-bold`}>
            HTML <span className="ml-1" style={{ color: '#E44D25' }}>AI</span>ccesible
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='end'>
        <NavbarBrand>
          <Link href='/' className={`${poppins.className} text-black text-2xl font-bold`}>
            HTML <span className="ml-2" style={{ color: '#E44D25' }}>AI</span>ccesible
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link color='foreground' href='selection'>
            Selection
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='community'>
            Community
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='config'>
            Configuration
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {[...Object.entries(menuItems)].map(([key, value], index) => (
          <NavbarMenuItem key={`${key}-${index}`}>
            <Link className='w-full' href={value} size='lg'>
              {key}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
