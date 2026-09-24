import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';

export type SpecialField = {
    id?: string | number;
    name: string;
    values: string | null;
    type: 'LABEL' | 'TEXT' | 'CALENDAR' | 'COMBO_BOX' | 'CHECK_BOX' | 'TEXT_AREA' | 'RADIO';
    required: boolean;
    displayedValue?: any;
};

type SpecialFieldsProps = {
    specialFields: SpecialField[];
    onChange?: (fields: SpecialField[]) => void;
};

const parseValues = (values: string | null) => (values ? values?.split('|')?.map((v) => v.trim()) : []);

const isEmpty = (field: SpecialField) => {
    if (field.type === 'CHECK_BOX') return false;
    if (field.type === 'CALENDAR') return !field.displayedValue;
    return !field.displayedValue || field.displayedValue === '';
};

const SpecialFields: React.FC<SpecialFieldsProps> = ({ specialFields, onChange }) => {
    const [touched, setTouched] = useState<boolean[]>(specialFields?.map(() => false));
    const [isTouched, setIsTouched] = useState(false);

    React.useEffect(() => {
        if (isTouched) {
            return;
        }
        setTouched(specialFields?.map(() => false));
        setIsTouched(true);
    }, [specialFields]);

    const handleFieldChange = (idx: number, value: any) => {
        const updated = specialFields?.map((f, i) => (i === idx ? { ...f, displayedValue: value } : f));
        onChange?.(updated);
    };

    const handleBlur = (idx: number) => {
        setTouched((prev) => {
            const next = [...prev];
            next[idx] = true;
            return next;
        });
    };

    if (!specialFields.length) return null;

    // Helper to render a single field
    const renderField = (field: SpecialField, idx: number) => {
        const key = field.id ?? idx;
        const showError = field.required && touched[idx] && isEmpty(field);

        const errorMsg = showError ? <small style={{ color: 'red' }}>{field.name} is required.</small> : null;

        switch (field.type) {
            case 'LABEL':
            return (
                <div className="divOptions_Row" key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    {field.name}
                    {field.required && <span style={{ color: 'red' }}> *</span>}
                </div>
                <div>{field.displayedValue}</div>
                </div>
            );
            case 'TEXT':
            return (
                <div className="divOptions_Row" key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor={`text_att_${key}`} className={field.required ? 'required' : ''}>
                    {field.name}
                    {field.required && <span style={{ color: 'red' }}> *</span>}
                </label>
                <InputText id={`text_att_${key}`} value={field.displayedValue} required={field.required} onChange={(e) => handleFieldChange(idx, e.target.value)} onBlur={() => handleBlur(idx)} className={showError ? 'p-invalid' : ''} />
                {errorMsg}
                </div>
            );
            case 'CALENDAR':
            return (
                <div className="divOptions_Row" key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor={`calendar_att_${key}`} className={field.required ? 'required' : ''}>
                    {field.name}
                    {field.required && <span style={{ color: 'red' }}> *</span>}
                </label>
                <Calendar
                    id={`calendar_att_${key}`}
                    value={field.displayedValue}
                    onChange={(e) => handleFieldChange(idx, e.value)}
                    showIcon
                    dateFormat="dd/M/yy"
                    required={field.required}
                    readOnlyInput
                    onBlur={() => handleBlur(idx)}
                    className={showError ? 'p-invalid' : ''}
                    showTime
                    hourFormat="24"
                />
                {errorMsg}
                </div>
            );
            case 'COMBO_BOX':
            return (
                <div className="divOptions_Row" key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor={`combobox_att_${key}`} className={field.required ? 'required complaint-info-label' : 'complaint-info-label'}>
                    {field.name}
                    {field.required && <span style={{ color: 'red' }}> *</span>}
                </label>
                <Dropdown
                    id={`combobox_att_${key}`}
                    value={field.displayedValue}
                    options={parseValues(field.values)?.map((v) => ({
                    label: v,
                    value: v
                    }))}
                    onChange={(e) => handleFieldChange(idx, e.value)}
                    placeholder="Select"
                    required={field.required}
                    showClear
                    onBlur={() => handleBlur(idx)}
                    className={showError ? 'p-invalid w-full' : 'w-full'}
                />
                {errorMsg}
                </div>
            );
            case 'CHECK_BOX':
            return (
                <div className="divOptions_Row" key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor={`checkbox_att_${key}`} className={field.required ? 'required' : ''}>
                    {field.name}
                    {field.required && <span style={{ color: 'red' }}> *</span>}
                </label>
                <Checkbox inputId={`checkbox_att_${key}`} checked={!!field.displayedValue} onChange={(e) => handleFieldChange(idx, e.checked)} onBlur={() => handleBlur(idx)} />
                {errorMsg}
                </div>
            );
            case 'TEXT_AREA':
            return (
                <div className="divOptions_Row row_textarea" key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor={`textarea_att_${key}`} className={field.required ? 'required' : ''}>
                    {field.name}
                    {field.required && <span style={{ color: 'red' }}> *</span>}
                </label>
                <InputTextarea
                    id={`textarea_att_${key}`}
                    value={field.displayedValue}
                    required={field.required}
                    onChange={(e) => handleFieldChange(idx, e.target.value)}
                    onBlur={() => handleBlur(idx)}
                    className={showError ? 'p-invalid' : ''}
                    rows={4}
                />
                {errorMsg}
                </div>
            );
            case 'RADIO':
            return (
                <div className="divOptions_Row" key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor={`radio_att_${key}`} className={field.required ? 'required' : ''}>
                    {field.name}
                    {field.required && <span style={{ color: 'red' }}> *</span>}
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {parseValues(field.values)?.map((option) => (
                    <div key={option} className="p-field-radiobutton">
                        <RadioButton
                        inputId={`radio_att_${key}_${option}`}
                        name={`radio_att_${key}`}
                        value={option}
                        onChange={(e) => handleFieldChange(idx, e.value)}
                        checked={field.displayedValue === option}
                        onBlur={() => handleBlur(idx)}
                        className={showError ? 'p-invalid' : ''}
                        />
                        <label htmlFor={`radio_att_${key}_${option}`}>{option}</label>
                    </div>
                    ))}
                </div>
                {errorMsg}
                </div>
            );
            default:
            return null;
        }
    };

    // Group fields into pairs for 2-column layout
    const fieldPairs: [SpecialField?, SpecialField?][] = [];
    for (let i = 0; i < specialFields.length; i += 2) {
        fieldPairs.push([specialFields[i], specialFields[i + 1]]);
    }

    return (
        <div className="border-t border-b border-gray-300 bg-amber-50 p-4 mb-2">
            {fieldPairs?.map(([field1, field2], rowIdx) => (
            <div
            key={rowIdx}
            className="flex gap-4 mb-4"
            >
            <div className="flex-1">{field1 && renderField(field1, rowIdx * 2)}</div>
            <div className="flex-1">{field2 && renderField(field2, rowIdx * 2 + 1)}</div>
            </div>
            ))}
        </div>
    );
};

export default SpecialFields;
