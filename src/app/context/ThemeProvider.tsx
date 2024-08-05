"use client"
import { ThemeProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({children}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <>{children}</>
    }

    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}

export default Providers;
