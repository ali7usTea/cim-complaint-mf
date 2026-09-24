import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { fetcheGPON_ElifeFaultyTypeOptions } from '../../../../utils/complaints/fetcheGPON_ElifeFaultyTypeOptions';
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';

const dropDownValues = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
];

interface GponFormProps {
    fields: any;
    errors?: any;
    touched?: any;
    handleChange?: (name: string, value: any) => void;
    setFieldValue: (name: string, value: any, shouldValidate?: boolean) => void;
}

function Form({ fields, setFieldValue, errors = {} }: GponFormProps) {
    const { Customers } = useSelector((state: RootState) => state.customerslice);
    const { productCode } = Customers[Object.keys(Customers)?.[0]] || {};
    const [elifeFaultyTypeOptions, setElifeFaultyTypeOptions] = useState<any[]>([]);

    useEffect(() => {
        fetcheGPON_ElifeFaultyTypeOptions(productCode)
            .then((result) => setElifeFaultyTypeOptions(result))
            .catch((error) => console.error('Error in ElifeFaultyTypeOptions method', error));
    }, [productCode]);

    // Use parent's setFieldValue directly
    const onChange = (name: string, value: any) => {
        setFieldValue(`elifeTechnicalDetails.${name}`, value, false);
    };

    return (
        <div className="mx-auto p-2">
            <form noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                    <label>Link LED: </label>
                    <Dropdown
                        value={fields?.elifeTechnicalDetails?.ontLinkLEDStatus}
                        options={dropDownValues}
                        onChange={(e) => onChange('ontLinkLEDStatus', e.value)}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select"
                        style={{ width: '100%' }}
                    />
                    {errors.ontLinkLEDStatus && <span style={{ color: 'red' }}>{errors.ontLinkLEDStatus} </span>}
                </div>
                <div className="col-span-1">
                    <label>
                        Lan LED:
                        <Dropdown
                            value={fields?.elifeTechnicalDetails?.ontLANLEDStatus}
                            options={dropDownValues}
                            onChange={(e) => onChange('ontLANLEDStatus', e.value)}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Select"
                            style={{ width: '100%' }}
                        />
                    </label>
                    {errors.ontLANLEDStatus && <span style={{ color: 'red' }}>{errors.ontLANLEDStatus} </span>}
                </div>
                <div className="col-span-1">
                    <label>CPE Connected ONT Port: </label>
                    <Dropdown value={fields?.elifeTechnicalDetails?.ontPort} options={dropDownValues} onChange={(e) => onChange('ontPort', e.value)} optionLabel="label" optionValue="value" placeholder="Select" style={{ width: '100%' }} />
                    {errors.ontPort && <span style={{ color: 'red' }}>{errors.ontPort} </span>}
                </div>
                <div className="col-span-1">
                    <label>ONT POWER: </label>
                    <Dropdown
                        value={fields?.elifeTechnicalDetails?.ontPwrLedStatus}
                        options={dropDownValues}
                        onChange={(e) => onChange('ontPwrLedStatus', e.value)}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select"
                        style={{ width: '100%' }}
                    />
                    {errors.ontPwrLedStatus && <span style={{ color: 'red' }}>{errors.ontPwrLedStatus} </span>}
                </div>
                <div className="col-span-1">
                    <label>
                        ONT AUTH:
                        <Dropdown
                            value={fields?.elifeTechnicalDetails?.ontPwrAuthStatus}
                            options={dropDownValues}
                            onChange={(e) => onChange('ontPwrAuthStatus', e.value)}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Select"
                            style={{ width: '100%' }}
                        />
                    </label>
                    {errors.ontPwrAuthStatus && <span style={{ color: 'red' }}>{errors.ontPwrAuthStatus} </span>}
                </div>
                <div className="col-span-1">
                    <label>
                        ONT Restarted: <span className="text-red-600">*</span>{' '}
                    </label>
                    <Dropdown value={fields?.elifeTechnicalDetails?.ontRestarted} options={dropDownValues} onChange={(e) => onChange('ontRestarted', e.value)} optionLabel="label" optionValue="value" placeholder="Select" style={{ width: '100%' }} />
                    {errors.ontRestarted && <span style={{ color: 'red' }}>{errors.ontRestarted} </span>}
                </div>
                <div className="col-span-1">
                    <label>Ont Directly connected To PC:</label>
                    <Dropdown value={fields?.elifeTechnicalDetails?.ontPC} options={dropDownValues} onChange={(e) => onChange('ontPC', e.value)} optionLabel="label" optionValue="value" placeholder="Select" style={{ width: '100%' }} />
                    {errors.ontPC && <span style={{ color: 'red' }}>{errors.ontPC} </span>}
                </div>
                <div className="col-span-1">
                    <label>PC Restared:</label>
                    <Dropdown value={fields?.elifeTechnicalDetails?.pcRestarted} options={dropDownValues} onChange={(e) => onChange('pcRestarted', e.value)} optionLabel="label" optionValue="value" placeholder="Select" style={{ width: '100%' }} />
                    {errors.pcRestarted && <span style={{ color: 'red' }}>{errors.pcRestarted} </span>}
                </div>
                <div className="col-span-1">
                    <label>STB Restared:</label>
                    <Dropdown value={fields?.elifeTechnicalDetails?.stbRestarted} options={dropDownValues} onChange={(e) => onChange('stbRestarted', e.value)} optionLabel="label" optionValue="value" placeholder="Select" style={{ width: '100%' }} />
                    {errors.stbRestarted && <span style={{ color: 'red' }}>{errors.stbRestarted} </span>}
                </div>
                <div className="col-span-1">
                    <label>Able to establish PPoE: </label>
                    <Dropdown
                        value={fields?.elifeTechnicalDetails?.pppoeConnection}
                        options={dropDownValues}
                        onChange={(e) => onChange('pppoeConnection', e.value)}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select"
                        style={{ width: '100%' }}
                    />
                    {errors.pppoeConnection && <span style={{ color: 'red' }}>{errors.pppoeConnection} </span>}
                </div>
                <div className="col-span-1">
                    <label>
                        Elife Faulty Type: <span className="text-red-600">*</span>{' '}
                    </label>
                    <Dropdown
                        value={fields?.elifeTechnicalDetails?.elifeTechnicalDetails}
                        options={[{ label: '--Select eLife Faulty Type--', value: null }, ...elifeFaultyTypeOptions?.map((p: any) => ({ label: p.serviceDesc, value: p.productCode }))]}
                        onChange={(e) => {
                            onChange('elifeTechnicalDetails', e.value);
                        }}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select"
                        style={{ width: '100%' }}
                    />
                    {errors.elifeTechnicalDetails && <span style={{ color: 'red' }}>{errors.elifeTechnicalDetails} </span>}
                </div>
            </form>
        </div>
    );
}

export default Form;
