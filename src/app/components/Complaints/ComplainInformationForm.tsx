import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { LuCheck } from 'react-icons/lu';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ComplaintNature, ComplaintType, LinkedComplaint } from '.';
import { ComplaintCaptureMode, ComplaintUpdateMode, ProvisioningType } from '../../../interfaces/complaintEnums';
import { RootState } from '../../../redux/store';
import { Service, ServicesTab } from '../../../utils/complaints/dto';
import { calculateSlaForRendering, calculateExpectedResolutionFromSla } from '../../../utils/complaints/complaintsSlaUtils';
import { fetchAccountExtensionOptions } from '../../../utils/complaints/fetchAccountExtensionOptions';
import { fetchMarkComplaintAsOptions } from '../../../utils/complaints/fetchMarkComplaintAsOptions';
import { fetchPreferredLanguages } from '../../../utils/complaints/fetchPreferredLanguages';
import { fetchPriorityFlagOptions } from '../../../utils/complaints/fetchPriorityFlagOptions';
import { fetchRegions } from '../../../utils/complaints/fetchRegions';
import { fetchReportingChannels } from '../../../utils/complaints/fetchReportingChannels';
import { fetchMainServices } from '../../../utils/complaints/fetchSelectedServices';
import { fetchSuspectedOutages } from '../../../utils/complaints/fetchSuspectedOutages';
import { useFetchGisUrl } from '../../hooks/useFetchGisUrl';
import { usePermissionChecker } from '../../hooks/usePermissionChecker';
import { labelsMapping } from './labelsMapping';
import ServiceSelect from './ServiceSelect';
import SubOrdersSection from './SubOrdersSection';
//@ts-ignore
import DataPanel from 'cim-ui-components/dist/components/DataPanel';
import LinkedComplaints from './LinkComplaint';
import { imageURL } from '../../../utils/lib/proxyAPI';
import { ActivityGroupCode } from '../../../utils/complaints/enums/ActivityGroupCode_Enum';
// const LAND_LINE_PRODUCT_GROUP = 'Fixed'; /*make the constant available in ProductBasedRenderService*/

function ComplaintInformationForm({
    selectedCategory,
    selectedNature,
    sourceChannelId,
    selectedType,
    setShouldShowFvr,
    fields,
    errors,
    touched: parentTouched,
    handleChange: parentHandleChange,
    setFieldValue: parentSetFieldValue,
    isAffectedServicesDisabled,
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
}: {
    selectedCategory: string;
    selectedNature: ComplaintNature | null;
    selectedType: ComplaintType | null;
    sourceChannelId: string;
    setShouldShowFvr: (value: boolean) => void;
    onSubmit: (data: any) => void;
    fields?: any;
    errors?: any;
    touched?: any;
    handleChange?: any;
    setFieldValue?: any;
    isAffectedServicesDisabled: () => boolean;
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
}) {
    const { Customers } = useSelector((state: RootState) => state.customerslice);
    const { complaintUpdateType, accountID, complaintCaptureType, productGroup, productCode, customerSegment, complaintId, regionCode, customerCategory, valueSegment, customerSegmentGroup } = Customers[Object.keys(Customers)?.[0]] || {};
    const [complaintCaptureMode, setComplaintCaptureMode] = useState<any>(complaintCaptureType);
    const { settings } = useSelector((state: RootState) => state.settingSlice);
    // const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    // const [allSelectedServices, setAllSelectedServices] = useState<any[]>([]);
    const [showServiceSelect, setShowServiceSeelct] = useState(false);
    const [preferredLanguages, setPreferredLanguages] = useState<string[]>([]);
    const [suspectedOutages, setSuspectedOutages] = useState<any[]>([]);
    const [regions, setRegions] = useState<any[]>([]);
    const [markComplaintAsOptions, setMarkComplaintAsOptions] = useState<any[]>([]);
    const [priorityFlagOptions, setPriorityFlagOptions] = useState<any[]>([]);
    const [reportingChannels, setReportingChannels] = useState<any[]>([]);
    const [servicesTabs, setServicesTabs] = useState<ServicesTab[]>([]);
    const [accountExtensionsList, setAccountExtensionsList] = useState<any[]>([]);

    /* const renderElifeDetails_GPON_setting = ((settings as any)?.['activitysystem.elife.product.codes'] || [])?.split(',')?.map((code: string) => code.trim()) as string[]; */
    const rawValue_GPON = (settings as any)?.['activitysystem.elife.product.codes'];
    const renderElifeDetails_GPON_setting = typeof rawValue_GPON === 'string' && rawValue_GPON !== '' ? rawValue_GPON?.split(',')?.map((code: string) => code.trim()) : [];

    /* const renderExtNo_settings = ((settings as any)?.['activitysystem.extension.no.product.codes'] || [])?.split(',')?.map((code: string) => code.trim()) as string[]; */
    const rawValue_ListPBX = (settings as any)?.['activitysystem.extension.no.product.codes'];
    const listPBX = typeof rawValue_ListPBX === 'string' && rawValue_ListPBX !== '' ? rawValue_ListPBX?.split(',')?.map((code: string) => code.trim()) : [];

    /**
     * Control fields for complaint form
     */
    const [complaintUpdate, setcomplaintUpdate] = useState<any>();
    const [bulkComplaintFlag, setBulkComplaintFlag] = useState(false);
    const [updatePriorityFlag, setUpdatePriorityFlag] = useState(false);
    const [showGisMapDialog, setShowGisMapDialog] = useState(false);

    // Use permission checker hook
    const { checkComplaintPermissionExists } = usePermissionChecker();

    // Use custom hook to fetch GIS URL
    const { gisURL } = useFetchGisUrl({
        selectedType,
        selectedProductService: fields.selectedProductService,
        selectedRegion: fields.region,
        customerCategory,
        valueSegment,
        customerSegment,
        regionCode,
        complaintCaptureType,
        complaintId
    });

    const femtoNetworkType = [
        { label: 'GPON', value: 'GPON' },
        { label: 'Copper', value: 'Copper' }
    ];

    useEffect(() => {
        Promise.all([
            fetchPreferredLanguages().catch(() => []),
            fetchSuspectedOutages().catch(() => []),
            fetchRegions().catch(() => []),
            fetchMarkComplaintAsOptions().catch(() => []),
            fetchPriorityFlagOptions().catch(() => []),
            fetchAccountExtensionOptions(accountID).catch(() => []),
            fetchMainServices(accountID).catch(() => [])
        ]).then(([langs, outages, regions, markComplaintAsOptions, priorityFlagOptions, accountExtensions, servicesTabsResponse]) => {
            setPreferredLanguages(langs);
            setSuspectedOutages(outages);
            setRegions(regions);
            setMarkComplaintAsOptions(markComplaintAsOptions);
            setPriorityFlagOptions(priorityFlagOptions);
            setAccountExtensionsList(accountExtensions);
            setServicesTabs(servicesTabsResponse);
        });
        fields.complaintCaptureType = 'ReActive';
    }, [accountID]);

    useEffect(() => {
        const setRegionValue = async () => {
            if (regionCode) {
                // If regionCode exists, set it directly
                handleChange('region', regionCode);
            }
            // else {
            //     // If regionCode doesn't exist, fetch it from API
            //     try {
            //         const response = await axios.get(`https://next.cimnewuat.etisalat.corp.ae/v1/bff/home360/custom/getCustomerInformation?accountId=${accountID}&CUST_SEGMENT_GROUP=${customerSegmentGroup}&CUST_PRODUCT_GROUP=${productGroup}`);
            //         // TODO: Change api or response mapping based on new api
            //         if (response.data?.regionCode) {
            //             handleChange('region', response.data.regionCode);
            //         }
            //     } catch (error) {
            //         console.error('Error fetching customer information:', error);
            //     }
            // }
        };
        if (!fields.region) {
            setRegionValue();
        }
    }, [regionCode, accountID, customerSegmentGroup, productGroup, fields.region]);

    useEffect(() => {
        fetchReportingChannels({
            categoryCode: selectedCategory,
            sourceChannelId: sourceChannelId
        })
            .then((channels) => {
                setReportingChannels(channels);
            })
            .catch(() => setReportingChannels([]));
    }, [selectedCategory, sourceChannelId]);

    const handleChange = (name: string, value: any) => {
        parentSetFieldValue(name, value);
    };

    const handleSelectedServicesChange = (services: Service[]) => {
        handleChange('selectedServices', services);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let updatedServices;
        if (event.target.checked) {
            const newService = servicesTabs.flatMap((category) => category.services).find((service) => service.id === value);
            updatedServices = [...fields.selectedServices, newService].filter(Boolean);
        } else {
            updatedServices = fields.selectedServices.filter((service: Service) => service.id !== value);
        }
        handleChange('selectedServices', updatedServices);
    };

    const fetchAllServices = () => {
        setShowServiceSeelct(true);
    };

    //TODO: how to set the isProvisioningByAccount?
    const getCustomerRegion = () => {
        let regionCode = '';
        if (complaintCaptureType == ComplaintCaptureMode.UPDATE.toString()) {
            regionCode = fields.region ? fields.region : '';
        } else {
            //     if (isProvisioningByAccount())
            //        regionCode = customer.getAccount().getRegionCode(new BigDecimal(provisiongComplaint.getProvisioningAccountId()));
            //    else
            //        regionCode = subscriberContainer.getRegionCode();
        }
        return regionCode;
    };

    const onSelectedType = () => {
        /* FCR Block working */
        const stat = selectedType?.fcr ? true : false;
        handleChange('fcrComplaint', stat);
        setShouldShowFvr(stat);

        if (isLandLine() && selectedType?.activityGroupCode !== ActivityGroupCode.PROVISION.toString() && selectedType?.activityGroupCode !== ActivityGroupCode.PROVISIONMANUAL.toString()) {
            fields.region = getCustomerRegion();
        }

        let slaAll: any = '';
        if (selectedType?.sla) {
            try {
                const parsedSla = typeof selectedType.sla === 'string' ? JSON.parse(selectedType.sla) : selectedType.sla;
                slaAll = parsedSla?.all ?? '';
            } catch (e) {
                slaAll = '';
            }
        }
        handleChange('sla', slaAll);
        // handleChange('kbArticleCandidate', selectedType?.kbURL);
        // Calculate and set expected resolution date based on SLA
        const expectedResolutionDate = calculateExpectedResolutionFromSla(slaAll);
        handleChange('expectedResolutionDate', expectedResolutionDate);
    };
    useEffect(() => {
        onSelectedType();
    }, [selectedType]);

    const onLinkedComplaintSelect = (selectedComplaintId: string | null, hasNewLinkedComplaint: boolean, newLinkedComplaint: LinkedComplaint | null) => {
        handleChange('linkedActivityId', selectedComplaintId);
        handleChange('hasNewLinkedComplaint', hasNewLinkedComplaint);
        handleChange('newLinkedComplaint', newLinkedComplaint);
    };

    /* For ExtenNo to display
        if asking value any of below then return true 
        activitysystem.extension.no.product.codes : "PRI,PBX,IP"
    */
    const isPBX = (productCodeVar: string): boolean => {
        if (!productCodeVar) return false;
        return !!listPBX?.some((product: any) => {
            const p = product ?? '';
            return p.toString().toLowerCase() === productCodeVar.toString().toLowerCase();
        });
    };

    /* For "Customer Advised for possible charges" field display or not */
    const isChargesAdvisedVisible = (): boolean => {
        if (complaintCaptureType === ComplaintCaptureMode.UPDATE) {
            return (complaintCaptureType !== ComplaintUpdateMode.PARTY.toString() && complaintCaptureType !== ComplaintUpdateMode.NEW_MOBILE.toString() && isLandLine() && selectedType?.technical) as boolean;
        } else if (isProvisioningByAccount) {
            /* //TODO: Need to set in subrequest also  --> Ahmed did subrequest */
            return (complaintCaptureType !== ComplaintCaptureMode.CREATE_BY_NEW_MOBILE && complaintCaptureType !== ComplaintCaptureMode.CREATE_BY_PARTY && isLandLine() && selectedType?.technical) as boolean;
        } else {
            return (complaintCaptureType !== ComplaintCaptureMode.CREATE_BY_NEW_MOBILE && complaintCaptureType !== ComplaintCaptureMode.CREATE_BY_PARTY && isLandLine() && selectedType?.technical) as boolean;
        }
    };

    const isChargesAdvisedDisabled = (): boolean => {
        // JSF CODE: return captureMode == ComplaintCaptureMode.UPDATE || (targetActivity.getReopenCount() != null && targetActivity.getReopenCount() > 0);
        return false;
    };
    const isPermitedToViewReportingChannel = (): boolean => {
        return true;
        // return checkComplaintPermissionExists('VIEW-ACTION-AS-CHNG-REPORTINGCHANNEL');
    };
    const isReportingChannelDisabled = (): boolean => {
        return complaintCaptureType === ComplaintCaptureMode.UPDATE || (customerSegment?.toString().toLowerCase().includes('business') ?? false);
    };

    const isRegionDisabled = (): boolean => {
        if (complaintCaptureType === ComplaintCaptureMode.UPDATE) {
            // In UPDATE mode, check complaintUpdateType and product group
            return complaintUpdateType !== ComplaintUpdateMode.NEW_MOBILE && complaintUpdateType !== ComplaintUpdateMode.PARTY && (isLandLine() || selectedType?.activityGroupCode?.toUpperCase() === ActivityGroupCode.BILL);
        } else if (isProvisioningByAccount) {
            // When provisioning by account, check capture mode and product group
            return complaintCaptureType !== ComplaintCaptureMode.CREATE_BY_NEW_MOBILE && complaintCaptureType !== ComplaintCaptureMode.CREATE_BY_PARTY && (isLandLine() || selectedType?.activityGroupCode === ActivityGroupCode.BILL);
        } else {
            return complaintCaptureType !== ComplaintCaptureMode.CREATE_BY_NEW_MOBILE && complaintCaptureType !== ComplaintCaptureMode.CREATE_BY_PARTY && (isLandLine() || selectedType?.activityGroupCode === ActivityGroupCode.BILL);
        }
    };

    const isServiceListVisible = (): boolean => {
        if (complaintCaptureType === ComplaintCaptureMode.CREATE_BY_SUBREQUEST.toString() && typeof ProvisioningType === ProvisioningType.BY_PARTY.toString()) {
            return false;
        }
        if (complaintCaptureType === ComplaintCaptureMode.UPDATE && (fields.selectedServices?.length > 0 || fields.selectedServices !== 'NA')) {
            return false;
        }
        return (
            complaintCaptureType != ComplaintCaptureMode.CREATE_BY_PARTY &&
            complaintCaptureType != ComplaintCaptureMode.CREATE_BY_NEW_MOBILE &&
            complaintCaptureType != ComplaintCaptureMode.CREATE_BY_WIFI_TOURIST &&
            complaintCaptureType != ComplaintCaptureMode.CREATE_BY_MWALLET_ACCOUNT &&
            complaintCaptureType != ComplaintCaptureMode.CREATE_BY_OTT &&
            complaintCaptureType != ComplaintCaptureMode.IAM_REQUEST
        );
    };

    const isBusinessCustomerSegment = (): boolean => {
        return customerSegment?.toString().toLowerCase().includes('business') ?? false;
    };
    //TODO: This business need to add later as per JSF code > full conditions are not applied yet.
    const isPriorityFlagDisabled = (): boolean => {
        return complaintCaptureType == ComplaintCaptureMode.UPDATE.toString() && isBusinessCustomerSegment();
    };

    return (
        <>
            <div className="complaintInformation">
                {/* Preferred Language */}

                <div className="section-wrap-row grid grid-cols-1! xl:grid-cols-2! w-full gap-0! xl:gap-18! ">
                    <div className="complaint-info">
                        <label className="complaint-info-label">
                            {labelsMapping.prefered_languages} <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="flex flex-col w-full">
                            <Dropdown
                                value={fields.preferredLanguage}
                                options={[{ label: '--Select Preferred Language--', value: null }, ...preferredLanguages?.map((lang) => ({ label: lang, value: lang }))]}
                                onChange={(e) => handleChange('preferredLanguage', e.value)}
                                placeholder="--Select Preferred Language--"
                                disabled={complaintCaptureType === ComplaintCaptureMode.UPDATE}
                                className="w-full"
                            />
                            {errors.preferredLanguage && <span className="text-red-600 text-xs">{errors.preferredLanguage}</span>}
                        </div>
                    </div>
                    {/* Online Closure (FCR Flag) */}
                    {!bulkComplaintFlag && (
                        // checkComplaintPermissionExists('VIEW-ACTION-AS-FCR-CREATE') &&
                        <div className="flex items-start gap-4">
                            <label className="complaint-info-label">Online Closure</label>
                            <Checkbox
                                checked={fields.fcrComplaint}
                                onChange={(e) => {
                                    handleChange('fcrComplaint', e.checked);
                                    setShouldShowFvr(e.checked || false);
                                }}
                                className="mt-2"
                                disabled={
                                    complaintCaptureType === ComplaintCaptureMode.UPDATE ||
                                    complaintCaptureType === ComplaintCaptureMode.CREATE_BY_NEW_MOBILE ||
                                    ['FCRADJUST', 'FCR', 'ADJUSTUCMS'].includes(selectedType?.code || '') ||
                                    selectedType?.fcr
                                }
                            />
                        </div>
                    )}
                </div>

                <div className="section-wrap-row grid grid-cols-1! xl:grid-cols-2! w-full gap-0! xl:gap-18!">
                    <div className="complaint-info ">
                        <label className="complaint-info-label">
                            Problem Occurred On <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="flex flex-col w-full">
                            <Calendar
                                value={fields.problemOccurredDate}
                                onChange={(e) => {
                                    const selectedDate = e.value;
                                    // If a date is selected and it doesn't have a time set, default to 00:00
                                    if (selectedDate && !fields.problemOccurredDate) {
                                        selectedDate.setHours(0, 0, 0, 0);
                                    }
                                    handleChange('problemOccurredDate', selectedDate);
                                }}
                                showTime
                                showIcon
                                maxDate={new Date()}
                                className="w-full"
                                required
                                readOnlyInput
                                timeOnly={false}
                                stepMinute={1}
                            />
                            {errors.problemOccurredDate && <span className="text-red-600 text-xs">{errors.problemOccurredDate}</span>}
                        </div>
                    </div>

                    {complaintCaptureType === ComplaintCaptureMode.UPDATE && (
                        <div className="flex flex-col ">
                            <label className="text-sm">
                                Registered Date <span className="text-red-600 text-sm">*</span>
                            </label>
                            <Calendar
                                value={fields.registeredDate}
                                onChange={(e) => handleChange('registeredDate', e.value)}
                                showTime
                                showIcon
                                maxDate={new Date()}
                                disabled={complaintCaptureType === ComplaintCaptureMode.UPDATE}
                                style={{ width: '100%' }}
                            />
                            {errors.registeredDate && <span style={{ color: 'red' }}>{errors.registeredDate}</span>}
                        </div>
                    )}
                    <div className="complaint-info">
                        <label className="complaint-info-label">Suspected Outage</label>
                        <Dropdown
                            value={fields.suspectedOutage}
                            options={[{ label: '--Select Suspected Outage--', value: null }, ...suspectedOutages?.map((o: any) => ({ label: o.outageDesc, value: o }))]}
                            onChange={(e) => handleChange('suspectedOutage', e.value)}
                            placeholder="--Select Suspected Outage--"
                            disabled={complaintCaptureType === ComplaintCaptureMode.UPDATE}
                            className="w-full mt-2 lg:mt-0"
                        />
                    </div>
                </div>

                {selectedType?.roamingFlag && (
                    <div className="flex items-center ">
                        <label className="mr-2 text-sm">Roaming</label>
                        <Checkbox checked={fields.roamingEnabled} onChange={(e) => handleChange('roamingEnabled', e.checked)} />
                    </div>
                )}

                <div className="section-wrap-row w-full gap-2">
                    <div className="complaint-info">
                        <label className="complaint-info-label">
                            Complaint Description <span className="text-red-600 text-sm">*</span>
                        </label>
                        <div className="flex flex-col w-full">
                            <InputTextarea
                                value={fields.activityDesc}
                                onChange={(e) => handleChange('activityDesc', e.target.value)}
                                rows={6}
                                disabled={complaintCaptureType === ComplaintCaptureMode.UPDATE}
                                placeholder="Enter description"
                                className="w-full min-h-10"
                                style={{ height: 'auto !important' }}
                            />
                            {errors.activityDesc && <span className="text-red-600 text-xs">{errors.activityDesc}</span>}
                        </div>
                    </div>
                </div>

                {/* Update Activity Remark / Previous Remarks (UPDATE only) */}
                {/* // TODO: haider-see-later -- This will work for update complaint only. */}
                {complaintCaptureType === ComplaintCaptureMode.UPDATE && fields.previousFollowUp && (
                    <>
                        <div className="col-span-2 w-full">
                                <div className="flex flex-col gap-3">
                                    <div className="text-sm text-gray-600 font-medium">
                                        Total Remarks: {fields.previousFollowUp.length}
                                    </div>
                                    <div className="space-y-2">
                                        {fields.previousFollowUp?.map((remark: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1 flex-shrink-0">
                                                        <LuCheck className="text-green-600" size={18} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-gray-800 break-words">
                                                            {remark.remarks}
                                                        </p>
                                                        {remark.createdDt && (
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {remark.createdDt}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                        </div>
                    </>
                )}

                {/* Activity_Remarks / Remarks (UPDATE only) */}
                {/* This will display and work in UPDATE mode. */}
                {/* 
                    <h:panelGroup rendered="#{complaintCapture.captureMode.name() == 'UPDATE'}">
                    <h:panelGroup rendered="#{!empty complaintCapture.previousFollowUp}"> 
                */}
                {complaintCaptureType === ComplaintCaptureMode.UPDATE && (
                    <div className="col-span-2  w-full">
                        <label>
                            Remarks <span className="text-red-600 text-sm">*</span>
                        </label>
                        <InputTextarea value={fields.updateActivityRemarks} onChange={(e) => handleChange('updateActivityRemarks', e.target.value)} rows={4} placeholder="Enter remarks" style={{ width: '100%', height: 'auto' }} />
                        {errors.updateActivityRemarks && <span style={{ color: 'red' }}>{errors.updateActivityRemarks}</span>}
                    </div>
                )}
                {/* ...existing code... */}

                {/* // TODO: thirdparty condition should be here. */}
                {/* New Mobile Party ID/Name/Serial */}
                {fields.partyId && (
                    <div className="flex flex-col ">
                        <label>New Mobile Party ID</label>
                        <InputText value={fields.partyId} disabled style={{ width: '100%' }} />
                    </div>
                )}

                {(complaintCaptureType === ComplaintCaptureMode.CREATE_BY_NEW_MOBILE || (complaintCaptureType === ComplaintCaptureMode.UPDATE && complaintUpdateType === 'NEW_MOBILE')) && (
                    <div className="flex flex-col ">
                        <label>Retailer Name</label>
                        <InputText value={fields.newMobileRetailerName} disabled style={{ width: '100%' }} />
                    </div>
                )}

                {fields.simSerialNo && (
                    <div className="flex flex-col ">
                        <label>New Mobile Serial</label>
                        <InputText value={fields.simSerialNo} disabled style={{ width: '100%' }} />
                    </div>
                )}

                <div className="section-wrap-row grid grid-cols-1! xl:grid-cols-2! w-full gap-0! xl:gap-18! mt-2">
                    {isServiceListVisible() && (
                        <div className="w-full col-span-2 flex gap-4 items-center">
                            <div className="">
                                <label className="text-sm complaint-info-label">
                                    Affected Services <span className="text-red-600 text-sm">*</span>
                                </label>
                            </div>
                            <div className="flex gap-2 flex-col">
                                <Button type="button" disabled={isAffectedServicesDisabled()} style={{ width: 'fit-content' }} label="Select Service" icon="pi pi-external-link" onClick={() => fetchAllServices()} />
                                {fields?.selectedServices?.map((service: Service, index: number) => (
                                    <div key={index}>
                                        <input type="checkbox" value={service.id} onChange={handleCheckboxChange} checked={true} disabled={isAffectedServicesDisabled()} />
                                        <label>{service.name}</label>
                                    </div>
                                ))}
                            </div>
                            <Dialog
                                style={{ width: '65vw' }}
                                visible={showServiceSelect}
                                onHide={() => {
                                    // if (!showServiceSelect) return;
                                    setShowServiceSeelct(false);
                                }}
                                header={null}
                                footer={null}
                                closable={false}
                                draggable={false}
                                resizable={false}
                                dismissableMask
                                contentStyle={{ padding: '10px', margin: '0' }}
                            >
                                {servicesTabs.length > 0 ? (
                                    <ServiceSelect servicesCategories={servicesTabs} selectedServices={fields.selectedServices} onSelectedServicesChange={handleSelectedServicesChange} />
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        <div className="text-lg font-medium mb-2">No Service Categories Available</div>
                                    </div>
                                )}
                            </Dialog>
                        </div>
                    )}
                </div>

                <div className="section-wrap-row grid grid-cols-1! xl:grid-cols-2! w-full gap-0! xl:gap-18! mt-2">
                    <div className="complaint-info">
                        <label className="complaint-info-label">
                            {labelsMapping.region} <span className="text-red-600 text-sm">*</span>
                        </label>
                        <Dropdown
                            value={fields.region}
                            options={[{ label: '--Select Region--', value: null }, ...regions?.map((r: any) => ({ label: r.regionDesc, value: r.regionCode }))]}
                            onChange={(e) => handleChange('region', e.value)}
                            placeholder="--Select Region--"
                            disabled={isRegionDisabled()}
                            className="w-full "
                        />
                        {errors.region && <span className="text-red-600 text-sm">{errors.region}</span>}
                    </div>
                    {isPermitedToViewReportingChannel() && (
                        <div className="complaint-info ">
                            <label className="complaint-info-label">
                                {labelsMapping.reporting_channel} <span className="text-red-600 text-sm">*</span>
                            </label>
                            <div className="flex flex-col w-full">
                                <Dropdown
                                    value={fields.selectedCrmChannel}
                                    options={[{ label: '--Select Reporting Channel--', value: null }, ...reportingChannels.filter((c: any) => c.crmChannelStatus === 'A')?.map((c: any) => ({ label: c.crmChannelDescription, value: c.crmId }))]}
                                    onChange={(e) => handleChange('selectedCrmChannel', e.value)}
                                    placeholder="--Select Reporting Channel--"
                                    disabled={isReportingChannelDisabled()}
                                    className="w-full mt-2 lg:mt-0"
                                />
                                {errors.selectedCrmChannel && <span className="text-red-600 text-xs">{errors.selectedCrmChannel}</span>}
                            </div>
                        </div>
                    )}
                </div>

                {/* // TODO: haider-see-later -- need to check this method -- complaintCapture.isPriorityFlagDisabled?.() */}
                {/* Conditional Rendering to be implemented later:
                    Permission: AS-PF-BSCUSTOMER
                    If the productCode value is equal to BS and the user does not have the permission AS-PF-BSCUSTOMER, do not display the corresponding option in the dropdown.
                    Permission: AS-PF-PRESTIGE
                    If the productCode value is equal to PRESTIGE and the user does not have the permission AS-PF-PRESTIGE, do not display the corresponding option in the dropdown. */}
                {/* Priority Flag & High Severity Flag */}
                {/* {complaintCaptureType === ComplaintCaptureMode.UPDATE && ( */}

                <div className="section-wrap-row grid grid-cols-1! xl:grid-cols-2! w-full gap-0! xl:gap-18! mt-2">
                    <div className="complaint-info ">
                        <label className="complaint-info-label">Priority Flag</label>
                        <Dropdown
                            value={fields.selectedProductService}
                            options={[{ label: '--Select Priority Flag--', value: null }, ...priorityFlagOptions?.map((p: any) => ({ label: p.serviceDesc, value: p.productCode }))]}
                            onChange={(e) => handleChange('selectedProductService', e.value)}
                            placeholder="--Select Priority Flag--"
                            disabled={isPriorityFlagDisabled()}
                            className="w-full"
                        />
                    </div>
                    {/* )} */}
                    <div className="flex flex-col  justify-center mt-2 lg:mt-0">
                        <div className="flex items-center gap-4">
                            <label className="complaint-info-label">High Severity Flag</label>
                            <Checkbox checked={fields.highSeverityFlag} onChange={(e) => handleChange('highSeverityFlag', e.checked)} disabled={complaintCaptureType === ComplaintCaptureMode.UPDATE} />
                        </div>
                    </div>

                    {isChargesAdvisedVisible() && (
                        <div className="flex flex-col  justify-center">
                            <div className="flex items-center gap-2">
                                <label className="text-sm">Customer Advised for possible charges</label>
                                <Checkbox checked={fields.isChargesAdvised} onChange={(e) => handleChange('isChargesAdvised', e.checked)} disabled={isChargesAdvisedDisabled()} />
                            </div>
                        </div>
                    )}

                    {/* {complaintCapture.isChargesAdvisedVisible() && complaintCapture.targetActivity.isChargesAdvised &&  */}
                    {isChargesAdvisedVisible() && ( //&& fields.isChargesAdvised
                        <div className="flex flex-col  justify-center">
                            <div className="flex items-center gap-2">
                                <label className="text-sm">Chargeable Visit Confirmed</label>
                                <Checkbox checked={fields.isChargableVisitConfirmed} onChange={(e) => handleChange('isChargableVisitConfirmed', e.checked)} disabled={isChargesAdvisedDisabled()} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="section-wrap-row grid grid-cols-1! xl:grid-cols-2! w-full gap-0! xl:gap-18! mt-2">
                    <div className="flex flex-col  justify-center">
                        <div className="flex items-center gap-4">
                            <label className="complaint-info-label">KB Article Candidate</label>
                            <Checkbox checked={fields.kbArticleCandidate} onChange={(e) => handleChange('kbArticleCandidate', e.checked)} />
                        </div>
                    </div>
                    {/* Dynamic fields start */}
                    {/* TODO:Should be displayed in case of technical mobile complaint */}
                    {selectedNature?.technical &&
                        complaintCaptureType != ComplaintCaptureMode.CREATE_BY_NEW_MOBILE &&
                        !(complaintCaptureType === ComplaintCaptureMode.UPDATE && complaintUpdateType == 'NEW_MOBILE') &&
                        productGroup &&
                        productGroup === 'Mobile' && (
                            <div className="flex flex-col ">
                                <label className="text-sm">Mobile Device Type</label>
                                <InputText value={fields.mobileDeviceType} onChange={(e) => handleChange('mobileDeviceType', e.target.value)} disabled={complaintCaptureType === ComplaintCaptureMode.UPDATE} className="w-full" />
                            </div>
                        )}
                </div>

                <div className="section-wrap-row grid grid-cols-1! xl:grid-cols-2! w-full gap-0! xl:gap-18! mt-2">
                    {/* Customer Id */}
                    <div className="complaint-info ">
                        <label className="complaint-info-label">Customer ID</label>
                        <InputText value={fields.customerId} onChange={(e) => handleChange('customerId', e.target.value)} className="w-full" />
                    </div>

                    {/* Partner Name */}
                    <div className="complaint-info mt-2 lg:mt-0 ">
                        <label className="complaint-info-label">Partner Name</label>
                        <InputText value={fields.partnerName} onChange={(e) => handleChange('partnerName', e.target.value)} className="w-full h-11" />
                    </div>
                </div>

                <div className="section-wrap-row grid grid-cols-1! xl:grid-cols-2! w-full gap-0! xl:gap-18! mt-2">
                    {/* Complaint Capture Type */}
                    <div className="complaint-info ">
                        <label className="complaint-info-label">
                            Complaint Capture Type <span className="text-red-600 text-sm">*</span>
                        </label>
                        <Dropdown
                            value={fields.complaintCaptureType}
                            options={[
                                { label: 'ReActive', value: 'ReActive' },
                                { label: 'ProActive', value: 'ProActive' }
                            ]}
                            onChange={(e) => handleChange('complaintCaptureType', e.value)}
                            placeholder="Select Complaint Capture Type"
                            className="w-full"
                            required
                        />
                        {errors.complaintCaptureType && <span className="text-red-600 text-sm">{errors.complaintCaptureType}</span>}
                    </div>

                    {/* SLA */}
                    <div className="complaint-info lg:mt-0 mt-2">
                        <label className="complaint-info-label">SLA</label>
                        <InputText value={calculateSlaForRendering(selectedType?.sla || '')} readOnly style={{ width: '100%' }} />
                    </div>
                </div>

                <div className="section-wrap-row grid grid-cols-1! xl:grid-cols-2! w-full gap-0! xl:gap-18! mt-2">
                    {/* Expected Resolution Date */}
                    <div className="complaint-info ">
                        <label className="complaint-info-label">Expected Resolution Date</label>
                        <InputText value={fields.expectedResolutionDate || ''} onChange={(e) => handleChange('expectedResolutionDate', e.target.value)} readOnly style={{ width: '100%' }} />
                    </div>

                    {/* KB URL */}
                    {(complaintCaptureType === ComplaintCaptureMode.CREATE_BY_PARTY || complaintCaptureType === ComplaintCaptureMode.UPDATE || complaintCaptureType === ComplaintCaptureMode.CREATE_BY_ACCOUNT) && selectedType?.kbURL && (
                        <div className="w-full flex flex-col ">
                            <label className="text-sm">KB URL</label>
                            <a href={selectedType.kbURL} target="_blank" rel="noopener noreferrer">
                                {selectedType.kbURL}
                            </a>
                        </div>
                    )}

                    {/* Should be displayed in case of product PRI/PBX, Display all Hypo/PRI numbers in Dropdown list for the user to select. */}
                    {/* --------------------------------------------------------------------------------------------------------------------- */}

                    {/* Extension No */}
                    {isPBX(productCode) && (
                        <div className="flex flex-col ">
                            <label className="text-sm">
                                Extension No <span className="text-red-600 text-sm">*</span>
                            </label>
                            <Dropdown
                                value={fields.extensionNo}
                                options={[{ label: '', value: null }, ...(accountExtensionsList?.length > 0 ? accountExtensionsList?.map((e: any) => ({ label: e, value: e })) : [])]}
                                onChange={(e) => handleChange('extensionNo', e.value)}
                                placeholder="Select Extension No"
                                disabled={complaintCaptureType === ComplaintCaptureMode.UPDATE}
                                style={{ width: '100%' }}
                            />
                            {errors.extensionNo && <span style={{ color: 'red' }}>{errors.extensionNo}</span>}
                        </div>
                    )}

                    {/* Only visible in billing complaints */}
                    {/* ---------------------------------- */}

                    {/* Dispute Amount (Billing complaints) */}
                    {selectedType?.activityGroupCode?.toUpperCase() === 'BILL' && (
                        <div className="complaint-info">
                            <label className="complaint-info-label">
                                Dispute Amount <span className="text-red-600 text-sm">*</span>
                            </label>
                            <div>
                                <div>
                                    <InputText
                                        value={fields.disputeAmount}
                                        onChange={(e) => handleChange('disputeAmount', e.target.value)}
                                        disabled={complaintCaptureType === ComplaintCaptureMode.UPDATE}
                                        required={selectedType?.activityGroupCode?.toLowerCase() === 'BILL'}
                                        placeholder="Dispute Amount should be greater than Zero"
                                        style={{ width: '100%' }}
                                    />
                                    {errors.disputeAmount && <span style={{ color: 'red' }}>{errors.disputeAmount}</span>}
                                </div>
                                <div className="fcrTooTip text-sm!">
                                    Dispute Amount is within the FCR DOP, use FCR DOP if you are Authorized for immediate Posting <i className="close_parent">x</i>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Only visible in roaming complaints */}
                    {/* ---------------------------------- */}

                    {/* International Account Number */}
                    {selectedType?.activityGroupCode?.toUpperCase() === 'ROAMING' && (
                        <div className="flex flex-col ">
                            <label>International Account Number</label>
                            <InputText value={fields.associatedAccountNumber} onChange={(e) => handleChange('associatedAccountNumber', e.target.value)} style={{ width: '100%' }} />
                            {errors.associatedAccountNumber && <span style={{ color: 'red' }}>{errors.associatedAccountNumber}</span>}
                        </div>
                    )}

                    {/* Only visible in new SIM provisioning complaint complaints */}
                    {/* --------------------------------------------------------- */}

                    {/* New Mobile No */}
                    {selectedType?.activityGroupCode?.toUpperCase() === 'NEWSIM' && (
                        <div className="flex flex-col ">
                            <label>
                                New Mobile No <span className="text-red-600 text-sm">*</span>
                            </label>
                            <InputText
                                value={fields.newMobileNo}
                                onChange={(e) => handleChange('newMobileNo', e.target.value)}
                                disabled={complaintCaptureType === ComplaintCaptureMode.CREATE_BY_NEW_MOBILE}
                                required={complaintCaptureType === ComplaintCaptureMode.CREATE_BY_NEW_MOBILE}
                                placeholder="Please enter new mobile number"
                                style={{ width: '100%' }}
                            />
                            {errors.newMobileNo && <span style={{ color: 'red' }}>{errors.newMobileNo}</span>}
                        </div>
                    )}

                    {/* SIM Serial No (NEWSIM complaints) */}
                    {selectedType?.activityGroupCode?.toUpperCase() === 'NEWSIM' && (
                        <div className="flex flex-col ">
                            <label>
                                SIM Serial No <span className="text-red-600 text-sm">*</span>
                            </label>
                            <InputText
                                value={fields.simSerialNo_Text}
                                onChange={(e) => handleChange('simSerialNo_Text', e.target.value)}
                                required={complaintCaptureType === ComplaintCaptureMode.CREATE_BY_NEW_MOBILE}
                                pattern="^([0-9])*$"
                                placeholder="Please enter new SIM number"
                                style={{ width: '100%' }}
                            />
                            {errors.simSerialNo_Text && <span style={{ color: 'red' }}>{errors.simSerialNo_Text}</span>}
                        </div>
                    )}

                    {/* Only visible in covarage complaints */}
                    {/* ----------------------------------- */}

                    {/* GIS Location (Coverage complaints) */}
                    {selectedType?.activityGroupCode?.toUpperCase() === 'COVERAGE' && (
                        <div className="flex  justify-between items-start">
                            <label>GIS Location</label>
                            {gisURL ? (
                                <button type="button" onClick={() => setShowGisMapDialog(true)} className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2 cursor-pointer bg-transparent border-none">
                                    <i className="pi pi-map"></i>
                                    Open Map
                                </button>
                            ) : (
                                <span className="text-gray-500">No GIS location available</span>
                            )}
                        </div>
                    )}

                    {/* Internet Availablity */}
                    {selectedType?.activityGroupCode?.toUpperCase() === 'COVERAGE' && (
                        <div className="w-full flex flex-col ">
                            <label>
                                Internet Availablity <span className="text-red-600 text-sm">*</span>
                            </label>
                            <InputText value={fields.internetAvailability} onChange={(e) => handleChange('internetAvailability', e.target.value)} style={{ width: '100%' }} />
                            {errors.internetAvailability && <span style={{ color: 'red' }}>{errors.internetAvailability}</span>}
                        </div>
                    )}

                    {/* Internet Number */}
                    {selectedType?.activityGroupCode?.toUpperCase() === 'COVERAGE' && fields.internetAvailablity && (
                        <div className="w-full flex flex-col ">
                            <label>
                                Internet Number <span className="text-red-600 text-sm">*</span>
                            </label>
                            <InputText
                                value={fields.internetNumber}
                                onChange={(e) => handleChange('internetNumber', e.target.value)}
                                required={selectedType?.activityGroupCode?.toUpperCase() === 'COVERAGE' && fields.internetAvailablity}
                                placeholder="Please enter internet number"
                                style={{ width: '100%' }}
                            />
                            {errors.internetNumber && <span style={{ color: 'red' }}>{errors.internetNumber}</span>}
                        </div>
                    )}

                    {(complaintCaptureType === ComplaintCaptureMode.CREATE_BY_ACCOUNT || complaintCaptureType === ComplaintUpdateMode.ACCOUNT) && selectedType?.activityGroupCode.toLocaleUpperCase() === 'BILL' && selectedType?.fcr != true && (
                        <LinkedComplaints accountID={accountID} complaintCaptureType={complaintCaptureType} productCode={productCode} customerSegment={customerSegment} onLinkedComplaintSelect={onLinkedComplaintSelect} />
                    )}

                    {/* Mark Complaint As */}
                    <div className="complaint-info lg:mt-0 mt-2">
                        <label className="complaint-info-label">Mark Complaint As</label>
                        <Dropdown
                            value={fields.handlingFlag}
                            options={[{ label: '--Select Mark Complaint As--', value: null }, ...markComplaintAsOptions?.map((option: any) => ({ label: option.label, value: option.value }))]}
                            onChange={(e) => handleChange('handlingFlag', e.value)}
                            placeholder="--Select Mark Complaint As--"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                {/* Lead Id (Request category) */}
                {selectedCategory === 'Request' && fields.leadId && (
                    <div className="w-full flex flex-col ">
                        <label>Lead Id</label>
                        <InputText value={fields.leadId} readOnly style={{ width: '100%' }} />
                    </div>
                )}

                {/* Above from this all are okey so far. */}

                {/* <button type="submit" style={{ marginTop: '1rem', fontWeight: 'bold' }}>
                {/* <Button label="Submit" style={{ marginTop: '1rem', fontWeight: 'bold' }} type="submit" /> */}
            </div>

            {/* Sub Orders Section */}
            {/* <!-- start Subrequest id, subrequest details, ecd are mandatory for the provisioning complaint. --> */}

            {/* TODO: Have to ask Ahmed why he added this below line? */}
            {/* && selectedCategory === 'Provisioning' ? */}
            {['PROVISION', 'PROVISIONMANUAL'].includes(selectedType?.activityGroupCode?.toUpperCase() || '') ||
                (complaintCaptureType === ComplaintCaptureMode.CREATE_BY_ACCOUNT && !(selectedType?.activityGroupCode?.toUpperCase() === 'BILL') && !['PROVISION', 'PROVISIONMANUAL'].includes(selectedType?.activityGroupCode?.toUpperCase() || '') && (
                    <SubOrdersSection
                        selectedCategory={selectedCategory}
                        selectedType={selectedType}
                        complaintCaptureMode={complaintCaptureMode}
                        regions={regions}
                        setFieldValue={parentSetFieldValue}
                        onComplaintCaptureModeChange={setComplaintCaptureMode}
                        isProvisioningByAccount={isProvisioningByAccount}
                        setIsProvisioningByAccount={setIsProvisioningByAccount}
                        provisioningAccountId={provisioningAccountId}
                        setProvisioningAccountId={setProvisioningAccountId}
                        provisioningAccountNumber={provisioningAccountNumber}
                        setProvisioningAccountNumber={setProvisioningAccountNumber}
                        provisioningType={provisioningType}
                        setProvisioningType={setProvisioningType}
                        isLandLine={isLandLine}
                        selectedSubRequest={selectedSubRequest}
                        setSelectedSubRequest={setSelectedSubRequest}
                    />
                ))}

            {/* GIS Map Dialog */}
            <Dialog
                visible={showGisMapDialog}
                onHide={() => setShowGisMapDialog(false)}
                header={
                    <div className="flex items-center gap-3">
                        <img src={`${imageURL}/compoMenu/etisalat-id.png`} alt="Etisalat Logo" style={{ height: '32px' }} />
                        <span>GIS Location</span>
                    </div>
                }
                style={{ width: '90vw', height: '90vh' }}
                maximizable
                modal
                contentStyle={{ height: 'calc(90vh - 100px)', padding: 0 }}
            >
                {gisURL && <iframe src={`http://${gisURL}`} style={{ width: '100%', height: '100%', border: 'none' }} title="GIS Location Map" />}
            </Dialog>
        </>
    );
}

export default ComplaintInformationForm;
