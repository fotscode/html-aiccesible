'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isLoggedIn } from '@/utils/auth';

const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn();

      if (loggedIn) {
        // Redirect logged-in users to '/accesibility' from specific routes
        const protectedRoutes = ['/', '/login', '/register', '/register/success'];
        if (protectedRoutes.includes(pathname)) {
          router.replace('/accesibility');
        }
      } else {
        // Redirect non-logged-in users from '/community/publish'
        if (pathname === '/community/publish') {
          router.replace('/community');
        }
      }
    };

    checkAuth();
  }, [router, pathname]); // Include pathname in the dependency array

  return <>{children}</>;
};

export default RouteGuard;
