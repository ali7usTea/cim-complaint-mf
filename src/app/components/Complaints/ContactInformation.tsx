import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

import { imageURL } from '../../../utils/lib/proxyAPI';
import { UserCircle, Plus } from 'lucide-react';
interface ContactInfo {
    contactName: string;
    contactNumber: string;
    contactNumberType: string;
    contactEmail: string;
    preferredTime: string;
    person: string;
}

interface PreferredType {
    label: string;
    value: string;
}

interface ContactInformationProps {
    contactInfos: ContactInfo[];
    setContactInfos: React.Dispatch<React.SetStateAction<ContactInfo[]>>;
    errors?: any;
    touched?: any;
    setFieldValue?: any;
    preferredTimeOptions: PreferredType[];
}

const ContactInformation: React.FC<ContactInformationProps> = ({ contactInfos, setContactInfos, errors, touched, setFieldValue, preferredTimeOptions }) => {
    // Use Formik state directly
    const internalContactInfos = contactInfos;
    // Local options state
    const { Customers } = useSelector((state: RootState) => state.customerslice);
    const { accountID, productCode, EBILL_CONTACT, accountNumber, customerName, customerEmail, customerSegment, complaintCaptureType } = Customers[Object.keys(Customers)?.[0]] || {};

    // Function to check if customer segment is consumer
    const isConsumerCustomerSegment = (): boolean => {
        return customerSegment?.toString().toLowerCase().includes('consumer') ?? false;
    };

    // Function to check if fields should be disabled
    const isFieldDisabled = (): boolean => {
        return complaintCaptureType === 'UPDATE';
    };

    // Validation functions
    const validateContactName = (name: string): string | null => {
        const regex = /^([A-Za-z '.])*$/;
        if (name && !regex.test(name)) {
            return 'Invalid contact name';
        }
        return null;
    };

    const validateContactNumber = (number: string): string | null => {
        const regex = /^[0-9]*$/;
        if (number && !regex.test(number)) {
            return 'Contact number must contain only numbers';
        }
        return null;
    };

    const validateContactEmail = (email: string): string | null => {
        const regex = /(^\s+$|^$|^.*@.*\..*$)?/;
        if (email && !regex.test(email)) {
            return 'Invalid email format';
        }
        return null;
    };

    // State for inline validation errors
    const [validationErrors, setValidationErrors] = useState<{ [key: number]: { contactName?: string; contactNumber?: string; contactEmail?: string } }>({});

    // Icon mapping for contact number types
    const iconMapping: Record<string, string> = {
        ebill: `${imageURL}/ebilicon.png`,
        lastComplaint: `${imageURL}/contactNoIcon.png`,
        current: `${imageURL}/currentCall.png`
    };

    const [typeOptions] = useState([
        { label: 'Mobile', value: 'MOBILE' },
        { label: 'Landline', value: 'PHONE' },
        { label: 'International', value: 'INTERNATIONAL' }
    ]);

    const [personOptions] = useState([
        { label: 'Owner', value: 'Owner', disabled: false },
        { label: 'Caller', value: 'Caller', disabled: isConsumerCustomerSegment() },
        { label: 'Site Contact', value: 'Site Contact', disabled: isConsumerCustomerSegment() },
        { label: 'Other', value: 'Other', disabled: false }
    ]);
    // Contact number dropdown options
    const [contactNumberOptions, setContactNumberOptions] = useState<Array<{ label: string; value: string; type?: string }>>([]);
    // Contact number suggestions for autocomplete
    const [contactNumberSuggestions, setContactNumberSuggestions] = useState<string[]>([]);

    useEffect(() => {
        // Build contact number options from client-side data only
        const options: Array<{ label: string; value: string; type?: string }> = [];

        // Add "Last Complaint" option if first contactInfo has a number different from current
        if (contactInfos.length > 0 && contactInfos[0].contactNumber && contactInfos[0].contactNumber !== accountNumber && contactInfos[0].contactNumber !== EBILL_CONTACT) {
            options.push({
                label: `Last Complaint - ${contactInfos[0].contactNumber}`,
                value: contactInfos[0].contactNumber,
                type: 'lastComplaint'
            });
        }

        // Add Current option if accountNumber is available
        if (accountNumber) {
            options.push({
                label: `Current - ${accountNumber}`,
                value: accountNumber,
                type: 'current'
            });
        }

        // Add Ebill option if EBILL_CONTACT is available
        if (EBILL_CONTACT) {
            options.push({
                label: `Ebill - ${EBILL_CONTACT}`,
                value: EBILL_CONTACT,
                type: 'ebill'
            });
        }

        setContactNumberOptions(options);
    }, [contactInfos, accountNumber, EBILL_CONTACT]);

    // Add new contact info (max 3)
    const addContactInfo = () => {
        if (internalContactInfos.length < 3) {
            const newInfos = [
                ...internalContactInfos,
                {
                    contactName: '',
                    contactNumber: '',
                    contactNumberType: 'MOBILE',
                    contactEmail: '',
                    preferredTime: 'MORNING',
                    person: 'Owner'
                }
            ];
            setContactInfos(newInfos);
            if (typeof setFieldValue === 'function') setFieldValue('contactInfos', newInfos);
        }
    };
    // Remove contact info
    const removeContactInfo = (idx: number) => {
        if (internalContactInfos.length > 1) {
            const newInfos = internalContactInfos.filter((_, i) => i !== idx);
            setContactInfos(newInfos);
            if (typeof setFieldValue === 'function') setFieldValue('contactInfos', newInfos);
        }
    };
    // Search contact number options
    const searchContactNumber = (event: { query: string }) => {
        const query = event.query.toLowerCase();
        const filtered = contactNumberOptions.filter((option) => option.label.toLowerCase().includes(query)).map((option) => option.label);
        setContactNumberSuggestions(filtered.length > 0 ? filtered : contactNumberOptions.map((opt) => opt.label));
    };

    // Update contact info with validation
    const updateContactInfo = (idx: number, field: string, value: string) => {
        const newInfos = internalContactInfos?.map((info, i) => (i === idx ? { ...info, [field]: value } : info));

        // Perform inline validation
        const newValidationErrors = { ...validationErrors };
        if (!newValidationErrors[idx]) {
            newValidationErrors[idx] = {};
        }

        if (field === 'contactName') {
            const error = validateContactName(value);
            if (error) {
                newValidationErrors[idx].contactName = error;
            } else {
                delete newValidationErrors[idx].contactName;
            }
        } else if (field === 'contactNumber') {
            const error = validateContactNumber(value);
            if (error) {
                newValidationErrors[idx].contactNumber = error;
            } else {
                delete newValidationErrors[idx].contactNumber;
            }
        } else if (field === 'contactEmail') {
            const error = validateContactEmail(value);
            if (error) {
                newValidationErrors[idx].contactEmail = error;
            } else {
                delete newValidationErrors[idx].contactEmail;
            }
        }

        setValidationErrors(newValidationErrors);
        setContactInfos(newInfos);
        if (typeof setFieldValue === 'function') setFieldValue('contactInfos', newInfos);
    };

    // Custom header renderer with remove button
    const renderHeader = (_info: ContactInfo, idx: number) => {
        return (
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-between w-full  ">
                    <div className='flex items-center gap-2 font-normal text-sm!'>
                        <div className="w-10 h-10 rounded-[10px] bg-[#F0E9ED] text-mauves flex items-center justify-center">
                            <UserCircle className="h-7 w-7" strokeWidth={1.25} />
                        </div>
                        {`Contact Information ${idx >= 1 ? idx + 1 : ''}`}</div>
                    <div>                
                        <button
                            type="button"
                            onClick={addContactInfo}
                            disabled={internalContactInfos.length >= 3 || isFieldDisabled()}
                            className={`flex items-center justify-center ${
                            internalContactInfos.length < 3 && !isFieldDisabled() ? 'cursor-pointer' : 'cursor-not-allowed '
                            }`}
                            style={{ }}
                            title="Add Contact">
                            <Plus className="h-6 w-6" strokeWidth={1.25} />
                        </button></div>
                </div>
                {idx !== 0 && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent accordion toggle
                            removeContactInfo(idx);
                        }}
                        className="bg-[#ff8c26] text-white border border-[#d97706] shadow-lg rounded-full w-[24px] h-[24px] flex items-center justify-center font-extrabold text-[20px] cursor-pointer transition duration-150 ease-in-out hover:bg-[#d97706] hover:scale-110"
                        style={{ zIndex: 10, textShadow: '0 1px 2px #000', backgroundColor: '#6366f1' }}
                        title="Remove Contact"
                    >
                        <span style={{ color: '#fff', fontWeight: 900, fontSize: '20px', textShadow: '0 1px 2px #000' }}>−</span>
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="complaintInformation">
            <style>{`
                .contact-accordion .p-accordion-header-link {
                    flex-direction: row-reverse;
                }
                .contact-accordion .p-accordion-toggle-icon {
                    position: absolute;
                    left: 200px;
                }
            `}</style>
            <Accordion multiple activeIndex={0} className="contact-accordion">
                {internalContactInfos?.map((info, idx) => (
                    <AccordionTab key={idx} header={renderHeader(info, idx)}>
                        <div className="rounded-b-lg p-3 mb-3 bg-white relative">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-18 gap-y-2">
                                <div className='flex items-center gap-4'>
                                    <label className=" min-w-45! font-normal! text-sm">Contact Name *</label>
                                    <InputText value={info.contactName} onChange={(e) => updateContactInfo(idx, 'contactName', e.target.value)} className="h-[43px] w-full" placeholder="Enter contact name" disabled={isFieldDisabled()} required />
                                    {validationErrors[idx]?.contactName && <span style={{ color: 'red' }}>{validationErrors[idx].contactName}</span>}
                                    {touched?.contactInfos?.[idx]?.contactName && errors?.contactInfos?.[idx]?.contactName && <span style={{ color: 'red' }}>{errors.contactInfos[idx].contactName}</span>}
                                </div>
                                <div className='flex items-center gap-4'>
                                    <label className=" min-w-45! font-normal! text-sm">Contact Number *</label>
                                    <AutoComplete
                                        value={info.contactNumber}
                                        suggestions={contactNumberSuggestions}
                                        completeMethod={searchContactNumber}
                                        onChange={(e) => updateContactInfo(idx, 'contactNumber', e.value)}
                                        dropdown
                                        className="w-full mt-1"
                                        placeholder="Select or type contact number"
                                        disabled={isFieldDisabled()}
                                    />
                                    {validationErrors[idx]?.contactNumber && <span style={{ color: 'red' }}>{validationErrors[idx].contactNumber}</span>}
                                    {touched?.contactInfos?.[idx]?.contactNumber && errors?.contactInfos?.[idx]?.contactNumber && <span style={{ color: 'red' }}>{errors.contactInfos[idx].contactNumber}</span>}
                                </div>
                                <div className='flex items-center gap-4'>
                                    <label className=" min-w-45! font-normal! text-sm">Contact Email</label>
                                    <InputText
                                        type="email"
                                        value={info.contactEmail}
                                        onChange={(e) => updateContactInfo(idx, 'contactEmail', e.target.value)}
                                        className="h-[43px] w-full"
                                        placeholder="Enter contact email"
                                        disabled={isFieldDisabled()}
                                    />
                                    {validationErrors[idx]?.contactEmail && <span style={{ color: 'red' }}>{validationErrors[idx].contactEmail}</span>}
                                    {touched?.contactInfos?.[idx]?.contactEmail && errors?.contactInfos?.[idx]?.contactEmail && <span style={{ color: 'red' }}>{errors.contactInfos[idx].contactEmail}</span>}
                                </div>
                                <div className='flex items-center gap-4'>
                                    <label className=" min-w-45! font-normal! text-sm">Type</label>
                                    <Dropdown value={info.contactNumberType} options={typeOptions} onChange={(e) => updateContactInfo(idx, 'contactNumberType', e.value)} className="w-full" disabled={isFieldDisabled()} />
                                </div>
                                <div className='flex items-center gap-4'>
                                    <label className=" min-w-45! font-normal! text-sm">Preferred Time</label>
                                    <Dropdown value={info.preferredTime} options={preferredTimeOptions} onChange={(e) => updateContactInfo(idx, 'preferredTime', e.value)} className="w-full" disabled={isFieldDisabled()} />
                                </div>
                                <div className='flex items-center gap-4'>
                                    <label className=" min-w-45! font-normal! text-sm">Person</label>
                                    <Dropdown value={info.person} options={personOptions} optionDisabled="disabled" onChange={(e) => updateContactInfo(idx, 'person', e.value)} className="w-full" disabled={isFieldDisabled()} />
                                </div>
                            </div>
                        </div>
                    </AccordionTab>
                ))}
            </Accordion>
        </div>
    );
};

export default ContactInformation;
