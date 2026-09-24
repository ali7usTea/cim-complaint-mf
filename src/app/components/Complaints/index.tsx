import axios from 'axios';
import SubOrderWarningModal from './SubOrderWarningModal';
import WaiverWarningModal from './WaiverWarningModal';
import AccountStatusDialog from './AccountStatusDialog';
import moment from 'moment';
import { Form, Formik, FormikProps } from 'formik';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { proxyURL, interactionURL } from '../../../utils/lib/proxyAPI';
import AttachmentForm from './AttachmentForm';
import ComplaintLeftSection from './ComplaintLeftSection';
import ContactInformation from './ContactInformation';
import FcrClosure from './FcrClosure.tsx/index.tsx';
import RefundRecord from './RefundRecord.tsx';
import SpecialFields, { SpecialField } from './SpecialFields/index.tsx';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { ComplaintCaptureMode, ComplaintUpdateMode } from '../../../interfaces/complaintEnums';
import * as yup from 'yup';
import ComplaintInformationForm from './ComplainInformationForm';
import GponForm from './gpon/index.tsx';
import { ActivityGroupCode } from '../../../utils/complaints/enums/ActivityGroupCode_Enum.ts';
//@ts-ignore
import DataPanel from 'cim-ui-components/dist/components/DataPanel';
import BulkComplaint from './BulkComplaint/index.tsx';
import { fetchPreferredTimes } from './preferredTimeApi.ts';
import { evaluateContactType } from '../../../utils/helpers';
import { UserCircle } from 'lucide-react';
// const INDOORS_COVERAGE_CODE_KEY = 'activitysystem.indoors.coverage.key';

const generateTransactionId = () => {
    // Use current timestamp and random digits to ensure uniqueness
    const base = Date.now().toString().slice(-5); // last 5 digits of timestamp
    const rand = Math.floor(10000 + Math.random() + 90000).toString(); // 5 random digits
    return (base + rand).slice(0, 9); // ensure length is 9
};

const buildRedirectURL = (complaintId: string) => {
    // Get current URL parameters
    const currentParams = new URLSearchParams(window.location.search);

    // Add the COMPLAINT_ID parameter
    currentParams.set('COMPLAINT_ID', complaintId);

    // Build the final URL with interactionURL and all params
    return `${interactionURL}?${currentParams.toString()}`;
};

export interface ComplaintType {
    id: string;
    code: string;
    description: string;
    technical: boolean;
    activityGroupCode: string;
    ceoCategory: string;
    traCategory: string;
    fcr: boolean;
    bitStream: boolean;
    kbURL: string | null;
    sla: Record<string, string>;
    slaHours: Record<string, string>;
    allowDuplicate: boolean;
    activityCategoryCode: string | null;
    roamingFlag: boolean;
    specialFields: any[];
    activityTypeConfig?: string;
}

export interface ComplaintNature {
    code: string;
    description: string;
    types: ComplaintType[];
    technical?: boolean;
}

export interface ComplaintCategory {
    code: string;
    description: string;
    natures: ComplaintNature[];
}

export interface ComplaintCategoryDto {
    categories: ComplaintCategory[];
}

interface PreferredType {
    label: string;
    value: string;
}

export interface ContactInfo {
    contactName: string;
    contactNumber: string;
    contactNumberType: string;
    contactEmail: string;
    preferredTime: string;
    person: string;
}

export interface LinkedComplaint {
    category: { code: string; description: string };
    nature: { code: string; description: string };
    type: { code: string; description: string };
    specialFields: SpecialField[] | null;
}

interface ComplaintTextParams {
    complaintCaptureType: ComplaintCaptureMode;
    complaintUpdateType?: ComplaintUpdateMode;
    accountNumber?: string;
    partyID?: string;
    contactNumber?: string;
    activityId?: string;
    activityDuration?: string;
    subRequestId?: string;
}

function getComplaintText(params: ComplaintTextParams): string {
    const { complaintCaptureType, complaintUpdateType, accountNumber, partyID, contactNumber, activityId, activityDuration, subRequestId } = params;
    if (complaintCaptureType === ComplaintCaptureMode.CREATE_BY_NEW_MOBILE) {
        return `Create Complaint For New Mobile Number ${contactNumber || ''}`;
    }
    if (complaintCaptureType === ComplaintCaptureMode.CREATE_BY_ACCOUNT) {
        return `Create Complaint For Account Number ${accountNumber || ''}`;
    }
    if (complaintCaptureType === ComplaintCaptureMode.CREATE_BY_SUBREQUEST) {
        return `Create Complaint For Subrequest id ${subRequestId || ''}`;
    }
    if (complaintCaptureType === ComplaintCaptureMode.CREATE_BY_PARTY) {
        return `Create Complaint For Party ID ${partyID || ''}`;
    }
    if (complaintCaptureType === ComplaintCaptureMode.UPDATE) {
        if (complaintUpdateType === ComplaintUpdateMode.ACCOUNT) {
            // Decode and parse activityDuration with the correct format
            const decodedActivityDuration = decodeURIComponent(activityDuration || '');
            const parsedDate = moment(decodedActivityDuration, 'DD-MM-YYYY hh:mm:ss A');
            return `Updating complaint ${activityId ? activityId + ':' : ''} Created ${parsedDate.isValid() ? parsedDate.fromNow() : ''} For Account Number ${accountNumber || ''}`;
        }
        if (complaintUpdateType === ComplaintUpdateMode.NEW_MOBILE) {
            return `Updating complaint ${activityId ? activityId + ':' : ''} Created ${activityDuration || ''} ago For New Mobile Number ${contactNumber || ''}`;
        }
        if (complaintUpdateType === ComplaintUpdateMode.PARTY) {
            return `Updating complaint ${activityId ? activityId + ':' : ''} Created ${activityDuration || ''} ago For Party ID ${partyID || ''}`;
        }
        if (complaintUpdateType === ComplaintUpdateMode.SUBREQUEST) {
            return `Updating complaint ${activityId ? activityId + ':' : ''} Created ${activityDuration || ''} ago For Subrequest id ${subRequestId || ''}`;
        }
    }
    return '';
}
enum Mode {
    Normal = 'Normal',
    General = 'General'
}
const LAND_LINE_PRODUCT_GROUP = 'Fixed';

function Complaints() {
    // Modal state for sub order warning
    const [showSubOrderWarning, setShowSubOrderWarning] = useState(false);
    const [proceedAfterWarning, setProceedAfterWarning] = useState(false);
    // Modal state for pre-check confirmation
    const [showPreCheckModal, setShowPreCheckModal] = useState(false);
    const [pendingSubmission, setPendingSubmission] = useState<{ values: any; actions: any } | null>(null);
    // Modal state for waiver warning
    const [showWaiverWarning, setShowWaiverWarning] = useState(false);
    const [dopTypeCode, setDopTypeCode] = useState<string>('');
    // Modal state for account status warning
    const [showAccountStatusDialog, setShowAccountStatusDialog] = useState(false);
    const toast = useRef<Toast>(null);
    const formikRef = useRef<FormikProps<any>>(null);
    const { Customers } = useSelector((state: RootState) => state.customerslice);
    /* Params variables */
    const {
        productGroupCode,
        productGrpDesc,
        productDesc,
        accountNumber,
        partyID,
        accountID,
        productCode,
        accountStatus,
        customerID,
        contactNumber,
        customerSegment,
        isBitstream,
        sourceChannelId,
        userName,
        subRequest,
        subRequestId,
        complaintCaptureType,
        complaintUpdateType,
        customerName,
        customerEmail,
        /** below are the fields from 3rd party > no management only */
        ACCOUNT_NUMBER,
        RETAILER_PARTY_PROFILE_ID,
        RETAILER_NAME,
        ENTITY_DESC,
        STATUS,
        SUBREQUEST_ID,
        SUBREQUEST_ACCOUNTID,
        subRequestComplaint_SUBREQUEST_ID,
        subRequestComplaint_PARTY_ID,
        subRequestComplaint_PRODUCT_CODE,
        subRequestComplaint_PRODUCT_DESCRIPTION,
        subRequestComplaint_PRODUCT_GROUP_CODE,
        subRequestComplaint_PRODUCT_GROUP,
        subRequestComplaint_SERVICE_ID,
        subRequestComplaint_SERVICE_DESCRIPTION,
        subRequestComplaint_PARTY_NAME,
        subRequestComplaint_ACCOUNT_CATEGORY,
        subRequestComplaint_ACCOUNT_ID,
        subRequestComplaint_ACCOUNT_NUMBER,
        subRequestComplaint_SUB_REQUEST_CREATION_DATE,
        subRequestComplaint_SUB_REQUEST_STATUS,
        subRequestComplaint_SUB_REQUEST_TYPE,
        subRequestComplaint_SERVICE_REQUIRED_DATE,
        subRequestComplaint_REGION_CODE,
        activityId,
        activityDuration,
        categoryCode,
        customerSegmentDesc,
        valueSegment,
        consumerValueSegment,
        agentName,
        agentLocation,
        productGroup,
        regionCode
    } = Customers[Object.keys(Customers)?.[0]] || {};

    // Cast values to shared enums if present
    const complaintText = getComplaintText({
        complaintCaptureType: complaintCaptureType as ComplaintCaptureMode,
        complaintUpdateType: complaintUpdateType as ComplaintUpdateMode,
        accountNumber,
        partyID,
        contactNumber,
        activityId,
        activityDuration,
        subRequestId: SUBREQUEST_ID
    });
    const [selectedRow, setSelectedRow] = useState<any>(null);

    // Cast values to shared enums if present
    const [mode, setMode] = useState<Mode>(Mode.Normal);
    // const [preferredTimeOptions, setPreferredTimeOptions] = useState<Array<{ label: string; value: string }>>([]);
    const [preferredTimeOptions, setPreferredTimeOptions] = useState<Array<PreferredType>>([]);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState<ComplaintCategory[]>([]);
    const [isClosureOpen, setIsClosureOpen] = useState(false);
    // Lift selectedNature and selectedType state up from ComplaintLeftSection
    const [selectedNature, setSelectedNature] = useState<ComplaintNature | null>(null);
    const [selectedType, setSelectedType] = useState<ComplaintType | null>(null);
    const [isNullKbUrl, setIsNullKbUrl] = useState<boolean>(true);
    // const [renderIndoorCoverage, setRenderIndoorCoverage] = useState<boolean>(false);

    /**
     * Migrated from JSF handlet(ActivityType type) function
     * Handles activity type selection with all associated business logic
     */
    // const isIndoorsCoverage = (type) => {
    //     return type?.code === INDOORS_COVERAGE_CODE_KEY;
    // };
    const handleActivityTypeSelection = useCallback(
        async (type: ComplaintType) => {
            // Handle CREATE_BY_SUBREQUEST mode
            if (complaintCaptureType === ComplaintCaptureMode.CREATE_BY_SUBREQUEST) {
                setSelectedSubRequest(null);
            }

            // Set the activity type and load special fields
            setSelectedType(type);

            // Check KB URL - Fix for Jira CIM-371
            if (type.kbURL !== null && type.kbURL !== undefined && type.kbURL !== '') {
                setIsNullKbUrl(false);
            } else {
                setIsNullKbUrl(true);
            }

            // Determine group code for checklist (TECHNICAL vs BILLING)
            let groupCode = 'TECHNICAL';
            if (selectedType && selectedType.activityGroupCode && ActivityGroupCode.BILL === (selectedType.activityGroupCode as any)) {
                groupCode = 'BILLING';
            }

            // Load activity checklist by group
            try {
                // TODO: Replace with actual API call - complaintService.getActivityChecklistByGroup(groupCode)
                const data = await fetchActivityChecklistByGroup(groupCode);

                setDynamicChecklist(data);
                setCheckedChecklist([]); // Reset selected checklist
            } catch (error) {
                console.error('Error loading activity checklist:', error);
                setDynamicChecklist([]);
            }

            // Handle FCR complaint flag
            if (type.fcr !== null && type.fcr !== undefined && type.fcr) {
                formikRef.current?.setFieldValue('fcrComplaint', true);
            } else {
                formikRef.current?.setFieldValue('fcrComplaint', false);
            }

            // Handle landline account region setting
            if (isLandLine() && type.activityGroupCode !== ActivityGroupCode.PROVISION && type.activityGroupCode !== ActivityGroupCode.PROVISIONMANUAL) {
                formikRef.current?.setFieldValue('region', regionCode);
            }
            // Check waiver requests for ADJUSTUCMS group code
            if (type.activityGroupCode === ActivityGroupCode.ADJUSTUCMS) {
                const hasWaiverInCurrentMonth = await checkWaiverRequestsInCurrentMonth(accountID || '');
                if (hasWaiverInCurrentMonth) {
                    // Show warning message
                    toast.current?.show({
                        severity: 'warn',
                        summary: 'Warning',
                        detail: 'The customer already has a waiver request for the same month',
                        life: 5000
                    });
                }
            }
            // Handle CREATE_BY_PARTY mode - check for open complaints with same nature/type
            if (complaintCaptureType === ComplaintCaptureMode.CREATE_BY_PARTY) {
                await checkOpenedComplaintWithSameNatureType(partyID || '', selectedNature, type);
            }
        },
        [complaintCaptureType, selectedType, selectedNature, accountID, partyID, toast, formikRef]
    );

    // Helper function to check waiver requests in current month
    const checkWaiverRequestsInCurrentMonth = async (accountId: string): Promise<boolean> => {
        // TODO: Implement actual API call to check waiver requests
        console.log('Checking waiver requests for account:', accountId);
        return false; // Dummy implementation
    };

    // Helper function to check opened complaints with same nature/type
    const checkOpenedComplaintWithSameNatureType = async (partyId: string, nature: ComplaintNature | null, type: ComplaintType | null): Promise<void> => {
        // TODO: Implement actual API call to check duplicate complaints
        console.log('Checking opened complaints for party:', partyId, 'nature:', nature, 'type:', type);
    };

    // Helper function to fetch activity checklist by group
    const fetchActivityChecklistByGroup = async (groupCode: string): Promise<any> => {
        try {
            const response = await axios.get(`${proxyURL}/custom/activityChecklist?groupCode=${groupCode}`);
            return response.data?.data?.checklistItems || [];
        } catch (error) {
            console.error('Error fetching activity checklist:', error);
            return [];
        }
    };

    // Callback to handle type selection (wrapper for backward compatibility)
    const onTypeSelect = (type: ComplaintType | null) => {
        if (type) {
            handleActivityTypeSelection(type);
        }
    };

    // Dynamic checklist state (from API)
    const [dynamicChecklist, setDynamicChecklist] = useState<string[]>([]);
    // Local checked state for checklist (not in Formik)
    const [checkedChecklist, setCheckedChecklist] = useState<string[]>([]);
    const [checklistError, setChecklistError] = useState<string | null>(null);
    const [problemOccurredDate, setProblemOccurredDate] = useState<string>('');
    const [partyIDAssignable, setPartyIDAssignable] = useState<string>('');
    const [retailerName, setRetailerName] = useState<string>('');
    const [activityStatus, setActivityStatus] = useState('');
    const [isWaiverRepeatedRequest, setIsWaiverRepeatedRequest] = useState<boolean>(false);
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    // Provisioning logic based on SUBREQUEST_ACCOUNTID
    const [isProvisioningByAccount, setIsProvisioningByAccount] = useState<boolean>(false);
    const [provisioningAccountId, setProvisioningAccountId] = useState<string>('');
    const [provisioningAccountNumber, setProvisioningAccountNumber] = useState<string>('');
    const [provisioningType, setProvisioningType] = useState<'BY_ACTIVE_ACCOUNT' | 'BY_INACTIVE_ACCOUNT' | 'BY_PARTY'>('BY_PARTY');
    const [selectedSubRequest, setSelectedSubRequest] = useState<any>(null);

    const { settings } = useSelector((state: RootState) => state.settingSlice);
    /* const productsList = ((settings as any)?.['activitysystem.elife.product.codes']) !== null ? (((settings as any)?.['activitysystem.elife.product.codes'] || [])?.split(',')?.map((code: string) => code.trim()) as string[]) : []; */
    const rawValue_productsList = (settings as any)?.['activitysystem.elife.product.codes'];
    const productsList = typeof rawValue_productsList === 'string' && rawValue_productsList !== '' ? rawValue_productsList?.split(',')?.map((code: string) => code.trim()) : [];

    const rawValue_activityDescipriontForCREATE_BY_NEW_MOBILE = (settings as any)?.['activity.system.new.account.complaint.description'];
    const activityDescipriontForCREATE_BY_NEW_MOBILE =
        typeof rawValue_activityDescipriontForCREATE_BY_NEW_MOBILE === 'string' && rawValue_activityDescipriontForCREATE_BY_NEW_MOBILE !== ''
            ? rawValue_activityDescipriontForCREATE_BY_NEW_MOBILE
                  ?.split(',')
                  ?.map((code: string) => code.trim())
                  ?.join(' | ')
            : '';

    const rawValue_customerCategoryorCREATE_BY_NEW_MOBILE = (settings as any)?.['activity.system.new.account.complaint.customer.category.code'];
    const customerCategoryForCREATE_BY_NEW_MOBILE =
        typeof rawValue_customerCategoryorCREATE_BY_NEW_MOBILE === 'string' && rawValue_customerCategoryorCREATE_BY_NEW_MOBILE !== '' ? rawValue_customerCategoryorCREATE_BY_NEW_MOBILE?.split(',')?.map((code: string) => code.trim()) : [];

    // Helper to fetch and set predefined contacts for subrequest
    const [predefinedContacts, setPredefinedContacts] = useState<any[]>([]);

    const isLandLine = (): boolean => {
        return productGroup?.toString().toLowerCase() === LAND_LINE_PRODUCT_GROUP.toString().toLowerCase();
    };

    const isRefund = (): boolean => {
        return selectedType?.activityGroupCode.toUpperCase() === 'ADJUSTUCMS';
    };

    // useEffect(() => {
    //     if(selectedType?.activityGroupCode?.toString()?.toUpperCase() ==='FCR') {
    //         setIsClosureOpen(true);
    //     } else {
    //         setIsClosureOpen(false);
    //     }
    // },[selectedType?.activityGroupCode]);

    // useCallback function to check for repeated waivers
    const checkWaiverRepeated = useCallback(async (accountId: string, dopType: string) => {
        if (!accountId || !dopType) {
            return;
        }

        try {
            const response = await axios.get(`${proxyURL}/custom/waivers/repeated/check`, {
                params: {
                    accountId: accountNumber,
                    dopTypeCode: dopType,
                    action: 'CheckWaiverRepeatedOnAccountLevelForBFF',
                    actionCode: 'CheckWaiverRepeatedOnAccountLevelForBFF'
                }
            });

            const { responseCode, responseMessage, data } = response.data;

            if (responseCode === '00' && responseMessage === 'SUCCESS') {
                if (data?.isWaiverRepeated === true) {
                    setIsWaiverRepeatedRequest(true);
                } else {
                    setIsWaiverRepeatedRequest(false);
                }
            } else {
                // API returned error or unexpected response
                setIsWaiverRepeatedRequest(false);
                console.error('Waiver check failed:', responseMessage);
            }
        } catch (error) {
            console.error('Error checking waiver repeated:', error);
            setIsWaiverRepeatedRequest(false);
        }
    }, []);

    useEffect(() => {
        if (selectedType?.activityGroupCode?.toString().toUpperCase() !== ActivityGroupCode.ADJUSTUCMS) {
            setIsWaiverRepeatedRequest(false);
            setDopTypeCode('');
        } else {
            // Map nature code to DOP type code
            const mapNatureToDOP = (natureCode: string): string => {
                const dopMapping: { [key: string]: string } = {
                    CNA001_DOP: 'Cust.Dispt.Chrgs',
                    CNA002_DOP: 'On.Acct.System',
                    CNA003_DOP: 'On.Acct.StaffErr'
                };
                return dopMapping[natureCode] || '';
            };

            const mappedDopTypeCode = selectedNature?.code ? mapNatureToDOP(selectedNature.code) : '';
            setDopTypeCode(mappedDopTypeCode);

            // Call the waiver check when we have both accountNumber and dopTypeCode
            if (mappedDopTypeCode && (accountNumber || accountID)) {
                checkWaiverRepeated(accountNumber || accountID, mappedDopTypeCode);
            }
        }
    }, [selectedType?.activityGroupCode, selectedNature?.code, accountNumber, accountID, checkWaiverRepeated]);

    /* Subrequest working - warning */
    useEffect(() => {
        if (complaintCaptureType === ComplaintCaptureMode.CREATE_BY_SUBREQUEST && subRequestComplaint_SUB_REQUEST_CREATION_DATE) {
            const creationDate = moment(subRequestComplaint_SUB_REQUEST_CREATION_DATE);
            const now = moment();
            const diffHours = now.diff(creationDate, 'hours');
            if (diffHours <= 48) {
                setShowSubOrderWarning(true);
            }
        }
    }, [complaintCaptureType, subRequestComplaint_SUB_REQUEST_CREATION_DATE]);

    /* Check account status and show dialog if not active */
    useEffect(() => {
        if (accountStatus && accountStatus.toLowerCase() !== 'active') {
            setShowAccountStatusDialog(true);
        }
    }, [accountStatus]);

    /* Subrequest working - working*/
    useEffect(() => {
        // Simulate GetSubRequests.ACCOUNT_ID logic
        const accountId = complaintCaptureType === ComplaintCaptureMode.CREATE_BY_SUBREQUEST ? SUBREQUEST_ACCOUNTID : accountID;
        // Assume accountStatus is available and 'active' means active
        if (accountId && accountId.trim() !== '') {
            setIsProvisioningByAccount(true);
            setProvisioningAccountId(accountId);
            setProvisioningAccountNumber(accountNumber);
            if (accountStatus && accountStatus.toLowerCase() === 'active') {
                setProvisioningType('BY_ACTIVE_ACCOUNT');
            } else {
                setProvisioningType('BY_INACTIVE_ACCOUNT');
            }
        } else {
            setIsProvisioningByAccount(false);
            setProvisioningType('BY_PARTY');
        }
    }, [SUBREQUEST_ACCOUNTID, ACCOUNT_NUMBER, accountStatus, accountID]);

    useEffect(() => {
        fetchPreferredTimes().then((res) => {
            setPreferredTimeOptions(res);
        });
    }, []);

    /* Subrequest working - working 2*/
    useEffect(() => {
        const setDefaultPredefinedContactValues = () => {
            setPredefinedContacts([
                {
                    contactName: customerName || '',
                    contactNumber: accountNumber || '',
                    contactNumberType: evaluateContactType(accountNumber || ''),
                    contactEmail: customerEmail || '',
                    preferredTime: 'MORNING',
                    person: 'Owner'
                }
            ]);
        };

        const setPredefinedContactValues = (data: any[]) => {
            const contactInfo: ContactInfo = {
                contactName: '',
                contactNumber: '',
                contactNumberType: 'MOBILE',
                contactEmail: '',
                preferredTime: '',
                person: ''
            };
            data.forEach((item: any) => {
                // Only use contactNumber from last complaint if available
                if (item.displayName === 'contactNumber') contactInfo.contactNumber = item.value || '';
                if (item.displayName === 'contactName') contactInfo.contactName = item.value || '';
                if (item.displayName === 'contactEmail') contactInfo.contactEmail = item.value || '';
                if (item.displayName === 'contactPerson') contactInfo.person = item.value || 'Owner';
                if (item.displayName === 'contactNumberType') contactInfo.contactNumberType = item.value || 'MOBILE';
                if (item.displayName === 'preferredTime') {
                    // Convert label to value (e.g., "9 AM - 1 PM" -> "MORNING")
                    const preferredTimeValue = preferredTimeOptions.find((opt) => opt.label === item.value)?.value || 'MORNING';
                    contactInfo.preferredTime = preferredTimeValue;
                }
            });
            setPredefinedContacts([contactInfo]);
        };

        async function populateSubrequestPredefinedContact() {
            if (complaintCaptureType !== ComplaintCaptureMode.CREATE_BY_SUBREQUEST) {
                if (provisioningType === 'BY_ACTIVE_ACCOUNT' && provisioningAccountId) {
                    // Call getLastContactDetailsByAccountId API
                    try {
                        const response = await axios.get(`${proxyURL}/custom/getLastContactDetailsByAccountId?accountId=${provisioningAccountId}`);
                        const data = response.data;
                        if (Array.isArray(data)) {
                            setPredefinedContactValues(data);
                        } else {
                            setDefaultPredefinedContactValues();
                        }
                    } catch (err) {
                        setDefaultPredefinedContactValues();
                    }
                } else if (provisioningType === 'BY_PARTY' && subRequestComplaint_PARTY_ID) {
                    // Call GetPartyBasicInfoForBFF API
                    try {
                        const response = await axios.get(`${proxyURL}/custom/getLastContactDetailsByParty?partyId=${subRequestComplaint_PARTY_ID}`);
                        const data = response.data;
                        if (Array.isArray(data)) {
                            setPredefinedContactValues(data);
                        } else {
                            setDefaultPredefinedContactValues();
                        }
                    } catch (err) {
                        setDefaultPredefinedContactValues();
                    }
                } else if (provisioningType === 'BY_INACTIVE_ACCOUNT') {
                    setDefaultPredefinedContactValues();
                }
            }
        }
        populateSubrequestPredefinedContact();
    }, [complaintCaptureType, provisioningType, provisioningAccountId, subRequestComplaint_PARTY_ID, preferredTimeOptions]);

    /* for the Third-party complaints > from utilities */
    useEffect(() => {
        /** If from third-party: one of these
         * 1. no-management
         * 2.
         */
        if (complaintCaptureType === 'CREATE_BY_NEW_MOBILE') {
            const inputFormat = 'ddd MMM DD HH:mm:ss [UTC] YYYY'; // Use brackets for literal "UTC"
            const outputFormat = 'MM/DD/YYYY HH:mm';
            const finDate = moment.utc(new Date(), inputFormat).local().format(outputFormat);
            setProblemOccurredDate(finDate);
            setPartyIDAssignable(RETAILER_PARTY_PROFILE_ID);
            setRetailerName(RETAILER_NAME);
        } else if (partyID) {
            setPartyIDAssignable(partyID);
        } else {
            setProblemOccurredDate('');
            setPartyIDAssignable('');
            setRetailerName('');
        }
    }, [RETAILER_NAME, RETAILER_PARTY_PROFILE_ID]);

    /* For Sub-Order block to display
        productcode any of these >> activitysystem.elife.product.codes : "0P,1P,2P,3P"
     */
    const showSubRequestsTable = () => {
        const isElifeSubOrderProductCode = (productCodeParam: any) => {
            return productsList?.some((product: any) => {
                return product.toLowerCase() === productCodeParam.toLowerCase();
            });
        };
        const isOptionalSubRequestSelectionComplaint = () => {
            return (
                complaintCaptureType === ComplaintCaptureMode.CREATE_BY_ACCOUNT &&
                !(
                    selectedType?.activityGroupCode === ActivityGroupCode.BILL.toString() &&
                    selectedType?.activityGroupCode === ActivityGroupCode.PROVISION.toString() &&
                    selectedType?.activityGroupCode === ActivityGroupCode.PROVISIONMANUAL.toString()
                ) &&
                isElifeSubOrderProductCode(productCode)
            );
        };
        if (selectedType?.activityGroupCode === ActivityGroupCode.PROVISION.toString() || selectedType?.activityGroupCode === ActivityGroupCode.PROVISIONMANUAL.toString() || isOptionalSubRequestSelectionComplaint()) {
            return true;
        }
        return false;
    };

    const isUpdate = complaintCaptureType === ComplaintCaptureMode.UPDATE;

    // Yup validation schema for all complaint form fields
    // (Checklist is not part of Formik schema)
    const ComplaintFormSchema = yup.object().shape({
        preferredLanguage: yup.string().required('Preferred Language is required'),
        fcrComplaint: yup.boolean(),
        problemOccurredDate: yup.date().required('Problem Occurred Date is required'),
        registeredDate: yup.date().nullable(),
        suspectedOutage: yup.mixed().nullable(),
        roamingEnabled: isUpdate ? yup.boolean().nullable() : yup.boolean(),
        activityDesc: yup.string().required('Activity Description is required'),
        updateActivityRemarks: isUpdate ? yup.string().trim().required('Please provide activity remarks') : yup.string(),
        partyId: yup.string(),
        newMobileRetailerName: isUpdate ? yup.string().nullable() : yup.string(),
        simSerialNo: isUpdate ? yup.string().nullable() : yup.string(),
        // allSelectedServices: yup.array(),
        region: yup.string().required('Region is required'),
        selectedCrmChannel: yup.string().required('Reporting Channel is required'),
        selectedProductService: yup.mixed().nullable(),
        highSeverityFlag: yup.boolean(),
        isChargesAdvised: yup.boolean(),
        isChargableVisitConfirmed: isUpdate ? yup.boolean().nullable() : yup.boolean(),
        kbArticleCandidate: yup.boolean().notRequired(),
        // mobileDeviceType: yup.string(),
        // customerId: yup.string(),
        // partnerName: yup.string(),
        // kbArticleCandidate: yup.mixed(yup.boolean(), yup.string().notRequired).notRequired(),
        complaintCaptureType: yup.string().required('Complaint Capture Type is required.'),
        extensionNo: yup.mixed().nullable(),
        ...(selectedType?.activityGroupCode.toUpperCase() === 'BILL' ? { disputeAmount: yup.number().nullable() } : {}),
        associatedAccountNumber: isUpdate ? yup.string().nullable() : yup.string(),
        expectedResolutionDate: yup.string(),
        internetAvailability: yup.string(),
        // newMobileNo: yup.string().notRequired(),
        simSerialNo_Text: yup.string(),
        internetAvailablity: isUpdate ? yup.boolean().nullable() : yup.boolean(),
        internetNumber: isUpdate ? yup.string().nullable() : yup.string(),
        serviceCategory: yup.mixed().nullable(),
        selectedServices: yup.array(),
        handlingFlag: yup.mixed().nullable(),
        leadId: isUpdate ? yup.string().nullable() : yup.string(),
        contactInfos: yup.array().of(
            yup.object().shape({
                contactName: yup.string().required('Contact Name is required'),
                contactNumber: yup.string(),
                contactNumberType: yup.string(),
                contactEmail: isUpdate ? yup.string().email('invalid email').nullable() : yup.string().email('Invalid email'),
                preferredTime: yup.string(),
                person: yup.string()
            })
        ),
        refundRecords: yup.array(),
        specialFields: yup.array(),
        attachmentInfos: yup.array(),
        refundAmount: yup.number().nullable(),
        refundBillPeriod: yup.mixed().nullable(),
        refundAdjustmentType: yup.string(),
        refundChargeCode: yup.string(),
        refundRemarks: yup.string(),
        mainClosureDescriptoin: isUpdate ? yup.string().nullable() : isClosureOpen ? yup.string().required('Main Closure Description is required') : yup.string().nullable(),
        auxiliaryDescription: isUpdate ? yup.string().nullable() : isClosureOpen ? yup.string().required('Auxiliary Description is required') : yup.string().nullable(),
        closureDescription: isUpdate ? yup.string().nullable() : isClosureOpen ? yup.string().required('Closure Description is required') : yup.string().nullable(),
        complaintCategory: isClosureOpen ? yup.string().required('Complaint Category is required') : yup.string().nullable(),
        fcrRemarks: yup.string(),
        mainClosureCode: yup.string(),
        closureCode: yup.string(),
        auxClosureCode: yup.string(),
        ncCustomerId: isUpdate ? yup.string().nullable() : yup.string(),
        hasNewLinkedComplaint: yup.boolean(),
        linkedActivityId: yup.string().nullable(),
        newLinkedComplaint: yup
            .object()
            .shape({
                category: yup.object().shape({
                    code: yup.string(),
                    description: yup.string()
                }),
                nature: yup.object().shape({
                    code: yup.string(),
                    description: yup.string()
                }),
                type: yup.object().shape({
                    code: yup.string(),
                    description: yup.string()
                }),
                specialField: yup.object().shape({
                    code: yup.string(),
                    description: yup.string()
                })
            })
            .nullable(),
        isBulkComplaintOn: yup.boolean(),
        bulkComplaintValidateResponse: yup.object().nullable()
    });

    // Formik initial values
    interface ComplaintFormValues {
        [key: string]: any;
    }
    // Helper to get initial values
    const getInitialValues = {
        preferredLanguage: '',
        fcrComplaint: selectedType?.activityGroupCode?.toString()?.toUpperCase() === 'FCR' ? true : false,
        problemOccurredDate: problemOccurredDate,
        registeredDate: null,
        suspectedOutage: null,
        roamingEnabled: false,
        activityDesc: ENTITY_DESC || activityDescipriontForCREATE_BY_NEW_MOBILE || '',
        updateActivityRemarks: '',
        partyId: partyIDAssignable,
        newMobileRetailerName: retailerName || '',
        simSerialNo: '',
        region: null,
        selectedCrmChannel: null,
        selectedProductService: null,
        highSeverityFlag: false,
        isChargesAdvised: false,
        isChargableVisitConfirmed: false,
        kbArticleCandidate: false,
        complaintCaptureType: 'ReActive',
        mobileDeviceType: '',
        customerId: '',
        partnerName: '',
        extensionNo: null,
        disputeAmount: '',
        associatedAccountNumber: '',
        expectedResolutionDate: '',
        newMobileNo: ACCOUNT_NUMBER,
        simSerialNo_Text: '',
        internetAvailability: '',
        internetAvailablity: false,
        internetNumber: '',
        serviceCategory: null,
        selectedServices: [],
        handlingFlag: null,
        leadId: '',
        hasNewLinkedComplaint: false,
        linkedActivityId: '',
        newLinkedComplaint: null,
        contactInfos:
            predefinedContacts.length > 0
                ? predefinedContacts
                : [
                      {
                          contactName: customerName || '',
                          contactNumber: accountNumber || '',
                          contactNumberType: 'MOBILE',
                          contactEmail: customerEmail || '',
                          preferredTime: 'MORNING',
                          person: 'Owner'
                      }
                  ],
        refundRecords: [],
        specialFields: [],
        attachmentInfos: [],
        refundAmount: null,
        refundBillPeriod: null,
        refundAdjustmentType: '',
        refundChargeCode: '',
        refundRemarks: '',
        mainClosureDescriptoin: '',
        auxiliaryDescription: '',
        closureDescription: '',
        complaintCategory: '',
        fcrRemarks: '',
        mainClosureCode: '',
        closureCode: ' ',
        auxClosureCode: '',
        ncCustomerId: '',
        isBulkComplaintOn: false,
        bulkComplaintValidateResponse: null,
        // GPON section
        elifeTechnicalDetails: {
            ontPwrLEDStatus: '',
            ontPwrAuthStatus: '',
            ontLinkLEDStatus: '',
            ontLANLEDStatus: '',
            ontRestarted: '',
            ontPort: '',
            ontPC: '',
            pcRestarted: '',
            stbRestarted: '',
            pppoeConnection: '',
            elifeTechnicalDetails: '',
            others: ''
        }
    };

    const [initialValues, setInitialValues] = useState<ComplaintFormValues>(getInitialValues);
    useEffect(() => {
        setInitialValues((prev) => ({
            ...prev,
            contactInfos: predefinedContacts
        }));
    }, [predefinedContacts]);
    // Use React state for provisioning logic
    useEffect(() => {
        if (complaintCaptureType === ComplaintCaptureMode.CREATE_BY_SUBREQUEST) {
            const selectedSubrequest = {
                SUBREQUEST_ID: subRequestComplaint_SUBREQUEST_ID,
                ACCOUNT_ID: SUBREQUEST_ACCOUNTID,
                ACCOUNT_NUMBER: ACCOUNT_NUMBER,
                productCode: subRequestComplaint_PRODUCT_CODE,
                productDesc: subRequestComplaint_PRODUCT_DESCRIPTION,
                categoryCode: subRequestComplaint_ACCOUNT_CATEGORY,
                partyId: subRequestComplaint_PARTY_ID,
                partyProfileId: '',
                productGrpId: subRequestComplaint_PRODUCT_GROUP_CODE,
                productGrpDesc: subRequestComplaint_PRODUCT_GROUP,
                serviceId: subRequestComplaint_SERVICE_ID,
                serviceDesc: subRequestComplaint_SERVICE_DESCRIPTION,
                regionCode: subRequestComplaint_REGION_CODE
            };

            // Handle provisioning state based on account availability
            if (selectedSubrequest.ACCOUNT_ID && selectedSubrequest.ACCOUNT_ID.trim() !== '') {
                setIsProvisioningByAccount(true);
                setProvisioningAccountId(selectedSubrequest.ACCOUNT_ID);
                setProvisioningAccountNumber(selectedSubrequest.ACCOUNT_NUMBER);
                setProvisioningType(accountStatus && accountStatus.toLowerCase() === 'active' ? 'BY_ACTIVE_ACCOUNT' : 'BY_INACTIVE_ACCOUNT');

                // Populate initial values for account-based provisioning
                initialValues.accountId = selectedSubrequest.ACCOUNT_ID;
                initialValues.accountNumber = selectedSubrequest.ACCOUNT_NUMBER;
                initialValues.productCode = selectedSubrequest.productCode;
                initialValues.productDesc = selectedSubrequest.productDesc;
                initialValues.customerCategory = selectedSubrequest.categoryCode;
                initialValues.partyId = selectedSubrequest.partyId;
                initialValues.partyProfileId = selectedSubrequest.partyProfileId;
                initialValues.productGrpId = selectedSubrequest.productGrpId;
                initialValues.productGrpDesc = selectedSubrequest.productGrpDesc;
            } else {
                setIsProvisioningByAccount(false);
                setProvisioningType('BY_PARTY');
                initialValues.partyId = partyID;
            }

            // Set service and region if available
            if (selectedSubrequest.serviceId) {
                initialValues.selectedProductService = { id: selectedSubrequest.serviceId, description: selectedSubrequest.serviceDesc };
            }
            if (selectedSubrequest.regionCode) {
                initialValues.region = selectedSubrequest.regionCode;
            }

            setSelectedSubRequest(selectedSubrequest);
        }
    }, [complaintCaptureType, SUBREQUEST_ACCOUNTID, ACCOUNT_NUMBER, accountStatus, partyID]);

    // Fetch activity details when in UPDATE mode and activityId is present

    const fetchActivityById = useCallback(
        async (activityId: string) => {
            try {
                const response = await axios.get(`${proxyURL}/custom/getActivityById?activityId=${activityId}`);
                const data = response.data?.data;
                if (data) {
                    setInitialValues((prev) => {
                        const updated = { ...prev };
                        updated.activityId = data.activityId;
                        updated.activityDesc = data.activityDesc;
                        updated.accountId = data.accountId;
                        updated.accountNumber = data.accountNo;
                        updated.accountStatus = data.accountStatus;
                        updated.partyId = data.partyId;
                        updated.partyProfileId = data.partyProfileId;
                        updated.customerName = data.customerName; // not in form, add if needed
                        updated.productGrpId = data.productGrpId;
                        updated.productGrpDesc = data.productGrpDesc;
                        updated.productCode = data.productId; // productId in API, productCode in form
                        updated.productDesc = data.productDesc;
                        updated.region = data.region;
                        updated.fcrComplaint = data.fcrComplaint;
                        updated.preferredLanguage = data.preferredLanguage;
                        updated.highSeverityFlag = data.highSeverityFlag;
                        updated.kbArticleCandidate = data.kbArticleCandidate;
                        updated.gisLocation = data.gisLocation;
                        updated.staffLocation = data.staffLocation;
                        updated.mobileDeviceType = data.mobileDeviceType;
                        updated.complaintCaptureType = data.complaintCaptureType;
                        updated.dopTypeCode = data.dopTypeCode; // possible match
                        updated.dopSubTypeCode = data.dopSubTypeCode; // possible match
                        updated.partnerName = data.partnerName; // possible match
                        updated.leadId = data.leadId; // possible match
                        updated.handlingFlag = data.handlingFlag; // possible match
                        updated.customerCategory = data.customerCategory;
                        updated.simSerialNo = data.simSerialNo;
                        updated.extensionNo = data.extensionNo;
                        (updated.disputeAmount = Array.isArray(data.disputeAmount) ? data.disputeAmount[1] : data.disputeAmount || ''), (updated.associatedAccountNumber = data.associatedAccountNumber);
                        updated.internetAvailablity = data.internetAvailablity;
                        updated.internetNumber = data.internetNumber;
                        updated.problemOccurredDate = data.problemOccuredDate ? moment(data.problemOccuredDate).toDate() : new Date();
                        updated.registeredDate = data.registeredDate ? moment(data.registeredDate).toDate() : new Date();
                        updated.selectedCrmChannel = data.crmchannelId;
                        updated.selectedProductService = data.serviceId ? { id: data.serviceId, description: data.serviceDesc } : null;
                        updated.activityPriorityFlag = data.activityPriorityFlag; // possible match
                        updated.highSeverityFlag = data.highSeverityFlag;
                        updated.isChargableVisitConfirmed = data.isChargableVisitConfirmed;
                        updated.isChargesAdvised = data.chargesAdvised;
                        updated.ucmsXferStatus = data.ucmsXferStatus;
                        (updated.refundAmount = Array.isArray(data.refundAmount) ? data.refundAmount[1] : data.refundAmount || ''), (updated.refundApprover = data.refundApprover);
                        updated.ncCustomerId = data.ncCustomerId;
                        updated.mainClosureDescriptoin = data.closureRemark; // possible match
                        updated.closureDescription = data.closureRemark; // possible match
                        updated.auxiliaryDescription = data.closureRemark; // possible match
                        updated.linkedActivityId = data.linkedActivityId;
                        updated.ttpId = data.ttpId;
                        updated.bsPriority = data.bsPriority;
                        updated.channelReferenceId = data.channelReferenceId;
                        updated.suspectedOutage = data.suspectedOutage;
                        updated.roamingEnabled = data.roamingEnabled;
                        updated.customerId = data.customerId;
                        updated.valueSegment = data.valueSegment; // possible match
                        updated.segmentId = data.segmentId; // possible match
                        updated.nationality = data.nationality; // possible match
                        updated.newMobileRetailerName = data.retailerName;

                        // GPON section
                        if (data.activityGpon) {
                            updated.elifeTechnicalDetails = {
                                ontPwrLedStatus: data.activityGpon.ontPwrLedStatus,
                                ontPwrAuthStatus: data.activityGpon.ontPwrAuthStatus,
                                ontLinkLEDStatus: data.activityGpon.ontLinkLedStatus,
                                ontLANLEDStatus: data.activityGpon.ontLanLedStatus,
                                ontRestarted: data.activityGpon.ontRestarted,
                                ontPort: data.activityGpon.ontPort,
                                ontPC: data.activityGpon.ontPc,
                                pcRestarted: data.activityGpon.pcRestarted,
                                stbRestarted: data.activityGpon.stbRestarted,
                                pppoeConnection: data.activityGpon.pppoeConnection,
                                elifeTechnicalDetails: data.activityGpon.productFaultyService?.split(' ').join('_'),
                                others: data.activityGpon.other
                            };
                        }

                        // Previous Follow Up
                        if (Array.isArray(data.activityFollowup) && Array.isArray(data.activityFollowup[1]) && data.activityFollowup[1].length > 0) {
                            updated.previousFollowUp = data.activityFollowup[1]?.map((f: any) => ({
                                remarks: f.remarks,
                                createdDt: f.lastUpdateDate || f.createdDate || '' // fallback if createdDt not present
                            }));
                        }

                        // Contact Information
                        if (Array.isArray(data.activityContact) && Array.isArray(data.activityContact[1]) && data.activityContact[1].length > 0) {
                            updated.contactInfos = data.activityContact[1]?.map((c: any) => {
                                const preferredTimeValue = preferredTimeOptions.find((opt) => opt.label === c.preferredTime)?.value || 'MORNING';
                                return {
                                    contactName: c.contactName,
                                    contactNumber: c.contactNumber,
                                    contactNumberType: c.contactType,
                                    contactEmail: c.contactEmail,
                                    preferredTime: preferredTimeValue,
                                    type: c.contactType,
                                    person: c.contactPerson,
                                    contactId: c.id
                                };
                            });
                        }

                        // Selected Services (stringified array in API)
                        if (data.selectedServices) {
                            try {
                                const parsed = JSON.parse(data.selectedServices);
                                updated.selectedServices = parsed?.map((s: any) => ({
                                    id: s.serviceId,
                                    name: s.serviceDescription
                                }));
                            } catch {
                                updated.selectedServices = [];
                            }
                        }

                        // Map refundRecords from activityAdjustment
                        if (Array.isArray(data.activityAdjustment) && Array.isArray(data.activityAdjustment[1]) && data.activityAdjustment[1].length > 0) {
                            updated.refundRecords = data.activityAdjustment[1]?.map((adj: any) => {
                                // Format billPeriod to YYYY-MM-DD if it starts with '00'
                                let billDate = Array.isArray(adj.billPeriod) ? adj.billPeriod[1] : adj.billPeriod || '';
                                if (/^00\d{2}-\d{2}-\d{2}$/.test(billDate)) {
                                    billDate = '20' + billDate.slice(2); // Replace '00' with '20'
                                }
                                return {
                                    refundAmount: Array.isArray(adj.disputeAmount) ? adj.disputeAmount[1] : adj.disputeAmount || '',
                                    billDate,
                                    adjustmentType: adj.adjustmentType || '',
                                    chargeCode: adj.chargeCode || '',
                                    adjustmentRemarks: adj.remarks || '',
                                    adjustmentId: adj.adjustmentId || ''
                                };
                            });
                        }

                        if (Array.isArray(data.activityAttachment)) {
                            // The API returns [ "java.util.ArrayList", [ ...attachments ] ]
                            const attachmentsArr = Array.isArray(data.activityAttachment[1]) ? data.activityAttachment[1] : [];
                            updated.attachmentInfos = attachmentsArr?.map((att: any) => {
                                // Calculate size from base64 string
                                const base64 = att.attachmentData || '';
                                // Remove data URL prefix if present
                                const base64Data = base64?.split(',').pop() || '';
                                // Calculate bytes: (length * 3/4) - padding
                                const padding = (base64Data.match(/=+$/) || [''])[0].length;
                                const sizeInBytes = base64Data.length * 0.75 - padding;
                                const sizeInKB = (sizeInBytes / 1024).toFixed(2) + ' KB';

                                // Convert base64 to Blob/File
                                function base64ToFile(base64Str: string, filename: string, mimeType: string) {
                                    const arr = base64Str?.split(',');
                                    const bstr = window.atob(arr[arr.length - 1]);
                                    let n = bstr.length;
                                    const u8arr = new Uint8Array(n);
                                    while (n--) {
                                        u8arr[n] = bstr.charCodeAt(n);
                                    }
                                    return new File([u8arr], filename, { type: mimeType });
                                }

                                const fileObj = base64 ? base64ToFile(base64, att.attachmentName, att.contentType || 'application/octet-stream') : null;

                                return {
                                    name: att.attachmentName,
                                    type: att.contentType || 'PASSPORT',
                                    size: sizeInKB,
                                    file: fileObj,
                                    attachmentId: att.id
                                };
                            });
                        }

                        // TODO: Map other fields as needed from API response
                        return updated;
                    });

                    const category = categories?.find((category) => category.code === data?.activityCategory);
                    if (category) {
                        const { natures } = category || {};
                        const selectedNature = natures?.find((nature) => nature.code === data?.activityNature);
                        if (selectedNature) {
                            const { types } = selectedNature || {};
                            setSelectedNature(selectedNature);
                            const selectedType = types?.find((nature) => nature.code === data?.activityType);
                            if (selectedType) {
                                onTypeSelect(selectedType);

                                const { specialFields } = selectedType || {};
                                if (specialFields?.length) {
                                    // Set specialFields in form initial values by mapping attributeId to id
                                    if (Array.isArray(data.activitySplFlds) && Array.isArray(data.activitySplFlds[1])) {
                                        const splFieldsArr = data.activitySplFlds[1];
                                        const updatedSpecialFields = specialFields?.map((sf: any) => {
                                            const match = splFieldsArr.find((item: any) => String(item.attributeId) === String(sf.id));
                                            return {
                                                ...sf,
                                                displayedValue: match ? match.attributeValue : '',
                                                specialFieldId: match ? match.specialFieldId : ''
                                            };
                                        });
                                        setInitialValues((prev) => ({
                                            ...prev,
                                            specialFields: updatedSpecialFields
                                        }));
                                    }
                                }
                            }
                        }
                    }

                    setActivityStatus(data?.activityStatus);
                }
            } catch (error) {
                // Optionally handle error
                console.error('Failed to fetch activity by id', error);
            }
        },
        [categories]
    );

    useEffect(() => {
        if (complaintCaptureType === ComplaintCaptureMode.UPDATE && activityId) {
            fetchActivityById(activityId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [complaintCaptureType, activityId, categories]);

    const isAffectedServicesDisabled = (): boolean => {
        return (
            complaintCaptureType === ComplaintCaptureMode.UPDATE ||
            (subRequest != null && subRequest.toLocaleLowerCase() === 'true' && (selectedType?.activityGroupCode === ActivityGroupCode.PROVISION.toString() || selectedType?.activityGroupCode === ActivityGroupCode.PROVISIONMANUAL.toString()))
        );
    };

    const isGponEnabled = (): boolean => {
        const shouldRenderGPON = (!!productGroupCode && productGroupCode.toString().toLowerCase() === 'fixed') || (complaintCaptureType === ComplaintCaptureMode.UPDATE && !!accountID);

        return (
            !!shouldRenderGPON &&
            ![
                ActivityGroupCode.BILL.toString()?.toUpperCase(),
                ActivityGroupCode.REQUEST_ACTIVE.toString()?.toUpperCase(),
                ActivityGroupCode.REQUEST_INACTIVE.toString()?.toUpperCase(),
                ActivityGroupCode.REQUEST_BOTH.toString()?.toUpperCase(),
                ActivityGroupCode.ADJUSTUCMS.toString()?.toUpperCase(),
                ActivityGroupCode.PROVISION.toString()?.toUpperCase(),
                ActivityGroupCode.PROVISIONMANUAL.toString()?.toUpperCase()
            ].includes(selectedType?.activityGroupCode?.toString()?.toUpperCase() ?? '') &&
            complaintCaptureType !== ComplaintCaptureMode.CREATE_BY_PARTY
        );
    };

    const isSpecialFields = (): boolean => {
        if (selectedType?.specialFields !== null && selectedType?.specialFields?.length) return true;
        else return false;
    };

    // Submit handler
    const handleSubmit = async (values: any, actions: any) => {
        console.log('values: ', values, ' Errors: ', actions);
        // FE validation: all checklist items must be checked
        if (!isUpdate && dynamicChecklist.length > 0 && checkedChecklist.length !== dynamicChecklist.length) {
            setChecklistError('Please check all checklist items before submitting.');
            actions.setSubmitting(false);
            return;
        }
        setChecklistError(null);
        // Generate a unique 9-digit transactionId (e.g., 123456789)

        if (!isAffectedServicesDisabled && (values.selectedServices?.length || 0) < 1) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Affected Services is required', life: 15000 });
            return;
        }

        // For CREATE mode, check for waiver warnings first
        if (!isUpdate) {
            // Check if this is an ADJUSTUCMS complaint and waiver is repeated
            if (selectedType?.activityGroupCode?.toString().toUpperCase() === ActivityGroupCode.ADJUSTUCMS && isWaiverRepeatedRequest) {
                setPendingSubmission({ values, actions });
                setShowWaiverWarning(true);
                return;
            }

            setPendingSubmission({ values, actions });
            setShowPreCheckModal(true);
            return;
        }

        // For UPDATE mode or after confirmation, proceed with submission
        await proceedWithSubmission(values, actions);
    };

    // Proceed with actual submission after confirmation
    const proceedWithSubmission = async (values: any, actions: any) => {
        let payload;
        if (isUpdate) {
            // Helper to compare contacts
            const getContactAction = (contact: any, initialContacts: any[]) => {
                const initial = initialContacts.find((c) => c.contactId === contact.contactId);
                if (!initial) return 'add';
                // Compare fields except contactId
                const keys = ['contactName', 'contactNumberType', 'contactNumber', 'contactPriority', 'contactEmail', 'preferredTime'];
                const changed = keys.some((key) => initial[key] !== contact[key]);
                return changed ? 'update' : null;
            };

            // Contacts to add/update
            const contacts = (values.contactInfos || [])
                ?.map((contact: any) => {
                    const action = getContactAction(contact, initialValues.contactInfos || []);
                    if (action) {
                        const {
                            contactName,
                            contactNumberType, // this is contactMode
                            contactNumber,
                            contactEmail,
                            preferredTime,
                            contactId
                        } = contact;
                        const preferredTimeLabel = preferredTimeOptions.find((opt) => opt.value === preferredTime)?.label || preferredTime;
                        return {
                            contactName,
                            contactMode: contactNumberType,
                            contactNumber,
                            contactPriority: '1',
                            contactEmail,
                            preferredTime: preferredTimeLabel,
                            contactId,
                            action
                        };
                    }
                    return null;
                })
                .filter(Boolean);

            // Contacts to delete
            const deletedContacts = (initialValues.contactInfos || []).filter((initial: any) => !(values.contactInfos || []).some((c: any) => c.contactId === initial.contactId))?.map((contact: any) => ({ ...contact, action: 'delete' }));

            const mergedContacts = [...contacts, ...deletedContacts];

            // Only new attachments (those without an attachmentId)
            const newAttachments = (values.attachmentInfos || [])
                .filter((att: any) => !att.attachmentId)
                ?.map((att: any) => ({
                    name: att.name,
                    type: att.type
                }));
            // Refund records add/update/delete logic
            const getRefundAction = (refund: any, initialRefunds: any[]) => {
                const initial = initialRefunds.find((r) => r.adjustmentId === refund.adjustmentId);
                if (!initial) return 'add';
                // Compare fields except adjustmentId
                const keys = ['refundAmount', 'billDate', 'adjustmentType', 'chargeCode', 'adjustmentRemarks'];
                const changed = keys.some((key) => initial[key] !== refund[key]);
                return changed ? 'update' : null;
            };

            // Refunds to add/update
            const refundRecords = (values.refundRecords || [])
                ?.map((refund: any) => {
                    const action = getRefundAction(refund, initialValues.refundRecords || []);
                    if (action) {
                        return {
                            ...refund,
                            adjustmentId: refund.adjustmentId ? refund.adjustmentId : -1,
                            action
                        };
                    }
                    return null;
                })
                .filter(Boolean);

            // Refunds to delete
            const deletedRefunds = (initialValues.refundRecords || []).filter((initial: any) => !(values.refundRecords || []).some((r: any) => r.adjustmentId === initial.adjustmentId))?.map((refund: any) => ({ ...refund, action: 'delete' }));

            const mergedRefundRecords = [...refundRecords, ...deletedRefunds];

            payload = {
                complaintID: values.activityId || '',
                transactionId: generateTransactionId(),
                updateRemark: values.updateActivityRemarks || '',
                userID: userName || '',
                additionalInfo: values.additionalInfo || '',
                customerSegment: values.customerSegment || customerSegment || '',
                accountNumber: values.accountNumber || accountNumber || '',
                accountId: values.accountId || accountID || '',
                problemOccuredDate: values.problemOccurredDate ? moment(values.problemOccurredDate).format('YYYY-MM-DD') : null,
                regionCode: values.region || null,
                channelCode: values.selectedCrmChannel || null,
                complaintPriorityFlag: values.selectedProductService?.id?.prodcutCode || null,
                kbArticleCandidate: values.kbArticleCandidate ?? null,
                complaintCaptureType: values.complaintCaptureType ?? null,
                customerId: values.customerId ?? null,
                partnerName: values.partnerName ?? null,
                contacts: mergedContacts?.length ? mergedContacts : undefined,
                attachments: newAttachments?.length ? newAttachments : undefined,
                specialField: isSpecialFields()
                    ? (values.specialFields || [])
                          ?.filter((specialField: any) => specialField.displayedValue)
                          ?.map((a: any) => ({
                              name: a.name,
                              value: a.displayedValue,
                              attributeId: a.id,
                              displayOrder: a.displayOrder,
                              specialFieldId: a.specialFieldId
                          }))
                    : [],
                adjustmentDetails: isRefund() ? (mergedRefundRecords?.length ? mergedRefundRecords : undefined) : [],
                elifeTechnicalDetails:
                    isGponEnabled() && values.elifeTechnicalDetails !== null
                        ? {
                              ontPwrLEDStatus: values.elifeTechnicalDetails.ontPwrLedStatus || '',
                              ontPwrAuthStatus: values.elifeTechnicalDetails.ontPwrAuthStatus || '',
                              ontLinkLEDStatus: values.elifeTechnicalDetails.ontLinkLEDStatus || '',
                              ontLANLEDStatus: values.elifeTechnicalDetails.ontLANLEDStatus || '',
                              ontRestarted: values.elifeTechnicalDetails.ontRestarted || '',
                              ontPort: values.elifeTechnicalDetails.ontPort || '',
                              ontPC: values.elifeTechnicalDetails.ontPC || '',
                              pcRestarted: values.elifeTechnicalDetails.pcRestarted || '',
                              stbRestarted: values.elifeTechnicalDetails.stbRestarted || '',
                              pppoeConnection: values.elifeTechnicalDetails.pppoeConnection || '',
                              elifeTechnicalDetails: values.elifeTechnicalDetails.elifeTechnicalDetails || '',
                              others: ''
                          }
                        : {
                              ontPwrLEDStatus: '',
                              ontPwrAuthStatus: '',
                              ontLinkLEDStatus: '',
                              ontLANLEDStatus: '',
                              ontRestarted: '',
                              ontPort: '',
                              ontPC: '',
                              pcRestarted: '',
                              stbRestarted: '',
                              pppoeConnection: '',
                              elifeTechnicalDetails: '',
                              others: ''
                          },
                activityTypeId: selectedType?.id || ''
            };
        } else { 
            /* ~~~~~~~~~~~~~~~~~~~~~~~~~ */
            /* For Create Complaint only */
            /* ~~~~~~~~~~~~~~~~~~~~~~~~~ */
            // console.log(`>>>>> values.contactInfos:: ${JSON.stringify(values.contactInfos)}`);
            // console.log('>>> values.attachmentInfos ', values.attachmentInfos);
            // console.log(`>>>> values.elifeTechnicalDetails :: ${values.elifeTechnicalDetails} - ${values.ontPwrLedStatus}`);

            payload = {
                transactionId: generateTransactionId(),
                complaintDescription: values.activityDesc || '',
                registeredDate: moment().format('YYYY-MM-DD'),
                // checking this 1
                suspectedOutage: values.suspectedOutage?.label !== '--Select Suspected Outage--' ? values.suspectedOutage?.outageCode : '',
                problemOccuredDate: values.problemOccurredDate ? moment(values.problemOccurredDate).format('YYYY-MM-DD') : '',
                complaintNatureCode: selectedNature?.code || '',
                complaintTypeCode: selectedType?.code || '',
                accountNumber: values.accountNumber || accountNumber || '',
                channelCode: values.selectedCrmChannel || '',
                createdUserId: userName || '',
                staffName: agentName || agentName==='null' ? agentName : userName,
                staffLocation: agentLocation || agentLocation==='null' ? agentLocation : values.region,
                subRequestId: values.subRequestId || '',
                specialField: isSpecialFields()
                    ? (values.specialFields || [])
                          ?.filter((specialField: any) => specialField.displayedValue)
                          ?.map((a: any) => ({
                              name: a.name,
                              value: a.displayedValue
                          }))
                    : [],
                kbArticleCandidate: values.kbArticleCandidate,
                complaintCaptureType: values.complaintCaptureType,

                // TODO technicalComplaintId need to mapped
                technicalComplaintId: '',

                accountId: accountID,

                //TODO these both need to set/mapped
                issueType: '',
                complaintPriority: '',

                technicianVisitRequired: values.technicianVisitRequired ? 1 : 0,
                // attachment: [],
                // this below block will be used when update BE code deployed.
                attachment: (values.attachmentInfos || [{ name: '', type: '' }])?.map((att: any) => ({
                    name: att.name,
                    type: att.type
                })),
                contactDetails: (values.contactInfos || [])?.map((c: any, idx: number) => ({
                    contactName: c.contactName,
                    contactMode: c.contactNumberType,
                    contactNumber: c.contactNumber,
                    contactPriority: String(idx + 1),
                    contactEmail: c.contactEmail,
                    preferredTime: c.preferredTime
                })),
                preferredLanguage: values.preferredLanguage || '',
                gisLocation: values.gisLocation || '',
                complaintPriorityFlag: values.selectedProductService?.id?.prodcutCode || '',
                additionalInfo: values.additionalInfo || '',
                partyId: values.partyId || partyIDAssignable,
                sourceChannel: sourceChannelId || '',
                customerSegment: values.customerSegment || customerSegment || '',
                isTechnical: values.isTechnical ? 1 : 0,
                gisTemporaryID: values.gisTemporaryID || '',
                customerAdvisedForPossibleCharges: !!values.isChargesAdvised,
                chargeableVisitConfirmed: !!values.isChargableVisitConfirmed,
                roamingFlag: !!values.roamingEnabled,
                channelReferenceId: values.channelReferenceId || '',
                adjustmentDetails: isRefund() ? values.refundRecords : [],
                ttpId: values.ttpId || '',
                bsPriority: values.bsPriority || '',
                handlingFlag: values.handlingFlag !== '--Select Mark Complaint As--' ? values.handlingFlag : '',
                // haider
                mainClosureCode: values.mainClosureDescription,
                closureCode: values.closureDescription,
                auxClosureCode: values.auxiliaryDescription,
                ncCustomerId: customerID,
                linkedActivityId: values.linkedActivityId || '',
                refundApprover: values.refundApprover || '',
                dopTypeDesc: values.dopTypeDesc || '',
                dopSubTypeDesc: values.dopSubTypeDesc || '',
                isAdjustment: !!values.isAdjustment,
                fcrComplaint: !!values.fcrComplaint,
                highSeverityFlag: !!values.highSeverityFlag,
                isChargesAdvised: !!values.isChargesAdvised,
                ucmsXferStatus: !!values.ucmsXferStatus,
                selectedAdjustmentDOPType: values.selectedAdjustmentDOPType || {
                    code: '',
                    typeId: '',
                    description: ''
                },
                regionCode: values.region || '',
                serviceId: values.selectedServices?.length > 0 ? values.selectedServices[0]?.id : '',
                serviceDesc: values.selectedServices?.length > 0 ? values.selectedServices[0]?.name : '',
                dopTypeCode: dopTypeCode || '',
                dopSubTypeCode: values.dopSubTypeCode || '',
                jwtToken: '',
                productCode: productCode || '',
                productGrpCode: productGroupCode || '',
                productGrpDesc: productDesc || '',
                productDesc: productDesc || '',
                // TODO this 3 fields are not cover in BFF right now.
                // associatedAccountNumber: values.associatedAccountNumber,
                // expectedResolutionDate: values.expectedResolutionDate,
                // internetAvailability: values.internetAvailability,

                selectedServices: values.selectedServices?.map((mp: any) => ({
                    serviceId: mp.id,
                    serviceDescription: mp.name
                })) || [
                    {
                        serviceId: '',
                        serviceDescription: ''
                    }
                ],

                newLinkedActivity: values.newLinkedComplaint || {},
                hasNewLinkedComplaint: values.hasNewLinkedComplaint || false,

                // GPON block fields
                elifeTechnicalDetails:
                    isGponEnabled() && values.elifeTechnicalDetails !== null
                        ? {
                              ontPwrLEDStatus: values.elifeTechnicalDetails.ontPwrLedStatus || '',
                              ontPwrAuthStatus: values.elifeTechnicalDetails.ontPwrAuthStatus || '',
                              ontLinkLEDStatus: values.elifeTechnicalDetails.ontLinkLEDStatus || '',
                              ontLANLEDStatus: values.elifeTechnicalDetails.ontLANLEDStatus || '',
                              ontRestarted: values.elifeTechnicalDetails.ontRestarted || '',
                              ontPort: values.elifeTechnicalDetails.ontPort || '',
                              ontPC: values.elifeTechnicalDetails.ontPC || '',
                              pcRestarted: values.elifeTechnicalDetails.pcRestarted || '',
                              stbRestarted: values.elifeTechnicalDetails.stbRestarted || '',
                              pppoeConnection: values.elifeTechnicalDetails.pppoeConnection || '',
                              elifeTechnicalDetails: values.elifeTechnicalDetails.elifeTechnicalDetails || '',
                              others: ''
                          }
                        : {
                              ontPwrLEDStatus: '',
                              ontPwrAuthStatus: '',
                              ontLinkLEDStatus: '',
                              ontLANLEDStatus: '',
                              ontRestarted: '',
                              ontPort: '',
                              ontPC: '',
                              pcRestarted: '',
                              stbRestarted: '',
                              pppoeConnection: '',
                              elifeTechnicalDetails: '',
                              others: ''
                          },
                cbcmCustomerSegment: customerSegmentDesc,
                consumerValueSegment: consumerValueSegment,
                businessValueSegment: valueSegment
            };
        }

        console.log('>>> payload::: ', { payload });

        // Prepare FormData
        const formData = new FormData();
        // Append all payload fields to FormData
        formData.append('complaintRequest', JSON.stringify(payload));

        // If you have file attachments, append them as files
        const attachments = isUpdate ? (values.attachmentInfos || []).filter((att: any) => !att.attachmentId) : values.attachmentInfos || [];

        if (Array.isArray(attachments)) {
            attachments.forEach((fileObj: any) => {
                // For update, fileObj.file is the File; for create, fileObj may be the File directly or an object with .file
                const file = fileObj.file || fileObj;
                if (file) {
                    formData.append('files', file);
                }
            });
        }

        try {
            try {
                if (!isUpdate && values.isBulkComplaintOn && values.bulkComplaintValidateResponse?.data?.length) {
                    const bulkData = values.bulkComplaintValidateResponse.data;
                    const type = values.bulkComplaintValidateResponse.accountType;

                    // Extract account values from bulk data
                    const accountValues = bulkData.map((item: any) => item.account);

                    // Determine the key and update based on type
                    if (type === 'accountNumber') {
                        // Remove accountId from payload
                        delete (payload as any).accountId;

                        // Append accountValues to existing accountNumber (comma separated)
                        const existingAccountNumber = (payload as any).accountNumber || '';
                        const allAccountNumbers = existingAccountNumber ? [existingAccountNumber, ...accountValues].join(',') : accountValues.join(',');
                        (payload as any).accountNumber = allAccountNumbers;
                    } else {
                        // Remove accountNumber from payload
                        delete (payload as any).accountNumber;

                        // Append accountValues to existing accountId (comma separated)
                        const existingAccountId = (payload as any).accountId || '';
                        const allAccountIds = existingAccountId ? [existingAccountId, ...accountValues].join(',') : accountValues.join(',');
                        (payload as any).accountId = allAccountIds;
                    }

                    const formData = new FormData();
                    // Append all payload fields to FormData
                    formData.append('complaintRequest', JSON.stringify(payload));

                    // If you have file attachments, append them as files
                    const attachments = isUpdate ? (values.attachmentInfos || []).filter((att: any) => !att.attachmentId) : values.attachmentInfos || [];

                    if (Array.isArray(attachments)) {
                        attachments.forEach((fileObj: any) => {
                            // For update, fileObj.file is the File; for create, fileObj may be the File directly or an object with .file
                            const file = fileObj.file || fileObj;
                            if (file) {
                                formData.append('files', file);
                            }
                        });
                    }

                    // Use /createBulk endpoint
                    const data = await fetch(`${proxyURL}/custom/createBulk`, {
                        method: 'POST',
                        headers: {
                            // Note: When sending FormData, it's best to omit the Content-Type header.
                            // The browser will set it automatically, including the correct boundary.
                        },
                        body: formData
                    });
                    const response = await data.json();

                    actions.setSubmitting(false);
                    if (response.statusCode === 'Internal Server Error' || (response?.responseMessage && !['0', '00'].includes(response?.responseCode))) {
                        toast.current?.show({ severity: 'error', summary: 'Error', detail: response?.responseMessage || `Complaint ${isUpdate ? 'Update' : 'Creation'} Failed!`, life: 15000 });
                        return;
                    }
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Bulk Complaints Created Successfully!`,
                        life: 15000
                    });
                    // Reset form after successful bulk creation
                    formikRef.current?.resetForm();
                    setCheckedChecklist([]);

                    // Redirect after successful bulk creation
                    // For bulk complaints, we'll use the first complaint ID or the overall ID if available
                    const bulkComplaintId = response?.complaintId || response?.complaintIds?.[0];
                    if (bulkComplaintId) {
                        const redirectUrl = buildRedirectURL(bulkComplaintId);
                        window.open(redirectUrl, '_blank');
                    }
                    return;
                }
            } catch (error) {
                console.error('Bulk complaint creation error:', error);
                actions.setSubmitting(false);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Bulk Complaint Creation Failed!',
                    life: 15000
                });
                return
            }
            const data = await fetch(`${proxyURL}/custom/${isUpdate ? 'update' : 'create'}`, {
                method: 'POST',
                headers: {
                    // Note: When sending FormData, it's best to omit the Content-Type header.
                    // The browser will set it automatically, including the correct boundary.
                    // 'Content-Type': 'multipart/form-data' // <-- omit this line
                },
                body: formData
            });
            const response = await data.json(); // or response.text() if expecting plain text
            // "VAL301" for code for duplicate error
            // response.code === 0 or 00    means successful
            // response.code === GENERAL_SYSTEM_ERROR_CODE
            // responseMessage: "\"Refund amount is incompatible with activity type\""

            actions.setSubmitting(false);
            if (response?.responseMessage && !['0', '00'].includes(response?.responseCode)) {
                if (response?.responseMessage?.toLowerCase().includes('org.springframework')) {
                    toast.current?.show({ severity: 'error', summary: 'Error', detail: `Complaint ${isUpdate ? 'Update' : 'Creation'} Failed! \n Administrator: check stack trace for more details`, life: 15000 });
                    return;
                }
                toast.current?.show({ severity: 'error', summary: 'Error', detail: response?.responseMessage, life: 15000 });
                return;
            }
            toast.current?.show({ severity: 'success', summary: 'Success', detail: `Complaint ${isUpdate ? 'Updated' : 'Created'} Successfully with this id: ${response?.complaintId}!`, life: 15000 });
            console.log({ response });
            // Reset form after successful creation
            if (!isUpdate) {
                formikRef.current?.resetForm();
                setCheckedChecklist([]);

                // Redirect to interactionURL with all current params and COMPLAINT_ID
                if (response?.complaintId) {
                    const redirectUrl = buildRedirectURL(response.complaintId);
                    window.open(redirectUrl, '_blank');
                }
            } else {
                // Redirect after successful update
                if (response?.complaintId) {
                    const redirectUrl = buildRedirectURL(response.complaintId);
                    window.open(redirectUrl, '_blank');
                }
            }
        } catch (error) {
            console.log('Complaint-create :: ', { error });
            actions.setSubmitting(false);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: `Complaint ${isUpdate ? 'Update' : 'Creation'} Failed!`, life: 15000 });
        }
    };

    useEffect(() => {
        async function fetchOptions() {
            try {
                let params = '';
                if (complaintCaptureType === ComplaintCaptureMode.UPDATE) {
                    params = `complaintCaptureMode=${complaintCaptureType}&sourceChannelID=${sourceChannelId}&productCode=${productCode}&customerSegment=${customerSegment}&categoryCode=${categoryCode}&accountStatus=${accountStatus}`;
                } else if (mode === Mode.Normal) {
                    params = `productCode=${productCode}&customerSegment=${customerSegment}&accountStatus=${accountStatus}&isBitstream=${isBitstream}&sourceChannelID=${sourceChannelId}&complaintCaptureMode=${complaintCaptureType}`;
                } else {
                    params = `complaintCaptureMode=${complaintCaptureType}&sourceChannelID=${sourceChannelId}&productCode=${productCode}`;
                }
                const response = await axios.get(`${proxyURL}/custom/getExtendedActivityCategories?${params}&action=GetExtendedActivityCategories&actionCode=GetExtendedActivityCategories`);
                const { categories } = response?.data?.data || {};
                setCategories(categories || []);
                setSelectedCategory(categoryCode || categories[0]?.code || '');
            } catch {
            } finally {
            }
        }
        fetchOptions();
    }, [complaintCaptureType, mode, categoryCode]);

    // Fetch dynamic checklist when selectedCategory changes
    useEffect(() => {
        async function fetchChecklist() {
            if (!selectedCategory) {
                setDynamicChecklist([]);
                setCheckedChecklist([]);
                return;
            }
            // Map selectedCategory to groupCode
            const groupCode = selectedCategory.toLowerCase() === 'billing' ? 'BILLING' : 'TECHNICAL';
            try {
                const checklistItems = await fetchActivityChecklistByGroup(groupCode);
                if (Array.isArray(checklistItems)) {
                    setDynamicChecklist(checklistItems);
                    setCheckedChecklist([]); // reset checked state
                } else {
                    setDynamicChecklist([]);
                    setCheckedChecklist([]);
                }
            } catch {
                setDynamicChecklist([]);
                setCheckedChecklist([]);
            }
        }
        fetchChecklist();
    }, [selectedCategory]);

    const natures = useMemo(
        () =>
            categories.find((category) => {
                return category.code?.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase();
            })?.natures || [],
        [selectedCategory, categories]
    );

    // Whenever natures change, update selectedNature to first nature
    useEffect(() => {
        setSelectedNature(natures?.[0]);
        onTypeSelect(natures?.[0]?.types?.[0]);
    }, [natures]);

    // Wheneve selectedType change and update the all required state variable to default state.
    /*useEffect(() => {
        // setIsClosureOpen(false);
    }, [selectedType]);*/

    useEffect(() => {
        async function fetchAccountAlerts() {
            try {
                const response = await axios.get(`${proxyURL}/custom/getAccountFlagAlerts?accountNumber=${accountNumber}`);
                const alerts = response?.data?.data?.alerts;
                if (alerts) {
                    toast.current?.show({
                        severity: 'warn',
                        summary: 'Account Alerts',
                        detail: typeof alerts === 'string' ? alerts : JSON.stringify(alerts),
                        life: 15000
                    });
                }
            } catch (error) {
                // Optionally handle error
            }
        }
        fetchAccountAlerts();
    }, []);

    return (
        <>
            <Toast ref={toast} />
            <AccountStatusDialog visible={showAccountStatusDialog} accountStatus={accountStatus || ''} onHide={() => setShowAccountStatusDialog(false)} />

            {/* Pre-check confirmation modal */}
            <Dialog
                header="Pre check information"
                visible={showPreCheckModal}
                style={{ width: '450px' }}
                modal
                onHide={() => {
                    setShowPreCheckModal(false);
                    setPendingSubmission(null);
                    if (pendingSubmission?.actions) {
                        pendingSubmission.actions.setSubmitting(false);
                    }
                }}
                footer={
                    <div>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            onClick={() => {
                                setShowPreCheckModal(false);
                                setPendingSubmission(null);
                                if (pendingSubmission?.actions) {
                                    pendingSubmission.actions.setSubmitting(false);
                                }
                            }}
                            className="p-button-text"
                        />
                        <Button
                            label="Ok"
                            icon="pi pi-check"
                            onClick={async () => {
                                setShowPreCheckModal(false);
                                if (pendingSubmission) {
                                    await proceedWithSubmission(pendingSubmission.values, pendingSubmission.actions);
                                    setPendingSubmission(null);
                                }
                            }}
                            autoFocus
                        />
                    </div>
                }
            >
                <div className="confirmation-content">
                    <i className="pi pi-info-circle" style={{ fontSize: '2rem', marginRight: '1rem', color: '#2196F3' }}></i>
                    <span>
                        {complaintCaptureType === ComplaintCaptureMode.CREATE_BY_ACCOUNT && (
                            <>
                                Complaint will be registered for Customer: <strong>{Customers[Object.keys(Customers)?.[0]]?.customerName || 'N/A'}</strong> Account Number: <strong>{accountNumber || 'N/A'}</strong>
                            </>
                        )}
                        {complaintCaptureType === ComplaintCaptureMode.CREATE_BY_NEW_MOBILE && (
                            <>
                                Complaint will be registered for New Mobile Number: <strong>{contactNumber || ACCOUNT_NUMBER || 'N/A'}</strong>
                            </>
                        )}
                        {complaintCaptureType === ComplaintCaptureMode.CREATE_BY_PARTY && (
                            <>
                                Complaint will be registered for Party ID: <strong>{partyID || 'N/A'}</strong>
                            </>
                        )}
                        {complaintCaptureType === ComplaintCaptureMode.CREATE_BY_SUBREQUEST && (
                            <>
                                Complaint will be registered for Subrequest ID: <strong>{SUBREQUEST_ID || subRequestId || 'N/A'}</strong>
                            </>
                        )}
                    </span>
                </div>
            </Dialog>

            <WaiverWarningModal
                visible={showWaiverWarning}
                onHide={() => {
                    setShowWaiverWarning(false);
                    setPendingSubmission(null);
                    if (pendingSubmission?.actions) {
                        pendingSubmission.actions.setSubmitting(false);
                    }
                }}
                onProceed={() => {
                    setShowWaiverWarning(false);
                    // After waiver warning, show pre-check modal
                    if (pendingSubmission) {
                        setShowPreCheckModal(true);
                    }
                }}
            />

            <SubOrderWarningModal
                visible={showSubOrderWarning}
                onHide={() => setShowSubOrderWarning(false)}
                onProceed={() => {
                    setShowSubOrderWarning(false);
                    setProceedAfterWarning(true);
                }}
            />

            <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={ComplaintFormSchema} onSubmit={handleSubmit} enableReinitialize>
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => {
                    console.log({ values, errors });
                    function cn(...classes: (string | undefined | null | false)[]): string {
                        return classes.filter(Boolean).join(' ');
                    }

                    return (
                        <Form>
                            {/* Mode and category selection UI */}
                            {complaintCaptureType !== 'CREATE_BY_NEW_MOBILE' && (
                                <div className="flex items-center bg-white justify-between p-2! rounded-[10px] mb-2 min-h-12">
                                    <div className="flex flex-col">
                                        <p className="m-0! text-xs! font-semibold">You Can change your mode From Normal To General</p>
                                        <span className='text-mauves'>{mode === Mode.Normal && <p className="m-0! text-xs! font-semibold ">{complaintText}</p>}</span>
                                    </div>
                                    <div className='flex items-center justify-end gap-2'>
                                        <p className='leading-4 pt-1!'>{mode}</p>
                                        <InputSwitch  className="scale-75" checked={mode === Mode.General} onChange={(e) => setMode(e.value ? Mode.General : Mode.Normal)} />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-start overflow-x-auto tab-button-styling">
                                {categories?.map((cat, index) => (
                                    <span id={cat.code} key={cat.code}>
                                        <Button
                                            className={` text-[#999] p-3! w-auto!  border-0! border-b-2! font-medium ${
                                                index === 0 ? 'rounded-none! rounded-tl-xl!' : index === categories.length - 1 ? 'rounded-none! rounded-tr-xl!' : 'rounded-none!'
                                            } ${
                                                selectedCategory === cat.code ? 'bg-mauves! text-white!  border-0! border-b-2! ' : ''
                                            } inline-block relative border-0 p-0 no-underline! cursor-pointer text-center overflow-visible`}
                                            role="button"
                                            aria-disabled="false"
                                            type="button"
                                            onClick={() => setSelectedCategory(cat.code)}
                                            style={{ backgroundColor: selectedCategory === cat.code ? '#ff8c26' : 'white', color: selectedCategory === cat.code ? '#fff' : '#191329B2', borderColor: selectedCategory === cat.code ? '#631C46' : 'white' }}
                                        >
                                            <span className="ui-button-text ui-c" >
                                                {cat.description}
                                            </span>
                                        </Button>
                                    </span>
                                ))}
                            </div>

                            <div className='TabContentWithSidebar flex!'>
                                <ComplaintLeftSection setFieldValue={setFieldValue} natures={natures} selectedNature={selectedNature} setSelectedNature={setSelectedNature} selectedType={selectedType} setSelectedType={onTypeSelect} />
                                <div className='border border-l-0! border-neutral-400 bg-white w-[75%] p-2'>

                                    <div className={cn("w-full flex flex-col gap-2")}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 cursor-pointer mb-2">
                                            <div className="w-10 h-10 rounded-[10px] bg-[#F0E9ED] text-mauves flex items-center justify-center">
                                                <UserCircle className="h-7 w-7" strokeWidth={1.25} />
                                            </div>
                                            <h2 className="pt-0.75 text-sm!">Complaint Information</h2>
                                            </div>
                                            <div className="flex items-center gap-2"> </div>
                                        </div>
                                        </div>





                                    <ComplaintInformationForm
                                        selectedCategory={selectedCategory}
                                        selectedNature={selectedNature}
                                        selectedType={selectedType}
                                        sourceChannelId={sourceChannelId}
                                        fields={values}
                                        errors={errors}
                                        touched={touched}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue}
                                        onSubmit={() => {}}
                                        setShouldShowFvr={setIsClosureOpen}
                                        isAffectedServicesDisabled={isAffectedServicesDisabled}
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

                                    {/* start Subrequest id, subrequest details, ecd are mandatory for the provisioning complaint. */}
                                    {/* Sub Orders Table (Provisioning complaints) */}
                                    <div style={{ marginBottom: 8 }}>
                                        {showSubRequestsTable() && (
                                            // && ['Digital','Customer Service','Online','Provisioning','Billing','Technical','Retail Sales','Waivers Request'].includes(selectedCategory)
                                            <DataPanel
                                                selectedRow={selectedRow}
                                                setSelectedRow={setSelectedRow}
                                                autoPublish={true}
                                                api={`${proxyURL}/`}
                                                params={{
                                                    accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                                                    ...(isDebugMode ? { isDebugMode } : {})
                                                }}
                                                headerTxt="Sub Orders"
                                                isRenderable={true}
                                                layout="table"
                                                debugMode={isDebugMode}
                                            />
                                        )}
                                    </div>

                                    {isClosureOpen && (
                                        <div>
                                            <FcrClosure fields={values} errors={errors} touched={touched} handleChange={handleChange} setFieldValue={setFieldValue} isClosureOpen={isClosureOpen} />
                                        </div>
                                    )}

                                    {isGponEnabled() && <GponForm fields={values} errors={errors} touched={touched} handleChange={handleChange} setFieldValue={setFieldValue} />}

                                    <ContactInformation
                                        contactInfos={values.contactInfos}
                                        setContactInfos={(infos) => setFieldValue('contactInfos', infos)}
                                        errors={errors}
                                        touched={touched}
                                        setFieldValue={setFieldValue}
                                        preferredTimeOptions={preferredTimeOptions}
                                    />

                                    {isSpecialFields() && (
                                        <SpecialFields specialFields={values?.specialFields?.length ? values?.specialFields || [] : selectedType?.specialFields || []} onChange={(updatedFields) => setFieldValue('specialFields', updatedFields)} />
                                    )}

                                    <BulkComplaint
                                        isBulkComplaintOn={values.isBulkComplaintOn}
                                        setIsBulkComplaintOn={(enabled) => setFieldValue('isBulkComplaintOn', enabled)}
                                        bulkComplaintValidateResponse={values.bulkComplaintValidateResponse}
                                        setBulkComplaintValidateResponse={(data) => setFieldValue('bulkComplaintValidateResponse', data)}
                                        fcrComplaint={values.fcrComplaint}
                                    />

                                    <AttachmentForm parentAttachmentInfos={values.attachmentInfos} parentSetAttachmentInfos={(infos) => setFieldValue('attachmentInfos', infos)} />

                                    {isRefund() && <RefundRecord fields={values} errors={errors} touched={touched} handleChange={handleChange} setFieldValue={setFieldValue} selectedType={selectedType} />}
                                    <div style={{ marginBottom: 16 }}>
                                        <div className='font-bold my-3 text-sm' >Checklist - Select all checkboxes</div>
                                        <div className='flex flex-col gap-2 text-sm'>
                                            {dynamicChecklist?.map((item, idx) => (
                                                <div key={idx}>
                                                    <Checkbox
                                                        inputId={`dynamicChecklist_${idx}`}
                                                        checked={checkedChecklist.includes(item)}
                                                        onChange={(e) => {
                                                            const checked = e.checked;
                                                            let newArr = [...checkedChecklist];
                                                            if (checked) {
                                                                newArr.push(item);
                                                            } else {
                                                                newArr = newArr.filter((i) => i !== item);
                                                            }
                                                            setCheckedChecklist(newArr);
                                                        }}
                                                    />
                                                    <label htmlFor={`dynamicChecklist_${idx}`} className='ml-2'>
                                                        {item}
                                                    </label>
                                                </div>
                                            ))}
                                            {checklistError && <div className='mt-2 color-red '>{checklistError}</div>}
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        label={isSubmitting ? 'Saving...' : complaintCaptureType === ComplaintCaptureMode.UPDATE ? 'Update' : 'Create'}
                                        disabled={
                                            isSubmitting ||
                                            (values.isBulkComplaintOn &&
                                                (!values.bulkComplaintValidateResponse?.data?.length ||
                                                    !values.bulkComplaintValidateResponse.data.every((row: any) => row.statusValidation === 'PASS' && row.productValidation === 'PASS' && row.segmentValidation === 'PASS')))
                                        }
                                    />
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}

export default Complaints;
