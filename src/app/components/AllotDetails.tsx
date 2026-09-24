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

const AllotDetails: React.FunctionComponent = () => {
    const { Customers } = useSelector((state: RootState) => state.customerslice);
    const { checkGroupPermissionExists } = usePermissionChecker();
    // clientLogger.info(`${LOGGER_HSS_DETAILS_PAGE}:Rendering Mobile Network HSS Details`);
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <div title="mobile-network-hssDetails" className="mobile-network-hssDetails py-2">
            <div className="py-2 mt-2 px-2 w-full h-full ">
                <button>Send Email</button>
                <DataPanel
                    autoPublish={true}
                    api={`${proxyURL}/custom/getAllotDetails`}
                    params={{
                        accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                        ...(isDebugMode ? { isDebugMode } : {})
                    }}
                    headerTxt="Allot"
                    isRenderable={checkGroupPermissionExists('allotDetailsTabPanel')}
                    layout="table"
                    debugMode={isDebugMode}
                />
            </div>
        </div>
    );
};

export default AllotDetails;
