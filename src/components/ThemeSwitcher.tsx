'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ProvidersProps {
    children: React.ReactNode;
}

const ThemeSwitcher: React.FC<ProvidersProps> = ({children}) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        setTheme('dark')
    }, []);

    if (!mounted) {
        return null;
    }

    const handleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default ThemeSwitcher;
