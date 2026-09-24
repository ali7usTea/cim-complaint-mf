import { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
 
const adjustmentTypes = [
    { value: 'Immediate', label: 'Immediate' },
    { value: 'One_Off', label: 'One Off' }
];
 
const chargeCodes = [
    { value: 'CC1', label: 'Charge Code 1' },
    { value: 'CC2', label: 'Charge Code 2' }
    // Add more charge codes as needed
];
 
import { useEffect } from 'react';
import { proxyURL } from '../../../../utils/lib/proxyAPI';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { ComplaintType } from '..';
interface RefundRecordFormProps {
    fields?: any;
    errors?: any;
    touched?: any;
    handleChange?: any;
    setFieldValue?: any;
    selectedType?: ComplaintType | null
}
 
type FieldsType = { [key: string]: any };
function Form({ fields: parentFields, setFieldValue: parentSetFieldValue, selectedType }: RefundRecordFormProps = {}) {
    const { Customers } = useSelector((state: RootState) => state.customerslice);
    const { productType } = Customers[Object.keys(Customers)?.[0]] || {};
    const { activityTypeConfig } = selectedType || {};

    // Parse min/max from activityTypeConfig
    let minAmount = 0;
    let maxAmount = Infinity;
    if (typeof activityTypeConfig === 'string') {
        try {
            const configObj = JSON.parse(activityTypeConfig);
            minAmount = Number(configObj.minAmount) || 0;
            maxAmount = Number(configObj.maxAmount) || Infinity;
        } catch(err) {
            console.error("JSON parsing failed!", err)
        }
    }
 
    const [fields, setFields] = useState<FieldsType>({
        refundAmount: parentFields?.refundAmount || null,
        billDate: parentFields?.billDate || null,
        adjustmentType: parentFields?.adjustmentType || '',
        chargeCode: parentFields?.chargeCode || '',
        adjustmentRemarks: parentFields?.adjustmentRemarks || ''
    });
 
    const [errors, setErrors] = useState({
        refundAmount: '',
        billDate: '',
        adjustmentType: '',
        chargeCode: '',
        adjustmentRemarks: ''
    });
 
    const validate = (name: string, value: any) => {
        switch (name) {
            case 'refundAmount':
                if (value === null || value === undefined) return 'Amount is required';
                if (isNaN(Number(value)) || Number(value) <= 0) return 'Enter a valid refundAmount';
                if (Number(value) < minAmount) return `Minimum allowed is ${minAmount}`;
                if (Number(value) > maxAmount) return `Maximum allowed is ${maxAmount}`;
                return '';
            case 'billDate':
                if (!value) return 'Bill Period is required';
                return '';
            case 'adjustmentType':
                if (!value) return 'Adjustment Type is required';
                return '';
            case 'chargeCode':
                if (!value) return 'Charge Code is required';
                return '';
            case 'adjustmentRemarks':
                if (!value) return 'Remarks are required';
                return '';
            default:
                return '';
        }
    };
 
    const handleChange = (name: string, value: any) => {
        setFields((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    };
 
    const [chargeCodesList, setChargeCodesList] = useState<any[]>([]);
    const fetchChargeCodes = () => {
        axios.get(`${proxyURL}/GetChargeCodesLookup?LK_NAME=CHARGE_CODES`).then((res) => {
            const chargeCodesListRefined = res?.data?.data?.GetChargeCodesLookup_MainTable.rows;
            setChargeCodesList(chargeCodesListRefined || []);
        });
    };
 
    useEffect(() => {
        fetchChargeCodes();
    }, []);
 
    const [refundRecords, setRefundRecords] = useState<any[]>(parentFields?.refundRecords || []);
 
    useEffect(() => {
        if (parentSetFieldValue) {
            parentSetFieldValue('refundRecords', refundRecords, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refundRecords]);
 
    const handleSubmit = () => {
        const newErrors: typeof errors = {
            refundAmount: validate('refundAmount', fields.refundAmount),
            billDate: validate('billDate', fields.billDate),
            adjustmentType: validate('adjustmentType', fields.adjustmentType),
            chargeCode: validate('chargeCode', fields.chargeCode?.['GetChargeCodesLookup.ADJ_TYPE']?.value),
            adjustmentRemarks: validate('adjustmentRemarks', fields.adjustmentRemarks)
        };
        setErrors(newErrors);
        if (Object.values(newErrors).every((err) => !err)) {
            const record = {
                ...fields,
                billDate: fields.billDate ? (fields.billDate instanceof Date ? fields.billDate.toISOString()?.split('T')[0] : fields.billDate) : null,
                chargeCode: fields.chargeCode?.['GetChargeCodesLookup.SHORT_DESCRIPTION']?.value
            };
            setRefundRecords((prev) => [...prev, record]);
            setFields({
                refundAmount: null,
                billDate: null,
                adjustmentType: '',
                chargeCode: '',
                adjustmentRemarks: ''
            });
        }
    };
 
    const handleRemoveRefund = (index: number) => {
        setRefundRecords((prev) => prev.filter((_, i) => i !== index));
    };
 
    const actionBodyTemplate = (_: any, { rowIndex }: any) => <Button type="button" icon="pi pi-trash" className="p-button-danger p-button-text" onClick={() => handleRemoveRefund(rowIndex)} tooltip="Remove" />;
 
    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className='flex gap-2 mt-2'>
                <div style={{ flex: 1 }}>
                    <label>Amount:<span className="text-red-600">*</span></label>
                    <InputNumber value={fields.refundAmount} onValueChange={(e) => handleChange('refundAmount', e.value)} required min={1} useGrouping={false} style={{ width: '100%' }} />
                    {errors.refundAmount && <span style={{ color: 'red' }}>{errors.refundAmount}</span>}
                </div>
                <div style={{ flex: 1 }}>
                    <label>Bill Period:<span className="text-red-600">*</span></label>
                    <Calendar value={fields.billDate} onChange={(e) => handleChange('billDate', e.value)} dateFormat="mm-yy" required showIcon style={{ width: '100%' }} />
                    {errors.billDate && <span style={{ color: 'red' }}>{errors.billDate}</span>}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <label>Adjustment Type:<span className="text-red-600">*</span></label>
                    <Dropdown
                        value={fields.adjustmentType}
                        options={adjustmentTypes}
                        onChange={(e) => handleChange('adjustmentType', e.value)}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select"
                        required
                        style={{ width: '100%' }}
                    />
                    {errors.adjustmentType && <span style={{ color: 'red' }}>{errors.adjustmentType}</span>}
                </div>
                <div style={{ flex: 1 }}>
                    <label>Charge Code:<span className="text-red-600">*</span></label>
                    <Dropdown
                        value={fields.chargeCode}
                        options={chargeCodesList.filter((item) =>
                            Number(productType) === 1 || Number(productType) === 7
                                ? item['GetChargeCodesLookup.CHARGE_CODE_TYPE']?.value?.toUpperCase() === 'PREPAID'
                                : item['GetChargeCodesLookup.CHARGE_CODE_TYPE']?.value?.toUpperCase() === 'POSTPAID'
                        )}
                        onChange={(e) => handleChange('chargeCode', e.value)}
                        placeholder="Select"
                        required
                        style={{ width: '100%' }}
                        // @ts-ignore
                        optionLabel={(item: any) => (item ? `${item['GetChargeCodesLookup.ADJ_CHARGE_CODE']?.value}-${item['GetChargeCodesLookup.SHORT_DESCRIPTION']?.value}` : '')}
                        optionValue=""
                        filter
                    />
                    {errors.chargeCode && <span style={{ color: 'red' }}>{errors.chargeCode}</span>}
                </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label>Remarks:<span className="text-red-600">*</span></label>
                <div style={{ position: 'relative' }}>
                    <InputTextarea
                        value={fields.adjustmentRemarks}
                        onChange={(e) => {
                            const value = e.target.value.slice(0, 250);
                            handleChange('adjustmentRemarks', value);
                        }}
                        required
                        rows={3}
                        style={{ width: '100%', paddingBottom: '2rem' }}
                        maxLength={250}
                    />
                    <span
                        style={{
                            position: 'absolute',
                            right: '8px',
                            bottom: '8px',
                            fontSize: '0.9rem',
                            color: fields.adjustmentRemarks.length >= 250 ? 'red' : '#888'
                        }}
                    >
                        {250 - fields.adjustmentRemarks?.length} characters left
                    </span>
                </div>
                {errors.adjustmentRemarks && <span style={{ color: 'red' }}>{errors.adjustmentRemarks}</span>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="button" className='bg-mauves! text-white! font-medium! p-2!' onClick={handleSubmit}>
                    Add Refund
                </Button>
            </div>
 
            <DataTable value={refundRecords} style={{ marginTop: '2rem' }}>
                <Column field="refundAmount" header="Amount" />
                <Column field="billDate" header="Bill Period" />
                <Column field="adjustmentType" header="Adjustment Type" />
                <Column field="chargeCode" header="Charge Code" />
                <Column field="adjustmentRemarks" header="Remarks" />
                <Column body={actionBodyTemplate} header="Action" style={{ width: '100px' }} />
            </DataTable>
        </form>
    );
}
 
export default Form;