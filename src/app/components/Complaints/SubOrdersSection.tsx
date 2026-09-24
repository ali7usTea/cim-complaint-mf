import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate, useSearchParams } from 'react-router';
//@ts-ignore
import DataPanel from 'cim-ui-components/dist/components/DataPanel';
import { ComplaintCaptureMode } from '../../../interfaces/complaintEnums';
import { ActivityGroupCode } from '../../../utils/complaints/enums/ActivityGroupCode_Enum';
import { fetchSubOrders } from '../../../utils/fetchSubOrders';
import { RootState } from '../../../redux/store';
import { proxyURL, debugReportURL } from '../../../utils/lib/proxyAPI';

enum ProvisioningType {
    BY_ACTIVE_ACCOUNT = 'BY_ACTIVE_ACCOUNT',
    BY_INACTIVE_ACCOUNT = 'BY_INACTIVE_ACCOUNT',
    BY_PARTY = 'BY_PARTY'
}

interface SubOrdersSectionProps {
    selectedCategory: string;
    selectedType: any;
    complaintCaptureMode: any;
    regions: any[];
    setFieldValue: (field: string, value: any) => void;
    onSubRequestChange?: (subRequest: any) => void;
    onComplaintCaptureModeChange?: (mode: any) => void;
    isProvisioningByAccount: boolean;
    setIsProvisioningByAccount: (value: boolean) => void;
    provisioningAccountId: string;
    setProvisioningAccountId: (value: string) => void;
    provisioningAccountNumber: string;
    setProvisioningAccountNumber: (value: string) => void;
    provisioningType: 'BY_ACTIVE_ACCOUNT' | 'BY_INACTIVE_ACCOUNT' | 'BY_PARTY';
    setProvisioningType: (value: 'BY_ACTIVE_ACCOUNT' | 'BY_INACTIVE_ACCOUNT' | 'BY_PARTY') => void;
    isLandLine: () => boolean;
    selectedSubRequest: any;
    setSelectedSubRequest: (value: any) => void;
}

const SubOrdersSection: React.FC<SubOrdersSectionProps> = ({
    selectedCategory,
    selectedType,
    complaintCaptureMode,
    regions,
    setFieldValue,
    onSubRequestChange,
    onComplaintCaptureModeChange,
    isProvisioningByAccount,
    setIsProvisioningByAccount,
    provisioningAccountId,
    setProvisioningAccountId,
    provisioningAccountNumber,
    setProvisioningAccountNumber,
    provisioningType,
    setProvisioningType,
    isLandLine,
    selectedSubRequest,
    setSelectedSubRequest
}) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get data from Redux store
    const { Customers } = useSelector((state: RootState) => state.customerslice);
    const { settings } = useSelector((state: RootState) => state.settingSlice);

    const { accountID, accountNumber, partyID, productCode, productGroup, regionCode, accountStatus, subRequestId, debugReport: isDebugMode } = Customers[Object.keys(Customers)?.[0]] || {};

    const complaintSrNumberOfDays = ((settings as any)?.['activitysystem.complaint.sr.number.of.days'] || 30) as number;

    /* const productsList = ((settings as any)?.['activitysystem.elife.product.codes'] || [])?.split(',')?.map((code: string) => code.trim()) as string[]; */
    const rawValue_productsList = (settings as any)?.['activitysystem.elife.product.codes'];
    const productsList = typeof rawValue_productsList === 'string' && rawValue_productsList !== '' ? rawValue_productsList?.split(',')?.map((code: string) => code.trim()) : [];

    const [subRequests, setSubRequests] = useState<any>({});
    const [refIdSubRequests, setRefIdSubRequests] = useState<string>('');
    const [debugRouteSubRequests, setDebugRouteSubRequests] = useState<string>('');
    const [showAccountPartyMismatchDialog, setShowAccountPartyMismatchDialog] = useState(false);
    const [provisioningSubrequestId, setProvisioningSubrequestId] = useState<string>('');

    const isElifeSubOrderProductCode = (productCodeParam: any) => {
        return !!productsList?.some((product: any) => {
            const p = product ?? '';
            return p.toLowerCase() === productCodeParam.toLowerCase();
        });
    };

    const isOptionalSubRequestSelectionComplaint = () => {
        return (
            complaintCaptureMode === ComplaintCaptureMode.CREATE_BY_ACCOUNT &&
            !(selectedType?.activityGroupCode === ActivityGroupCode.BILL.toString() || selectedType?.activityGroupCode === ActivityGroupCode.PROVISION.toString() || selectedType?.activityGroupCode === ActivityGroupCode.PROVISIONMANUAL.toString()) &&
            isElifeSubOrderProductCode(productCode)
        );
    };

    const showSubRequestsTable = () => {
        if (selectedType?.activityGroupCode === ActivityGroupCode.PROVISION.toString() || selectedType?.activityGroupCode === ActivityGroupCode.PROVISIONMANUAL.toString() || isOptionalSubRequestSelectionComplaint()) {
            return true;
        }
        return false;
    };

    const checkIfAccountPartyMismatch = (subrequest: any) => {
        if (!accountNumber || subrequest?.['GetSubRequestsForComplaint.PARTY_ID'] === partyID) {
            setShowAccountPartyMismatchDialog(false);
            return false;
        } else {
            setShowAccountPartyMismatchDialog(true);
            return true;
        }
    };

    const isAccountExists = (accountId: any): boolean => {
        let isAccountExistsState = true;
        if (!accountId) {
            return (isAccountExistsState = false);
        } else {
            if (accountStatus) {
                isAccountExistsState = true;
            }
        }
        return isAccountExistsState;
    };

    const isActiveAccount = (): boolean => {
        return typeof accountStatus === 'string' && accountStatus.toLowerCase() === 'active';
    };

    const setSubrequestActivityState = () => {
        const subrequestId = selectedSubRequest?.['GetSubRequestsForComplaint.SUBREQUEST_ID'] || '';
        setProvisioningSubrequestId(subrequestId);

        if (isAccountExists(selectedSubRequest?.['GetSubRequestsForComplaint.ACCOUNT_ID'])) {
            setIsProvisioningByAccount(true);
            setProvisioningAccountId(selectedSubRequest?.['GetSubRequestsForComplaint.ACCOUNT_ID'] || '');
            setProvisioningAccountNumber(selectedSubRequest?.['GetSubRequestsForComplaint.ACCOUNT_NO'] || '');
            if (isActiveAccount()) {
                setProvisioningType(ProvisioningType.BY_ACTIVE_ACCOUNT);
            } else {
                setProvisioningType(ProvisioningType.BY_INACTIVE_ACCOUNT);
            }
        } else {
            setIsProvisioningByAccount(false);
            setProvisioningType(ProvisioningType.BY_PARTY);
        }
    };

    const applyPerspective = (subrequest: any) => {
        if (onComplaintCaptureModeChange) {
            onComplaintCaptureModeChange(ComplaintCaptureMode.CREATE_BY_SUBREQUEST);
        }
        setSelectedSubRequest(subrequest);
        setSubrequestActivityState();
    };

    const onSubrequestSelect = (subrequest: any) => {
        if (!subrequest?.['GetSubRequestsForComplaint.SUBREQUEST_ID']) {
            return;
        }
        setSelectedSubRequest(subrequest);
        onSubRequestChange?.(subrequest);

        // Update subrequestId in URL params
        const newSubrequestId = subrequest['GetSubRequestsForComplaint.SUBREQUEST_ID'];
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('subRequestId', newSubrequestId);
        navigate({ search: newSearchParams.toString() }, { replace: true });

        let loadedCaptureModeBeforeProvisioning = null;
        let isAccountPartyMatch = false;

        if (complaintCaptureMode !== ComplaintCaptureMode.CREATE_BY_SUBREQUEST) {
            loadedCaptureModeBeforeProvisioning = complaintCaptureMode;
        }
        if (complaintCaptureMode === ComplaintCaptureMode.CREATE_BY_ACCOUNT || loadedCaptureModeBeforeProvisioning === ComplaintCaptureMode.CREATE_BY_ACCOUNT) {
            isAccountPartyMatch = !checkIfAccountPartyMismatch(subrequest);
        }
        if (isAccountPartyMatch && complaintCaptureMode !== ComplaintCaptureMode.CREATE_BY_SUBREQUEST) {
            applyPerspective(subrequest);
        }
        if (complaintCaptureMode === ComplaintCaptureMode.CREATE_BY_SUBREQUEST) {
            checkIfAccountPartyMismatch(subrequest);
        }
        if (regions.length > 0 && subrequest?.['GetSubRequestsForComplaint.REGION_CODE']) {
            if (regions.some((region) => region.regionCode === subrequest?.['GetSubRequestsForComplaint.REGION_CODE'])) {
                setFieldValue('region', subrequest?.['GetSubRequestsForComplaint.REGION_CODE']);
            }
        }
    };

    // Transform nested {value, color} objects to direct values
    const transformSubRequestObject = (subRequest: any) => {
        if (!subRequest) return null;

        const transformed: any = {};
        for (const key in subRequest) {
            if (subRequest.hasOwnProperty(key)) {
                // Check if the value is an object with a 'value' property
                if (subRequest[key] && typeof subRequest[key] === 'object' && 'value' in subRequest[key]) {
                    transformed[key] = subRequest[key].value;
                } else {
                    transformed[key] = subRequest[key];
                }
            }
        }
        return transformed;
    };

    // Effect to handle initial subRequestId from URL
    useEffect(() => {
        if (subRequestId && subRequests.GetSubRequestsForComplaint_MainTable && !selectedSubRequest) {
            const subRequestFetched = subRequests.GetSubRequestsForComplaint_MainTable.rows?.find((subRequest: any) => subRequest?.['GetSubRequestsForComplaint.SUBREQUEST_ID']?.value == subRequestId);

            if (subRequestFetched) {
                const transformedSubRequest = transformSubRequestObject(subRequestFetched);
                onSubrequestSelect(transformedSubRequest);
            }
        }
    }, [subRequestId, subRequests, selectedSubRequest]);

    // Effect to fetch sub orders
    useEffect(() => {
        const isRegionExistsinList = (region: any) => {
            return regions.some((sub) => sub.regionCode === region);
        };

        const getCustomerRegion = () => {
            return regionCode;
        };

        const populateRegionFromSelectedSubrequestIfExists = () => {
            if (isLandLine() && selectedSubRequest && selectedSubRequest?.['GetSubRequestsForComplaint.REGION_CODE'] && isRegionExistsinList(selectedSubRequest?.['GetSubRequestsForComplaint.REGION_CODE'])) {
                setFieldValue('region', selectedSubRequest.region);
            } else {
                setFieldValue('region', getCustomerRegion());
            }
        };

        const isPartyComplaint = () => {
            return !accountID && partyID;
        };

        const setSubOrders = () => {
            if (!(selectedType?.activityGroupCode === ActivityGroupCode.PROVISION.toString()) && !(selectedType?.activityGroupCode === ActivityGroupCode.PROVISIONMANUAL.toString())) {
                if (isOptionalSubRequestSelectionComplaint()) {
                    const params = {
                        accountId: accountID,
                        numberOfDays: complaintSrNumberOfDays
                    };
                    fetchSubOrders(params, isDebugMode).then((response: any) => {
                        if (response) {
                            setSubRequests(response?.data);
                            setRefIdSubRequests(response?.refId || '');
                            setDebugRouteSubRequests(`${debugReportURL}?query=${proxyURL}/GetSubRequestsForComplaint?accountId=${accountID}?numberOfDays=${complaintSrNumberOfDays}`);
                            setSelectedSubRequest(response?.data?.GetSubRequestsForComplaint_MainTable?.rows?.[0] || null);
                        }
                    });
                }
                return null;
            }
            if (complaintCaptureMode === ComplaintCaptureMode.UPDATE) {
                const params = isPartyComplaint() ? { partyId: partyID } : { accountNumber: accountNumber };
                fetchSubOrders(params, isDebugMode).then((response: any) => {
                    if (response) {
                        setSubRequests(response?.data);
                        setRefIdSubRequests(response?.refId || '');
                        const queryParams = Object.entries(params)
                            .map(([key, value]) => `${key}=${value}`)
                            .join('?');
                        setDebugRouteSubRequests(`${debugReportURL}?query=${proxyURL}/GetSubRequestsForComplaint?${queryParams}`);
                        setSelectedSubRequest(response?.data?.GetSubRequestsForComplaint_MainTable?.rows?.[0] || null);
                    }
                });
            } else {
                if (isProvisioningByAccount) {
                    fetchSubOrders(
                        {
                            accountNumber: accountNumber
                        },
                        isDebugMode
                    ).then((response: any) => {
                        if (response) {
                            setSubRequests(response?.data);
                            setRefIdSubRequests(response?.refId || '');
                            setDebugRouteSubRequests(`${debugReportURL}?query=${proxyURL}/GetSubRequestsForComplaint?accountNumber=${accountNumber}`);
                            setSelectedSubRequest(response?.data?.GetSubRequestsForComplaint_MainTable?.rows?.[0] || null);
                        }
                    });
                } else if (partyID) {
                    fetchSubOrders(
                        {
                            partyId: partyID
                        },
                        isDebugMode
                    ).then((response: any) => {
                        if (response) {
                            setSubRequests(response?.data);
                            setRefIdSubRequests(response?.refId || '');
                            setDebugRouteSubRequests(`${debugReportURL}?query=${proxyURL}/GetSubRequestsForComplaint?partyId=${partyID}`);
                        }
                    });
                }
                if (isProvisioningByAccount) {
                    populateRegionFromSelectedSubrequestIfExists();
                }
            }
        };
        setSubOrders();
    }, [selectedType, complaintCaptureMode, accountNumber, partyID, accountID, complaintSrNumberOfDays]);

    const handleDialogSearch = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        // Remove accountnumber and partyId
        newSearchParams.delete('accountnumber');
        newSearchParams.delete('partyId');
        // Add accountId from selectedSubRequest
        const accountId = selectedSubRequest?.['GetSubRequestsForComplaint.ACCOUNT_ID'];
        if (accountId) {
            newSearchParams.set('accountId', accountId);
        }
        // Full page reload with new params
        window.location.search = newSearchParams.toString();
    };

    const handleDialogCancel = () => {
        setSelectedSubRequest(null);
        setShowAccountPartyMismatchDialog(false);
    };

    return (
        <>
            {showSubRequestsTable() && selectedCategory === 'Provisioning' && (
                <>
                    <Dialog
                        header="Wrong customer order classification"
                        visible={showAccountPartyMismatchDialog}
                        style={{ width: '500px' }}
                        onHide={() => {
                            setShowAccountPartyMismatchDialog(false);
                        }}
                        closable={false}
                        modal
                        className="p-error"
                    >
                        <div style={{ marginBottom: 24 }}>{`The selected subrequest ${selectedSubRequest?.['GetSubRequestsForComplaint.SUBREQUEST_ID']} is for different Customer, please create complaint form interaction directly`}</div>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <Button label="Search" type="button" onClick={handleDialogSearch} className="p-button-info" />
                            <Button label="Cancel" type="button" onClick={handleDialogCancel} className="p-button-secondary" />
                        </div>
                    </Dialog>

                    <div style={{ marginBottom: 8 }}>
                        <DataPanel
                            selectedRow={selectedSubRequest}
                            setSelectedRow={onSubrequestSelect}
                            autoPublish={true}
                            panelData={subRequests}
                            panelDataRefId={refIdSubRequests}
                            debugRoute={debugRouteSubRequests}
                            headerTxt="Sub Orders"
                            isRenderable={true}
                            layout="table"
                            debugMode={isDebugMode}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default SubOrdersSection;
