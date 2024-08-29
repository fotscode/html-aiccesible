"use client"

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ConfigProvider from "./ConfigProvider";
import { ToastContainer } from "react-toastify";


const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    const {theme} = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider attribute="class">
            <ConfigProvider>
                <ToastContainer
                    position={window.innerWidth > 1280 ? "top-right" : "top-center"}
                    autoClose={5000}
                    theme={theme == 'light' ? 'light' : 'dark'} 
                />
                {children}
            </ConfigProvider>
        </ThemeProvider>
    );
};

export default Providers;
