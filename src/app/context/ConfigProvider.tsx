"use client"
import { useTheme } from 'next-themes';
import React, { createContext, useEffect, useState } from 'react';
import { getConfig } from "@/utils/ApiConfig";
import { isLoggedIn, getToken } from "@/utils/auth";

const defaultConfigContext: ConfigContext = {
    changesConfig: 0, 
    setChangesConfig: () => {}, 
};

export const ConfigContext = createContext<ConfigContext>(defaultConfigContext);

export const defaultConfigKeys = {
    theme: 'light',
    language: 'es',
    show_likes: 'likes-yes',
    show_comments: 'comments-yes',
    text_size: '2', 
    title_size: '3' 
};

export const defaultConfig: Config = {
  show_likes: defaultConfigKeys.show_likes === 'likes-yes' ? true : false,
  show_comments: defaultConfigKeys.show_comments === 'comments-no' ? true : false,
  theme: defaultConfigKeys.theme,
  language: defaultConfigKeys.language,
  size_title: +defaultConfigKeys.title_size,
  size_text: +defaultConfigKeys.text_size,
};

const ConfigProvider: React.FC<ProvidersProps> = ({ children }) => {
    // Theme color
    const { setTheme } = useTheme();

    // Font sizes
    const [ textSize, setTextSize ] = useState<number>();
    const [ titleSize, setTitleSize ] = useState<number>();

    // Modified after applying changes
    const [ changesConfig, setChangesConfig ] = useState(0);


    const getLocalConfig = () => {
        const strConfig = localStorage.getItem('config');
        const config = JSON.parse(strConfig!!);
        if (!!config)
            applyConfig(config);
        else
            applyConfig(defaultConfig);
        /*
          Fields:
          show_likes: show_likes == 'Sí',
          show_comments: show_comments == 'Sí',
          theme: theme == 'Claro' ? 'light' : 'dark',
          language: language == 'Español' ? 'es' : 'eng',
          size_title: size_title,
          size_text: size_text,
        */

    };

    const applyConfig = (data: Config) => {
       
        setTheme(data.theme);
        document.documentElement.style.setProperty('--text-scaler', `${data.size_text}`);
        document.documentElement.style.setProperty('--title-scaler', `${data.size_title}`);

        //TODO apply changes for lang, likes and comments
    }


    useEffect(() => {
        if (isLoggedIn()) {
            getConfig(getToken()).then((response) => {
                applyConfig(response.data);
            }).catch(() => {
                getLocalConfig();
                console.log("Couldn't fetch settings from server");
            });
        } else {
            getLocalConfig();
        }
    }, [changesConfig]);

    return (
        <ConfigContext.Provider value={{ changesConfig, setChangesConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigProvider;
