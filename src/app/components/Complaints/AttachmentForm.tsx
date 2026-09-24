import React, { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Button } from 'primereact/button';
import { Paperclip, Plus, UserCircle } from 'lucide-react';

export interface AttachmentInfo {
    name: string;
    type: string;
    size: string;
    file?: File;
    attachmentId?: any;
}

const typeOptions = [
    { name: 'Passport', code: 'PASSPORT' },
    { name: 'Emirates ID', code: 'EMIRATESID' },
    { name: 'Tenancy Contract', code: 'TENANCYCONTRACT' },
    { name: 'Electricity Bill', code: 'ELECTRICITYBILL' },
    { name: 'Telephone Bill', code: 'TELEPHONEBILL' },
    { name: 'Driving License', code: 'DRIVINGLICENSE' },
    { name: 'Cheque Copy', code: 'CHEQUECOPY' },
    { name: 'Envelop Copy', code: 'ENVELOPCOPY' },
    { name: 'Bank Statement', code: 'BANKSTATEMENT' },
    { name: 'Allocation List', code: 'ALLOCATIONLIST' },
    { name: 'Faul Treport Form', code: 'FAULTREPORTFORM' },
    { name: 'TCP Dump', code: 'TCPDUMP' }
];

type Props = {
    parentAttachmentInfos?: AttachmentInfo[];
    parentSetAttachmentInfos?: (infos: AttachmentInfo[]) => void;
};

const AttachmentForm: React.FC<Props> = ({ parentAttachmentInfos, parentSetAttachmentInfos }) => {
    const { Customers } = useSelector((state: RootState) => state.customerslice);
    const { settings } = useSelector((state: RootState) => state.settingSlice);
    const { contactNumber } = Customers[Object.keys(Customers)?.[0]] || {};
    const [attachmentInfos, setAttachmentInfos] = useState<AttachmentInfo[]>(parentAttachmentInfos || []);

    // Sync local state from parentAttachmentInfos only when it changes
    useEffect(() => {
        setAttachmentInfos(parentAttachmentInfos || []);
    }, [parentAttachmentInfos]);

    const validation = (settings as any)?.['activitysystem.attachment.validation.regex'];

    // Helper to check file type against regex
    const isValidFileType = (file: File) => {
        // If no validation regex, allow all
        if (!validation) return true;
        // Remove leading/trailing slashes if present
        let pattern = validation;
        if (typeof pattern === 'string' && pattern.startsWith('/')) {
            pattern = pattern.slice(1);
        }
        if (typeof pattern === 'string' && pattern.endsWith('/')) {
            pattern = pattern.slice(0, -1);
        }
        // Create regex with case-insensitive flag
        const regex = new RegExp(pattern, 'i');
        return regex.test(file.name);
    };

    // Extract allowed extensions for input accept prop
    let acceptExtensions = '';
    if (validation) {
        acceptExtensions = validation?.split('/(\\.|\\/)(')?.[1]?.split?.(')$/')?.[0]?.split?.('|')?.join(',');
    }

    const renderHeader = () => (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between w-full">
                <div className='flex items-center gap-2 font-normal text-sm!'>
                    <div className="w-10 h-10 rounded-[10px] bg-[#F0E9ED] text-mauves flex items-center justify-center">
                        <Paperclip className="h-7 w-7" strokeWidth={1.25} />
                    </div>
                    Attachments
                </div>
                <div>
                    <button
                        type="button"
                        className="flex items-center justify-center cursor-pointer"
                        style={{ }}
                        title="Attachment Info"
                    >
                        <Plus className="h-6 w-6" strokeWidth={1.25} />
                    </button>
                </div>
            </div>
        </div>
    );

    // Always preserve the file property when updating
    const updateAttachmentInfos = (name: string, updatedInfo: AttachmentInfo) => {
        setAttachmentInfos((prev) => {
            const updated = prev?.map((prevValue) => {
                if (prevValue.name === name) {
                    // Always keep the file property from previous value if not provided in updatedInfo
                    return { ...prevValue, ...updatedInfo, file: updatedInfo.file ?? prevValue.file };
                }
                return prevValue;
            });
            // Only call parentSetAttachmentInfos when user changes attachments
            if (parentSetAttachmentInfos) parentSetAttachmentInfos(updated);
            return updated;
        });
    };

    // Remove the effect that calls parentSetAttachmentInfos on every attachmentInfos change

    const handleAttach = () => {};

    const handleRemove = (idx: number) => {
        setAttachmentInfos((prev) => prev.filter((_, i) => i !== idx));

        const filteredAttachments= parentAttachmentInfos?.filter((_, i) => i !== idx)
        if (parentSetAttachmentInfos) parentSetAttachmentInfos(filteredAttachments || []);
    };

    return (
        <>
            <style>{`
                .attachment-accordion .p-accordion-header-link {
                    flex-direction: row-reverse;
                }
                .attachment-accordion .p-accordion-toggle-icon {
                    position: absolute;
                    left: 200px;
                }
            `}</style>
            <Accordion activeIndex={null} className="attachment-accordion">
                <AccordionTab header={renderHeader()}>
                    <div className="flex justify-end gap-2 mb-4 mt-2">
                        <input
                            type="file"
                            id="fileInput"
                            multiple
                            style={{ display: 'none' }}
                            accept={acceptExtensions}
                            onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                const validFiles = files.filter(isValidFileType);
                                const invalidFiles = files.filter((file) => !isValidFileType(file));
                                if (invalidFiles.length > 0) {
                                    alert('These files are not allowed: ' + invalidFiles?.map((f) => f.name).join(', '));
                                }
                                const newAttachments = validFiles?.map((file) => ({
                                    name: file.name,
                                    type: 'PASSPORT',
                                    size: `${(file.size / 1024).toFixed(2)} KB`,
                                    file: file
                                }));
                                setAttachmentInfos((prev) => [...prev, ...newAttachments]);
                                parentSetAttachmentInfos && parentSetAttachmentInfos([...(parentAttachmentInfos || []), ...newAttachments])
                            }}
                        />
                        <Button type="button" label="Choose" className="p-button-success" icon="pi pi-plus" onClick={() => document.getElementById('fileInput')?.click()} />
                        <Button
                            type="button"
                            label="Cancel"
                            className="p-button-secondary"
                            icon="pi pi-times"
                            onClick={() => {
                                setAttachmentInfos([]);
                                parentSetAttachmentInfos && parentSetAttachmentInfos([])
                            }}
                        />
                    </div>
                    {attachmentInfos?.map((info, idx) => {
                        if (info.attachmentId) {
                            return (
                                <div className="flex items-center gap-4">
                                    <Button
                                        type="button"
                                        className="p-button-link text-blue-600 underline cursor-pointer"
                                        style={{ width: '300px' }}
                                        title={info.name}
                                        onClick={() => {
                                            if (info.file) {
                                                const blob = info.file;
                                                const fileName = info.name;
                                                // Create a temporary URL for the blob object
                                                const objectUrl = URL.createObjectURL(blob);

                                                // Create a temporary anchor element
                                                const anchor = document.createElement('a');
                                                anchor.style.display = 'none';
                                                anchor.href = objectUrl;
                                                anchor.download = fileName;

                                                document.body.appendChild(anchor);
                                                anchor.click();

                                                document.body.removeChild(anchor);
                                                URL.revokeObjectURL(objectUrl);
                                            }
                                        }}
                                    >
                                        {info.name}
                                    </Button>
                                    <div className="flex items-center gap-4 w-50">{info.size}</div>
                                </div>
                            );
                        } 
                        return (
                            <div className="border border-gray-300 rounded-lg p-3 mb-3 bg-gray-50 relative mt-2" key={info.name + idx}>
                                <div className="flex items-center gap-4 w-full">
                                    <div className="flex items-center gap-4 w-50">{info.name}</div>
                                    <div className="flex items-center gap-4 w-full">
                                        <label className="font-bold w-50">Document Type *</label>
                                        <Dropdown
                                            value={typeOptions.find((type) => type.code === info.type)}
                                            onChange={(e) => updateAttachmentInfos(info.name, { ...info, type: e.value.code })}
                                            options={typeOptions}
                                            optionLabel="name"
                                            placeholder="Select Type"
                                            className="w-[100%]"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 w-50">{info.size}</div>
                                    <Button type="button" style={{ padding: '0.5rem 1.5rem !important', background: 'white' }} onClick={() => handleRemove(idx)}>
                                        <i className="pi pi-times" style={{ color: 'red' }}></i>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </AccordionTab>
            </Accordion>
        </>
    );
};

export default AttachmentForm;
