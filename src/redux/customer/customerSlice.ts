import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Inteface follow similar naming conventions to those used for classes
export interface Customer {
    [x: string]: any;
    accountNumber: string;
    accountID: string;
    partyID: string;
    productCode: string;
    productDescription: string;
    productGroup: string;
    productGroupCode: string;
    productGroupCodeDesc: string;
    customerSegment: string;
    customerSegmentDesc: string;
    customerSegmentGroup: string;
    customerCategory: string;
    productType: string;
    regionCode: string;
    profileID: string;
    isMaxSuffix: string;
    customerID: string;
    isLandLine: string;
    isMobile: string;
    customerName: string;
    partyProfileId: string;
    accountStatus: string;
    valueSegment: string;
    consumerValueSegment: string;
    businessValueSegment: string;
    createdUserId: string;
    preferredLanguage: string;
    productDesc: string;
    businessSegmentValue: string;
    contactSearchId: string;
    domainName: string;
    userName: string;
    agentName: string;
    agentLocation: string;
    subRequestProductCode: string;
    subRequestProductGroupDesc: string;
    subRequestTypeCode: string;
    subRequestProductGroupCode: string;
    subRequestProductGroup: string;
    ProductFamily: string;
    debugReport: string;
    customerEmail: string;
    customerEmiratesId: string;
    serialNumber?: string;
    noOfRecords: string;
    overrideFlag?: string;
    activityId?: string;
    activityDuration?: string;
    isBitstream: string;
    subRequestId: string;
    sourceChannelId: string;
    subRequest: string;
    complaintUpdateType: string;
    complaintCaptureType: string;
    complaintId: string;
    // Third-party >> No-Management
    SRVC_CODE: string;
    FALCON_MIGRATION_STATUS: string;
    RETAILER_PARTY_PROFILE_ID: string;
    ACCOUNT_NUMBER: string;
    NUMBER_TYPE: string;
    // EFFECTIVE_FROM_DATE: string;
    // EFFECTIVE_TILL_DATE: string;
    // RESERVED_TILL_DATE: string;
    ENTITY_DESC: string;
    STATUS: string;
    RETAILER_NAME: string;
    RESERVED_BY: string;
    SUBREQUEST_ID: string;
    ACCOUNT_SUFFIX: string;
    NOTES: string;
    SUBREQUEST_ACCOUNTID: string;
    EBILL_CONTACT: string;
    subRequestComplaint_SUBREQUEST_ID: string;
    subRequestComplaint_PARTY_ID: string;
    subRequestComplaint_PRODUCT_CODE: string;
    subRequestComplaint_PRODUCT_DESCRIPTION: string;
    subRequestComplaint_PRODUCT_GROUP_CODE: string;
    subRequestComplaint_PRODUCT_GROUP: string;
    subRequestComplaint_SERVICE_ID: string;
    subRequestComplaint_SERVICE_DESCRIPTION: string;
    subRequestComplaint_PARTY_NAME: string;
    subRequestComplaint_ACCOUNT_CATEGORY: string;
    subRequestComplaint_ACCOUNT_ID: string;
    subRequestComplaint_ACCOUNT_NUMBER: string;
    subRequestComplaint_SUB_REQUEST_CREATION_DATE: string;
    subRequestComplaint_SUB_REQUEST_STATUS: string;
    subRequestComplaint_SUB_REQUEST_TYPE: string;
    subRequestComplaint_SERVICE_REQUIRED_DATE: string;
    subRequestComplaint_REGION_CODE: string;
    categoryCode: string;
    contactNumber?: string;
}

interface CustomerState {
    Customers: { [key: string]: Customer };
}

const initialState: CustomerState = {
    Customers: {}
};

const Customerslice = createSlice({
    name: 'Customer',
    initialState,
    reducers: {
        addCustomers: (state, action: PayloadAction<{ key: string; Customer: Customer }>) => {
            const { key, Customer } = action.payload;
            state.Customers[key] = Customer;
        },
        updateCustomers: (state, action: PayloadAction<{ key: string; updatedCustomer: Customer }>) => {
            const { key, updatedCustomer } = action.payload;
            if (state.Customers[key]) {
                state.Customers[key] = { ...state.Customers[key], ...updatedCustomer };
            }
        },
        // Action to delete data
        deleteCustomers: (state, action: PayloadAction<string>) => {
            const keyTobeDelted = action.payload;
            delete state.Customers[keyTobeDelted];
        },
        getCustomer: (state, action: PayloadAction<{ key: string }>) => {
            const { key } = action.payload;
            const Customer = state.Customers[key];
            if (Customer) {
                console.log(Customer);
            } else {
                console.log(`Customer with key ${key} not found.`);
            }
        }
    },
    extraReducers(builder) {}
});

export const selectCustomer = (state: RootState) => state.customerslice;
export const { addCustomers, updateCustomers, deleteCustomers, getCustomer } = Customerslice.actions;
export default Customerslice.reducer;
