"use client"

import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { ConfigContext, defaultConfig } from "./ConfigProvider";
import { ToastContainer } from "react-toastify";


const ToastProvider: React.FC<ProvidersProps> = ({ children }) => {
    const {theme} = useTheme();
    const [toastTheme, setToastTheme] = useState<string>(defaultConfig.theme);
    const { changesConfig } = useContext(ConfigContext);

    useEffect(() => {
        setToastTheme(theme ? theme : defaultConfig.theme);
    }, [changesConfig])


    return (
      <>
        <ToastContainer
            position={window.innerWidth > 1280 ? "top-right" : "top-center"}
            autoClose={5000}
            theme={toastTheme} 
        />
        {children}
      </>
    );
};

export default ToastProvider;
