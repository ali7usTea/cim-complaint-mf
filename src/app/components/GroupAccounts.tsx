'use client';

import React from 'react';
// @ts-ignore
import DataPanel from 'cim-ui-components/dist/components/DataPanel';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { usePermissionChecker } from '../hooks/usePermissionChecker';
import { proxyURL } from '../../utils/lib/proxyAPI';
// import { clientLogger } from '../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.NETWORK.Assets_DETAILS";

const GroupAccounts: React.FunctionComponent = () => {
    const { Customers } = useSelector((state: RootState) => state.customerslice);
    const { checkGroupPermissionExists } = usePermissionChecker();
    // clientLogger.info(`${LOGGER_HSS_DETAILS_PAGE}:Rendering Mobile Network HSS Details`);
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <div title="mobile-network-hssDetails" className="mobile-network-hssDetails">
            <p className="flex ml-3 font-bold text-1xl">Group Linked Account Inquiry</p>
            <div className="parent-group-linked-summary-bill-account-details px-2 mt-2 w-full h-full ">
                <DataPanel
                    autoPublish={true}
                    api={`${proxyURL}/GetGroupLinkedAccounts`}
                    params={{
                        accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                        ...(isDebugMode ? { isDebugMode } : {})
                    }}
                    headerTxt="Parent Group & Linked Summary Bill Account Details, Child Account Details for Parent Group"
                    isRenderable={checkGroupPermissionExists('GroupLinkedAccountInquiryParentPnl')}
                    layout="table"
                    debugMode={isDebugMode}
                />
            </div>
        </div>
    );
};

export default GroupAccounts;
