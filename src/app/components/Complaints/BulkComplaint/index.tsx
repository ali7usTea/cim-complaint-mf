import { useState, useEffect } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import InputTag from './InputTag';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { proxyURL } from '../../../../utils/lib/proxyAPI';
import { usePermissionChecker } from '../../../hooks/usePermissionChecker';
import { ComplaintCaptureMode } from '../../../../interfaces/complaintEnums';
import axios from 'axios';

type TableRow = {
    account: string;
    status: string;
    statusValidation: string;
    product: string;
    productValidation: string;
    segment: string;
    segmentValidation: string;
};

interface BulkComplaintValidateData {
    accountType: 'accountNumber' | 'accountId';
    data: any[];
}

interface BulkComplaintProps {
    isBulkComplaintOn: boolean;
    setIsBulkComplaintOn: (enabled: boolean) => void;
    bulkComplaintValidateResponse: BulkComplaintValidateData | null;
    setBulkComplaintValidateResponse: (data: BulkComplaintValidateData | null) => void;
    fcrComplaint?: boolean;
}

const BulkComplaint: React.FC<BulkComplaintProps> = ({ isBulkComplaintOn, setIsBulkComplaintOn, bulkComplaintValidateResponse, setBulkComplaintValidateResponse, fcrComplaint }) => {
    const [accountType, setAccountType] = useState<'accountNumber' | 'accountId'>('accountNumber');
    const [accountNumbers, setAccountNumbers] = useState<string[]>([]);
    const [accountIds, setAccountIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [isBulkComplaintEnabled, setIsBulkComplaintEnabled] = useState<boolean>(false);
    const [isCheckingPermission, setIsCheckingPermission] = useState<boolean>(true);
    const [maxAccountCount, setMaxAccountCount] = useState<number>(50); // Default value

    // Get customer data from Redux store
    const { Customers } = useSelector((state: RootState) => state.customerslice);
    const customerKey = Object.keys(Customers)[0];
    const customer = Customers[customerKey] || {};

    // Get settings from Redux store
    const settings = useSelector((state: RootState) => state.settingSlice.settings);

    // Get permission checker
    const { checkComplaintPermissionExists } = usePermissionChecker();

    // Get max count from settings
    useEffect(() => {
        const maxCountSetting = (settings as Record<string, any>)?.['activity.system.bulk.complaints.max.count'];
        if (maxCountSetting) {
            const parsedCount = parseInt(maxCountSetting, 10);
            if (!isNaN(parsedCount) && parsedCount > 0) {
                setMaxAccountCount(parsedCount);
            }
        }
    }, [settings]);

    // Check if bulk complaint is enabled via API
    useEffect(() => {
        const checkBulkComplaintEnabled = async () => {
            try {
                setIsCheckingPermission(true);

                // Check if user has bulk upload permission
                const isBulkComplaintPermitted = checkComplaintPermissionExists('VIEW-BUTTON-COMPLAINTS-BULK-UPLOAD');

                // Determine if it's create by account mode
                const isCreateByAccountMode = customer.complaintCaptureType === ComplaintCaptureMode.CREATE_BY_ACCOUNT;

                // Get customer segment
                const customerSegmentGroup = customer.customerSegmentGroup || '';

                // Prepare query parameters
                const params = new URLSearchParams({
                    customerSegment: customerSegmentGroup,
                    isCreateByAccountMode: String(isCreateByAccountMode),
                    isFcrComplaint: String(fcrComplaint),
                    isBulkComplaintPermitted: String(true)
                });

                // Call the BFF API
                const response = await axios.get(`${proxyURL}/custom/bulkComplaintEnabled?${params.toString()}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Set the flag based on API response
                if (response?.data?.data?.isBulkComplaintEnabled === true) {
                    setIsBulkComplaintEnabled(true);
                } else {
                    setIsBulkComplaintEnabled(false);
                }
            } catch (error) {
                console.error('Error checking bulk complaint enabled:', error);
                setIsBulkComplaintEnabled(false);
            } finally {
                setIsCheckingPermission(false);
            }
        };

        checkBulkComplaintEnabled();
    }, [customer.complaintCaptureType, customer.customerSegment, checkComplaintPermissionExists, fcrComplaint]);

    const handleValidate = async () => {
        setLoading(true);
        setBulkComplaintValidateResponse(null);

        try {
            const values = accountType === 'accountNumber' ? accountNumbers : accountIds;
            const key = accountType === 'accountNumber' ? 'ACCOUNT_NUMBERS' : 'ACCOUNT_IDS';

            if (values.length === 0) {
                setLoading(false);
                return;
            }

            // Prepare the payload
            const formData = new FormData();
            // Append all payload fields to FormData
            const payload = {
                actionCode: 'ValidateBulkComplaint',
                accountnumber: customer.accountNumber || '',
                partyId: customer.partyID || '',
                userName: customer.userName || '',
                productCode: customer.productCode || '',
                additionalInput: {
                    action: 'ValidateBulkComplaint',
                    PRODUCT_CODE:  customer.productCode || '',
                    CUSTOMER_SEGMENT: customer.customerSegmentDesc || '',
                    ACCOUNT_STATUS: customer.accountStatus,
                    [key]: values.join(',')
                }
            };
            formData.append('validateRequest', JSON.stringify(payload));

            // Call the validate API
            const res = await fetch(`${proxyURL}/custom/validateBulkComplaint`, {
                method: 'POST',
                body: formData
            });
            const response = await res.json();
            // Extract table data from response
            if (response?.data?.ValidateBulkComplaint_MainTable) {
                const { rows } = response?.data.ValidateBulkComplaint_MainTable;

                // Map the response to table format
                const mappedData = rows.map((row: any) => ({
                    account: row['ValidateBulkComplaint.Account']?.value || '',
                    status: row['ValidateBulkComplaint.Status']?.value || '',
                    statusValidation: row['ValidateBulkComplaint.Status_Validation']?.value || '',
                    product: row['ValidateBulkComplaint.Product']?.value || '',
                    productValidation: row['ValidateBulkComplaint.Product_Validation']?.value || '',
                    segment: row['ValidateBulkComplaint.Segment']?.value || '',
                    segmentValidation: row['ValidateBulkComplaint.Segment_Validation']?.value || ''
                }));

                setBulkComplaintValidateResponse({
                    accountType,
                    data: mappedData
                });
            }
        } catch (error) {
            console.error('Error validating bulk complaints:', error);
            // Handle error appropriately
        } finally {
            setLoading(false);
        }
    };

    // For header search
    const [filters, setFilters] = useState<Partial<TableRow>>({});

    const onColumnFilter = (e: React.ChangeEvent<HTMLInputElement>, field: keyof TableRow) => {
        setFilters((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const filteredData = (bulkComplaintValidateResponse?.data || []).filter((row: any) => {
        return Object.entries(filters).every(([field, value]) => {
            if (!value) return true;
            return String(row[field as keyof TableRow] || '')
                .toLowerCase()
                .includes(String(value).toLowerCase());
        });
    });

    // Delete row handler
    const handleDeleteRow = (rowIndex: number) => {
        if (!bulkComplaintValidateResponse) return;
        setBulkComplaintValidateResponse({
            ...bulkComplaintValidateResponse,
            data: bulkComplaintValidateResponse.data.filter((_, idx) => idx !== rowIndex)
        });
    };

    // Delete button template for DataTable
    const deleteBodyTemplate = (_rowData: TableRow, rowMeta: { rowIndex: number }) => (
        <Button icon="pi pi-trash" className="p-button-danger p-button-text p-button-sm" onClick={() => handleDeleteRow(rowMeta.rowIndex)} aria-label="Delete" tooltip="Delete" />
    );

    // Early return if bulk complaint is not enabled
    if (isCheckingPermission) {
        return null; // or a loading spinner if preferred
    }

    if (!isBulkComplaintEnabled) {
        return null;
    }

    return (
        <div className="!p-4 !border !rounded !border-gray-300">
            <div className="!mb-4 !flex !items-center !gap-2">
                <span className="!font-semibold !text-orange-700">Bulk Complaints?</span>
                <InputSwitch
                    checked={isBulkComplaintOn}
                    onChange={(e) => setIsBulkComplaintOn(e.value)}
                    pt={{
                        slider: {
                            style: isBulkComplaintOn ? { background: '#22c55e', borderColor: '#22c55e' } : undefined
                        }
                    }}
                />
            </div>
            {isBulkComplaintOn && (
                <div className="!border !rounded !bg-white !p-4 !mb-4">
                    <div className="!mb-4">
                        <button type="button" className="!flex !items-center !w-full !justify-between !px-4 !py-2 !bg-blue-100 !rounded hover:!bg-blue-200 !transition-colors !font-semibold !text-blue-900" aria-expanded={true} style={{ cursor: 'pointer' }}>
                            <span>Bulk Complaints</span>
                        </button>
                    </div>
                    <div className="!flex !gap-8 !mb-4">
                        <div className="!flex !items-center !gap-2">
                            <RadioButton inputId="accNum" name="accType" value="accountNumber" checked={accountType === 'accountNumber'} onChange={() => setAccountType('accountNumber')} />
                            <label htmlFor="accNum" className="!ml-1">
                                Add Account Numbers for Bulk Complaints Separated by comma.
                            </label>
                        </div>
                        <div className="!flex !items-center !gap-2">
                            <RadioButton inputId="accId" name="accType" value="accountId" checked={accountType === 'accountId'} onChange={() => setAccountType('accountId')} />
                            <label htmlFor="accId" className="!ml-1">
                                Add Account IDs for Bulk Complaints Separated by comma.
                            </label>
                        </div>
                    </div>
                    <div className="!flex !gap-8 !mb-4">
                        <div className="!w-1/2">
                            <InputTag 
                                value={accountNumbers} 
                                onChange={setAccountNumbers} 
                                placeholder="Enter account numbers" 
                                disabled={accountType !== 'accountNumber'}
                                maxTags={maxAccountCount}
                            />
                            {accountType === 'accountNumber' && accountNumbers.length > 0 && (
                                <small className="!text-gray-600 !mt-1 !block">
                                    {accountNumbers.length} / {maxAccountCount} accounts added
                                </small>
                            )}
                        </div>
                        <div className="!w-1/2">
                            <InputTag 
                                value={accountIds} 
                                onChange={setAccountIds} 
                                placeholder="Enter account IDs" 
                                disabled={accountType !== 'accountId'}
                                maxTags={maxAccountCount}
                            />
                            {accountType === 'accountId' && accountIds.length > 0 && (
                                <small className="!text-gray-600 !mt-1 !block">
                                    {accountIds.length} / {maxAccountCount} accounts added
                                </small>
                            )}
                        </div>
                    </div>
                    {((accountType === 'accountNumber' && accountNumbers.length >= maxAccountCount) || 
                      (accountType === 'accountId' && accountIds.length >= maxAccountCount)) && (
                        <Message 
                            severity="warn" 
                            text={`Maximum limit of ${maxAccountCount} accounts reached. Remove some accounts to add more.`}
                            className="!mb-4 !w-full"
                        />
                    )}
                    <Button type="button" label="Validate" onClick={handleValidate} className="!bg-green-600 !border-green-700" loading={loading} />
                </div>
            )}
            {isBulkComplaintOn && bulkComplaintValidateResponse?.data && bulkComplaintValidateResponse.data.length > 0 && (
                <div >
                    <div className="!font-semibold !text-green-800 !mb-2">Action Report (Type: {bulkComplaintValidateResponse.accountType === 'accountNumber' ? 'Account Numbers' : 'Account IDs'})</div>
                    <DataTable value={filteredData} paginator rows={10} className="!p-datatable-sm" emptyMessage="No records found." showGridlines>
                        <Column
                            field="account"
                            header="Account"
                            bodyClassName="!font-semibold"
                            headerClassName="!bg-green-700 !text-white"
                            filter
                            filterElement={<input type="text" className="p-inputtext p-component" value={filters['account'] || ''} onChange={(e) => onColumnFilter(e, 'account')} placeholder="Search..." style={{ width: '100%' }} />}
                        />
                        <Column
                            field="status"
                            header="Status"
                            headerClassName="!bg-green-700 !text-white"
                            filter
                            filterElement={<input type="text" className="p-inputtext p-component" value={filters['status'] || ''} onChange={(e) => onColumnFilter(e, 'status')} placeholder="Search..." style={{ width: '100%' }} />}
                        />
                        <Column
                            field="statusValidation"
                            header="Status Validation"
                            headerClassName="!bg-green-700 !text-white"
                            filter
                            filterElement={<input type="text" className="p-inputtext p-component" value={filters['statusValidation'] || ''} onChange={(e) => onColumnFilter(e, 'statusValidation')} placeholder="Search..." style={{ width: '100%' }} />}
                        />
                        <Column
                            field="product"
                            header="Product"
                            headerClassName="!bg-green-700 !text-white"
                            filter
                            filterElement={<input type="text" className="p-inputtext p-component" value={filters['product'] || ''} onChange={(e) => onColumnFilter(e, 'product')} placeholder="Search..." style={{ width: '100%' }} />}
                        />
                        <Column
                            field="productValidation"
                            header="Product Validation"
                            headerClassName="!bg-green-700 !text-white"
                            filter
                            filterElement={
                                <input type="text" className="p-inputtext p-component" value={filters['productValidation'] || ''} onChange={(e) => onColumnFilter(e, 'productValidation')} placeholder="Search..." style={{ width: '100%' }} />
                            }
                        />
                        <Column
                            field="segment"
                            header="Segment"
                            headerClassName="!bg-green-700 !text-white"
                            filter
                            filterElement={<input type="text" className="p-inputtext p-component" value={filters['segment'] || ''} onChange={(e) => onColumnFilter(e, 'segment')} placeholder="Search..." style={{ width: '100%' }} />}
                        />
                        <Column
                            field="segmentValidation"
                            header="Segment Validation"
                            headerClassName="!bg-green-700 !text-white"
                            filter
                            filterElement={
                                <input type="text" className="p-inputtext p-component" value={filters['segmentValidation'] || ''} onChange={(e) => onColumnFilter(e, 'segmentValidation')} placeholder="Search..." style={{ width: '100%' }} />
                            }
                        />
                        <Column header="Delete" body={deleteBodyTemplate} headerClassName="!bg-green-700 !text-white" style={{ width: 80, textAlign: 'center' }} />
                    </DataTable>
                </div>
            )}
        </div>
    );
};

export default BulkComplaint;
