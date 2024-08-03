'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/utils/auth';

const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (isLoggedIn()) {
        router.replace('/accesibility');
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
};

export default RouteGuard;
