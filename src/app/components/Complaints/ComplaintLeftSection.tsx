import React, { useEffect, useMemo, useState } from 'react';
import { ComplaintNature, ComplaintType } from '.';
import { CardSim, MessageSquareQuote, MessagesSquare, UserCircle } from 'lucide-react';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';


type ComplaintLeftSectionProps = {
    natures: ComplaintNature[];
    selectedNature: ComplaintNature | null;
    setSelectedNature: (natureCode: ComplaintNature | null) => void;
    selectedType: ComplaintType | null;
    setSelectedType: (typeCode: ComplaintType | null) => void;
    setFieldValue: any;
};

function ComplaintLeftSection({ setFieldValue, natures, selectedNature, setSelectedNature, selectedType, setSelectedType }: ComplaintLeftSectionProps) {
    const [natureStr, setNatureStr] = useState('');
    const [typeStr, setTypeStr] = useState('');

    const types = useMemo(
        () =>
            natures.find((nature) => {
                return nature.code === selectedNature?.code;``
            })?.types || [],
        [natures, selectedNature]
    );

    return (
        <>
        <div className="left-section border border-neutral-400 bg-white w-[25%] p-2">
                {/* <div className="arrow_label">Select Impacted Service</div> */}
                <div className='widgetWrapper  mb-2' >
                <div className='w-full flex flex-col! xl:flex-row!'>
                    <div className="w-full flex gap-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 cursor-pointer mb-2">
                            <div className="w-10 h-10 rounded-[10px] bg-[#F0E9ED] text-mauves flex items-center justify-center">
                                <CardSim className="h-7 w-7" strokeWidth={1.25} />
                            </div>
                            <h2 className="pt-0.75 text-sm!">Select Impacted Service</h2>
                            </div>
                        </div>
                    </div>
                    <div className="searchDiv mb-2 lg:mb-0">
                        <IconField iconPosition="left">
                        <InputIcon className="pi pi-search transform! -translate-y-1/2! left-2" />
                        <InputText
                            placeholder="Search services…"
                            data-pc-name="inputtext"
                            value={natureStr}
                            onChange={({ target: { value } }) => setNatureStr(value)}
                            className="bg-[#F4F2F8]! p-2! pl-8! pt-2! leading-5 border border-neutral-600 rounded-[6px]!  w-38! lg:w-55 searchInputField text-sm! font-normal!"
                        />
                        </IconField>
                    </div>
                </div>

                <ul id="natureListUL" className=' service-listing max-h-[40vh] overflow-auto  mb-4'>
                    {natures
                        .filter((nature) => nature.description?.toLowerCase().includes(natureStr?.toLowerCase() || ''))
                        ?.map((nature) => {
                            return (
                                <li
                                    key={nature.code}
                                    id={nature.code}
                                    className={nature.code?.toLowerCase() === selectedNature?.code?.toLowerCase() ? 'ActiveClass' : ''}
                                    onClick={() => {
                                        setSelectedNature(nature);
                                        const types = nature.types || [];
                                        const { specialFields } = types?.[0] || {};
                                        setFieldValue('specialFields', specialFields || []);
                                        setSelectedType(types?.[0]);
                                    }}
                                >
                                    {nature.description}
                                </li>
                            );
                        })}
                </ul>
            <div>
              </div>
              </div>
        <div className='widgetWrapper mb-2' >
<div className='w-full flex flex-col! xl:flex-row! py-2'>
                    <div className="w-full flex  gap-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 cursor-pointer mb-2">
                            <div className="w-10 h-10 rounded-[10px] bg-[#F0E9ED] text-mauves flex items-center justify-center">
                                <MessagesSquare className="h-6 w-6" strokeWidth={1.25} />
                            </div>
                            <h2 className="pt-0.75 text-sm!">Select Complaint Type</h2>
                            </div>
                        </div>
                    </div>
                    <div className="searchDiv mb-2 lg:mb-0">
                        <IconField iconPosition="left">
                        <InputIcon className="pi pi-search transform! -translate-y-1/2! left-2" />
                        <InputText
                            placeholder="Search Types..."
                            data-pc-name="inputtext"
                            value={typeStr}
                            onChange={({ target: { value } }) => setTypeStr(value)}
                            className="bg-[#F4F2F8]! p-2! pl-8! pt-2! leading-5 border border-neutral-600 rounded-[6px]!  w-38! lg:w-55  searchInputField text-sm! font-normal!"
                        />
                        </IconField>
                    </div>
                </div>


                <ul id="typeListUL" className='service-listing max-h-[40vh] overflow-auto mb-4'>
                    {types
                        .filter((type) => type.description?.toLowerCase().includes(typeStr?.toLowerCase()))
                        ?.map((type) => {
                            return (
                                <li
                                    key={`${type.code} ${type.description} ${type.id}`}
                                    id={type.code}
                                    className={type.code?.toLowerCase() === selectedType?.code?.toLowerCase() ? 'ActiveClass' : ''}
                                    onClick={
                                        () => {
                                            setSelectedType(type);
                                            const { specialFields } = type || {};
                                            setFieldValue('specialFields', specialFields || []);
                                        }
                                        // LATER when required
                                        // unselectSubrequest()
                                    }
                                >
                                    {type.description}
                                </li>
                            );
                        })}
                </ul>
            </div>

       
        
        
        
        
        </div>


            </>
    );
}

export default ComplaintLeftSection;
