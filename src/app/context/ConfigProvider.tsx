"use client"
import { useTheme } from 'next-themes';
import React, { createContext, useEffect, useState } from 'react';
import { getConfig } from "@/utils/ApiConfig";
import { isLoggedIn, getToken } from "@/utils/auth";
import { defaultLocale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';

const defaultConfigContext: ConfigContext = {
    changesConfig: 0, 
    setChangesConfig: () => {}, 
    likes: true,
    comments: true,
};

export const ConfigContext = createContext<ConfigContext>(defaultConfigContext);

export const defaultConfigKeys = {
    theme: 'light',
    language: defaultLocale as string,
    show_likes: true, //'likes-yes',
    show_comments: true, //'comments-yes',
    text_size: 1.0, 
    title_size: 1.0, 
};

export const defaultConfig: Config = {
  show_likes: defaultConfigKeys.show_likes,
  show_comments: defaultConfigKeys.show_comments,
  theme: defaultConfigKeys.theme,
  language: defaultConfigKeys.language,
  size_title: defaultConfigKeys.title_size,
  size_text: defaultConfigKeys.text_size,
};

const ConfigProvider: React.FC<ProvidersProps> = ({ children }) => {
    // Theme color
    const { setTheme } = useTheme();

    // Modified after applying changes
    const [ changesConfig, setChangesConfig ] = useState(0);

    const [ likes, setLikes ] = useState<boolean>(defaultConfig.show_likes);

    const [ comments, setComments] = useState<boolean>(defaultConfig.show_comments);


    const getLocalConfig = () => {
        const strConfig = localStorage.getItem('config');
        const config = JSON.parse(strConfig!!);
        if (!!config)
            applyConfig(config);
        else
            applyConfig(defaultConfig);
    };

    const applyConfig = (data: Config) => {
        setTheme(data.theme);
        document.documentElement.style.setProperty('--text-scaler', `${data.size_text}`);
        document.documentElement.style.setProperty('--title-scaler', `${data.size_title}`);
        setUserLocale(data.language);
        setLikes(data.show_likes)
        setComments(data.show_comments)
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
        <ConfigContext.Provider value={{ changesConfig, setChangesConfig, likes, comments }}>
            {children}
        </ConfigContext.Provider>
    );
};

export default ConfigProvider;
