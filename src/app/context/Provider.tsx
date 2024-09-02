"use client"

import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import ConfigProvider from "./ConfigProvider";
import ToastProvider from "./ToastProvider";


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
            <ConfigProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </ConfigProvider>
        </ThemeProvider>
    );
};

export default Providers;
