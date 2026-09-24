'use client'
import { useState, createContext, useRef, useEffect } from 'react';
import { LayoutState, ChildContainerProps, LayoutConfig, LayoutContextProps } from '../../types/types';
export const LayoutContext = createContext({} as LayoutContextProps);
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';

import { RootState } from "../../redux/store";

export const LayoutProvider = ({ children }: ChildContainerProps) => {
    const [jwtToken, setJwtToken] = useState<string>('')
    const { notificationType, infoText, notificationHeader } = useSelector((state: RootState) => state.notifications)
    const toast = useRef<Toast>(null);

    useEffect(() => {
        if (toast.current && notificationHeader) {
            toast.current.show({ severity: notificationType, summary: notificationHeader, detail: infoText || 'Message Content' });
        }
    }, [toast.current, notificationType, notificationHeader, infoText])

    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
        ripple: false,
        inputStyle: 'outlined',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14
    });

    const [layoutState, setLayoutState] = useState<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const onMenuToggle = () => {
        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
        }
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value: LayoutContextProps = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        jwtToken,
        setJwtToken,
    };

    return <LayoutContext.Provider value={value}>
        <Toast ref={toast} /> 
        {children}
    </LayoutContext.Provider>;
};