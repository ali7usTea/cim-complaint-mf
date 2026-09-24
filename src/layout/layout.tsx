/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useMountEffect, useUnmountEffect } from 'primereact/hooks';
import React, { useContext, useEffect } from 'react';
import { classNames } from 'primereact/utils';
// import AppConfig from './AppConfig';
import { LayoutContext } from './context/layoutcontext';
import ComplaintTabSuspense from '../app/main/page';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// import "../styles/layout/layout.scss";                              // this one
import 'primeicons/primeicons.css';                                     //this one
import '../styles/global.css';  


const Layout = (_props: any) => {
    const { jwtToken } = useSelector((state: RootState) => state.auth);
    const { setJwtToken, layoutState } = useContext(LayoutContext);

    useEffect(() => {
        if (jwtToken) {
            setJwtToken(jwtToken);
        }
    }, [jwtToken]);

    const blockBodyScroll = (): void => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = (): void => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'?.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    useMountEffect(() => {});

    useEffect(() => {
        if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
        }

        layoutState.staticMenuMobileActive && blockBodyScroll();
    }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

    useEffect(() => {
        if (layoutState.profileSidebarVisible) {
        }
    }, [layoutState.profileSidebarVisible]);

    useUnmountEffect(() => {});

    const containerClass = classNames('layout-wrapper', {
        'layout-static-inactive': layoutState.staticMenuDesktopInactive
    });

    return (
        <React.Fragment>
            <div className={containerClass}>
                <div className="layout-main-container">
                    <div className="layout-main">
                        <ComplaintTabSuspense />
                    </div>
                </div>
                {/* <AppConfig /> */}
                <div className="layout-mask"></div>
            </div>
        </React.Fragment>
    );
};

export default Layout;
