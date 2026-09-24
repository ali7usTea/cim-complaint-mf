import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { fetchMainClosureList, fetchClosureList, fetchAuxClosureList, fetchComplaintCategories, ClosureOption, ComplaintCategoryOption } from '../../../../utils/complaints/fetchFcrClosureData';

interface FcrClosureFormProps {
    fields?: any;
    errors?: any;
    touched?: any;
    handleChange?: any;
    setFieldValue?: any;
    isClosureOpen?: boolean;
}

function FormFCR({ fields: parentFields, setFieldValue: parentSetFieldValue, isClosureOpen }: FcrClosureFormProps = {}) {
    // Dropdown options lists
    const [mainDescriptionList, setMainDescriptionList] = useState<ClosureOption[]>([]);
    const [closureDescriptionList, setClosureDescriptionList] = useState<ClosureOption[]>([]);
    const [auxiliaryDescriptionList, setAuxiliaryDescriptionList] = useState<ClosureOption[]>([]);
    const [complaintCategoryList, setComplaintCategoryList] = useState<ComplaintCategoryOption[]>([]);

    // Selected values (IDs)
    const [selectedMainClosureId, setSelectedMainClosureId] = useState<number | null>(null);
    const [selectedClosureId, setSelectedClosureId] = useState<number | null>(null);
    const [selectedAuxiliaryId, setSelectedAuxiliaryId] = useState<number | null>(null);
    const [selectedComplaintCategory, setSelectedComplaintCategory] = useState<string>('');

    // Fetch Main Closure List and Complaint Categories on mount
    useEffect(() => {
        const loadInitialData = async () => {
            // Fetch Main Closure List
            const mainClosures = await fetchMainClosureList();
            setMainDescriptionList(mainClosures);

            // Set first option as default if available
            if (mainClosures.length > 0) {
                const firstOption = mainClosures[0];
                setSelectedMainClosureId(firstOption.closureId);
                handleChange('mainClosureDescription', firstOption.closureId);
            }

            // Fetch Complaint Categories (independent dropdown)
            const categories = await fetchComplaintCategories();
            setComplaintCategoryList(categories);

            // Set first category as default if available
            if (categories.length > 0) {
                const firstCategory = categories[0].complaintCategory;
                setSelectedComplaintCategory(firstCategory);
                handleChange('complaintCategory', firstCategory);
            }
        };

        loadInitialData();
    }, []);

    // Fetch Closure Description when Main Closure changes
    useEffect(() => {
        const loadClosureList = async () => {
            if (selectedMainClosureId) {
                const closures = selectedMainClosureId ? await fetchClosureList(selectedMainClosureId) : await fetchClosureList();
                setClosureDescriptionList(closures);

                // Set first option as default if available
                if (closures.length > 0) {
                    const firstOption = closures[0];
                    setSelectedClosureId(firstOption.closureId);
                    handleChange('closureDescription', firstOption.closureId);
                } else {
                    // Reset if no options
                    setSelectedClosureId(null);
                    handleChange('closureDescription', null);
                }
            } else {
                // Reset dependent dropdowns
                setClosureDescriptionList([]);
                setSelectedClosureId(null);
                handleChange('closureDescription', null);
            }
        };

        loadClosureList();
    }, [selectedMainClosureId]);

    // Fetch Auxiliary Closure when Closure Description changes
    useEffect(() => {
        const loadAuxClosureList = async () => {
            if (selectedClosureId) {
                const auxClosures = selectedClosureId ? await fetchAuxClosureList(selectedClosureId) : await fetchAuxClosureList();
                setAuxiliaryDescriptionList(auxClosures);

                // Set first option as default if available
                if (auxClosures.length > 0) {
                    const firstOption = auxClosures[0];
                    setSelectedAuxiliaryId(firstOption.closureId);
                    handleChange('auxiliaryDescription', firstOption.closureId);
                } else {
                    // Reset if no options
                    setSelectedAuxiliaryId(null);
                    handleChange('auxiliaryDescription', null);
                }
            } else {
                // Reset dependent dropdown
                setAuxiliaryDescriptionList([]);
                setSelectedAuxiliaryId(null);
                handleChange('auxiliaryDescription', null);
            }
        };

        loadAuxClosureList();
    }, [selectedClosureId]);

    type FieldsType = { [key: string]: any };
    const [fields, setFields] = useState<FieldsType>({
        mainClosureDescription: parentFields?.mainClosureDescription || null,
        closureDescription: parentFields?.closureDescription || null,
        auxiliaryDescription: parentFields?.auxiliaryDescription || null,
        complaintCategory: parentFields?.complaintCategory || '',
        fcrRemarks: parentFields?.fcrRemarks || ''
    });

    // Sync internal state to parent Formik state
    useEffect(() => {
        if (parentSetFieldValue) {
            Object.keys(fields).forEach((key) => {
                if (parentFields && fields[key] !== parentFields[key]) {
                    parentSetFieldValue(key, fields[key], false);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fields]);

    const [errors, setErrors] = useState({
        mainClosureDescription: '',
        closureDescription: '',
        auxiliaryDescription: '',
        complaintCategory: '',
        fcrRemarks: ''
    });

    const validate = (name: string, value: any) => {
        console.log('FCR BLock::: isClosureOpen in validate:', isClosureOpen);
        if(isClosureOpen) {
            switch (name) {
                case 'mainClosureDescription':
                    if (value === null || value === undefined) return 'Main Closure Description is required';
                    return '';
                case 'closureDescription':
                    if (!value) return 'Closure Description is required';
                    return '';
                case 'auxiliaryDescription':
                    if (!value) return 'Auxiliary Description is required';
                    return '';
                case 'complaintCategory':
                    if (!value) return 'Complaint Category is required';
                    return '';
                case 'fcrRemarks':
                    if (!value) return 'Remarks are required';
                    return '';
                default:
                    return '';
            }
        } else {
            return '';
        }
    };

    const handleChange = (name: string, value: any) => {
        setFields((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: typeof errors = {
            mainClosureDescription: validate('mainClosureDescription', fields.mainClosureDescription),
            closureDescription: validate('closureDescription', fields.closureDescription),
            auxiliaryDescription: validate('auxiliaryDescription', fields.auxiliaryDescription),
            complaintCategory: validate('complaintCategory', fields.complaintCategory),
            fcrRemarks: validate('fcrRemarks', fields.fcrRemarks)
        };
        setErrors(newErrors);
        if (Object.values(newErrors).every((err) => !err)) {
            alert('Form submitted!');
            // const submitted = axios.get(`${apiAxios}/...`);
            // console.log('form submited...');
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className='section-wrap-row grid grid-cols-1! xl:grid-cols-2! w-full gap-0! xl:gap-18! mt-2'>
                <div className='complaint-info mb-2 lg:mt-0'>
                    <label className='complaint-info-label'>
                        Main Closure Description: <span className="text-red-600">*</span>{' '}
                    </label>
                    <div>
                    <Dropdown
                        value={selectedMainClosureId}
                        options={mainDescriptionList}
                        onChange={(e) => {
                            const newId = e.value;
                            setSelectedMainClosureId(newId);
                            handleChange('mainClosureDescription', newId);
                        }}
                        optionLabel="closureDescription"
                        optionValue="closureId"
                        placeholder="Select Main Closure Description"
                        required
                        style={{ width: '100%' }}
                    />
                    {errors.mainClosureDescription && <span style={{ color: 'red' }}>{errors.mainClosureDescription}</span>}
                    </div>
                </div>
                <div className="complaint-info ">
                    <label className="complaint-info-label">
                        Closure Description: <span className="text-red-600">*</span>
                    </label>
                    <div>
                    <Dropdown
                        value={selectedClosureId}
                        options={closureDescriptionList}
                        onChange={(e) => {
                            const newId = e.value;
                            setSelectedClosureId(newId);
                            handleChange('closureDescription', newId);
                        }}
                        optionLabel="closureDescription"
                        optionValue="closureId"
                        placeholder="Select Closure Description"
                        required
                        // disabled={!selectedMainClosureId || closureDescriptionList.length === 0}
                        style={{ width: '100%' }}
                    />
                    {errors.closureDescription && <span style={{ color: 'red' }}>{errors.closureDescription + " ****** "}</span>}
                    </div>
                </div>
            </div>
            <div className='section-wrap-row grid grid-cols-1! xl:grid-cols-2! w-full gap-0! xl:gap-18! mt-2'>
                <div className='complaint-info'>
                    <label className='complaint-info-label'>
                        Auxiliary Description: <span className="text-red-600">*</span>
                    </label>
                    <div>
                    <Dropdown
                        value={selectedAuxiliaryId}
                        options={auxiliaryDescriptionList}
                        onChange={(e) => {
                            const newId = e.value;
                            setSelectedAuxiliaryId(newId);
                            handleChange('auxiliaryDescription', newId);
                        }}
                        optionLabel="closureDescription"
                        optionValue="closureId"
                        placeholder="Select Auxiliary Description"
                        required
                        className='w-full'
                        // disabled={!selectedClosureId || auxiliaryDescriptionList.length === 0}

                    />
                    {errors.auxiliaryDescription && <span style={{ color: 'red' }}>{errors.auxiliaryDescription + "*****"}</span>}
                    </div>
                </div>
                <div className='complaint-info lg:mt-0 mt-2'>
                    <label className='complaint-info-label'>
                        Complaint Category: <span className="text-red-600">*</span>
                    </label>
                    <Dropdown
                        value={selectedComplaintCategory}
                        options={complaintCategoryList}
                        onChange={(e) => {
                            const newCategory = e.value;
                            setSelectedComplaintCategory(newCategory);
                            handleChange('complaintCategory', newCategory);
                        }}
                        optionLabel="complaintCategory"
                        optionValue="complaintCategory"
                        placeholder="Select Complaint Category"
                        required
                        style={{ width: '100%' }}
                    />
                    {errors.complaintCategory && <span style={{ color: 'red' }}>{errors.complaintCategory}</span>}
                </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label>Remarks:</label>
                <div style={{ position: 'relative' }}>
                    <InputTextarea
                        value={fields.fcrRemarks}
                        onChange={(e) => {
                            const value = e.target.value.slice(0, 250);
                            handleChange('fcrRemarks', value);
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
                            color: fields.fcrRemarks.length >= 250 ? 'red' : '#888'
                        }}
                    >
                        {250 - fields.fcrRemarks.length} characters left
                    </span>
                </div>
                {errors.fcrRemarks && <span style={{ color: 'red' }}>{errors.fcrRemarks}</span>}
            </div>
        </form>
    );
}

export default FormFCR;
