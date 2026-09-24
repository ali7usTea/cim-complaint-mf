/* eslint-disable */
'use client';
import { useSearchParams } from 'react-router';
import React, { Suspense, useEffect } from 'react';

// @ts-ignore
import DataPanel from 'cim-ui-components/dist/components/DataPanel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiGetActionReport } from '../../redux/TabsData/AsyncActions';
import { AppDispatch, RootState } from '../../redux/store';
import { proxyURL } from '../../utils/lib/proxyAPI';

// import { clientLogger } from '../../../../clientLogger';

function ActionReportPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { details } = useSelector((state: RootState) => state.ActionReportTabSlice);
    const [searchParams] = useSearchParams();

    const actionCode = searchParams!.get('query')?.replace(/\?/g, (_match, offset, str) => {
        const firstIndex = str.indexOf('?');
        return offset === firstIndex ? '?' : '&';
    });
    const refId = searchParams!.get('refId');
    const layout = searchParams!.get('layout') || 'table';

    useEffect(() => {
        dispatch(fetchApiGetActionReport(`${refId}`));
    }, [refId]);

    // clientLogger.info("app.debugReport.ActionReportPage : Rendering Action Report Page");

    return (
        <div>
            {details?.length ? (
                details.map((item: any, index: number) => (
                    <React.Fragment key={index}>
                        <div className="p-6">
                            <h2>Call {index + 1}</h2>
                            <div key={item.id} style={{ marginBottom: '10px' }}>
                                <p>
                                    <strong>URL:</strong> {item.endpoint}
                                </p>
                                <p>
                                    {' '}
                                    <strong>Action Code:</strong> {actionCode}
                                </p>
                                {Number(item.callTypeID) !== 3 ? (
                                    <p>
                                        {' '}
                                        <strong>Operation:</strong> {item.api}
                                    </p>
                                ) : null}

                                <p>
                                    <strong>Status:</strong> {item.status}
                                </p>
                                <p>
                                    <strong>Called At:</strong> {new Date(item.calledAt).toLocaleString() || ''}
                                </p>
                                <p>
                                    <strong>Completed At:</strong> {new Date(item.completedAt).toLocaleString() || ''}
                                </p>
                                {Number(item.callTypeID) == 3 ? (
                                    <p>
                                        <strong>DB Query: </strong> {item.request}
                                    </p> // will change request key when available in apis
                                ) : (
                                    <p>
                                        <strong>Request:</strong> {item.request}
                                    </p>
                                )}

                                {Number(item.callTypeID) !== 3 ? (
                                    <p>
                                        <strong>Response: </strong> {item.response}
                                    </p>
                                ) : null}
                                {item?.errorMessage && (
                                    <p> <strong>Error Message: </strong> {item.errorMessage}</p>
                                )}
                                <>
                                    {' '}
                                    {item && (
                                        <>
                                            <h2>Additional Information: (for developer use only)</h2>
                                            <h3>Reference IDs/Request IDs (for audit table):</h3>
                                            <p>{JSON.stringify(item)}</p>
                                        </>
                                    )}
                                </>
                            </div>
                        </div>
                    </React.Fragment>
                ))
            ) : (
                <div className="text-center">No data Found</div>
            )}
            <DataPanel autoPublish={true} isTriggerFlag={false} api={`${proxyURL}/${actionCode}`} headerTxt="Output Result" isRenderable={true} layout={layout} />
        </div>
    );
}

function DebugReportSuspense() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ActionReportPage />
        </Suspense>
    );
}

export default DebugReportSuspense;
