"use client"
import { ThemeProvider, useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { getConfig } from "@/utils/ApiConfig";
import { isLoggedIn, getToken } from "@/utils/auth";

interface ProvidersProps {
    children: React.ReactNode;
}

const ThemeInitializer: React.FC = () => {
    const { setTheme } = useTheme();
    const getLocalConfig = () => {
        const config = localStorage.getItem('config');
        const themeToSet = config ? JSON.parse(config).theme : 'light';
        setTheme(themeToSet);
    };

    useEffect(() => {
        if (isLoggedIn()) {
            getConfig(getToken()).then((response) => {
                setTheme(response.data.theme);
            }).catch(() => {
                getLocalConfig();
                console.log("Couldn't fetch settings from server");
            });
        } else {
            getLocalConfig();
        }
    }, [setTheme]);

    return null; 
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider attribute="class">
            <ThemeInitializer />
            {children}
        </ThemeProvider>
    );
};

export default Providers;
