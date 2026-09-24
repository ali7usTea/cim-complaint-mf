import { configureStore } from '@reduxjs/toolkit';
import customerReducer, { addCustomers } from '../../src/redux/customer/customerSlice';

describe('customerSlice', () => {
    let store: any;

    beforeEach(() => {
        store = configureStore({ reducer: { customerslice: customerReducer } });
    });

    it('has correct initial state', () => {
        const state = store.getState().customerslice;
        expect(state.Customers).toEqual({});
    });

    describe('addCustomers', () => {
        it('adds a customer to the state', () => {
            const customer = {
                accountNumber: '12345',
                accountID: 'ACC001',
                partyID: 'P001',
                productCode: 'MOB',
                productDescription: 'Mobile Service',
                productGroup: 'Mobile',
                productGroupCode: 'MG',
                productGroupCodeDesc: 'Mobile Group',
                customerSegment: 'Retail',
                customerSegmentGroup: 'Consumer',
                customerCategory: 'Individual',
                productType: 'Postpaid',
                regionCode: 'DXB',
                profileID: 'PR001',
                isMaxSuffix: 'N',
                customerID: 'C001',
                isLandLine: 'N',
                isMobile: 'Y',
                customerName: 'John Doe',
                partyProfileId: 'PP001',
                accountStatus: 'Active',
                valueSegment: 'Gold',
                preferredLanguage: 'EN',
                productDesc: 'Mobile Postpaid',
                businessSegmentValue: 'B2C',
                contactSearchId: 'CS001',
                domainName: '',
                userName: '',
                subRequestProductCode: '',
                subRequestProductGroupDesc: '',
                subRequestTypeCode: '',
                subRequestProductGroupCode: '',
                subRequestProductGroup: '',
                noOfRecords: '',
                lookupName: '',
                userId: '',
                debugReport: '',
                contactNumber: '0501234567',
                customerEmail: '',
                customerEmiratesId: '',
                serialNumber: '',
                overrideFlag: '',
                activityId: '',
                activityDuration: '',
                isBitstream: '',
                subRequestId: '',
                sourceChannelId: '',
                subRequest: '',
                complaintUpdateType: '',
                complaintCaptureType: '',
                complaintId: '',
                SRVC_CODE: '',
                FALCON_MIGRATION_STATUS: '',
                RETAILER_PARTY_PROFILE_ID: '',
                ACCOUNT_NUMBER: '',
                NUMBER_TYPE: '',
                ENTITY_DESC: '',
                STATUS: '',
                RETAILER_NAME: '',
                RESERVED_BY: '',
                SUBREQUEST_ID: '',
                ACCOUNT_SUFFIX: '',
                consumerValueSegment: '',
                customerSegmentDesc: '',
                businessValueSegment: '',
                createdUserId: '',
                NOTES: '',
                SUBREQUEST_ACCOUNTID: '',
                EBILL_CONTACT: '',
                subRequestComplaint_SUBREQUEST_ID: '',
                subRequestComplaint_PARTY_ID: '',
                subRequestComplaint_PRODUCT_CODE: '',
                subRequestComplaint_PRODUCT_DESCRIPTION: '',
                subRequestComplaint_PRODUCT_GROUP_CODE: '',
                subRequestComplaint_PRODUCT_GROUP: '',
                subRequestComplaint_SERVICE_ID: '',
                subRequestComplaint_SERVICE_DESCRIPTION: '',
                subRequestComplaint_PARTY_NAME: '',
                subRequestComplaint_ACCOUNT_CATEGORY: '',
                subRequestComplaint_ACCOUNT_ID: '',
                subRequestComplaint_ACCOUNT_NUMBER: '',
                subRequestComplaint_SUB_REQUEST_CREATION_DATE: '',
                subRequestComplaint_SUB_REQUEST_STATUS: '',
                subRequestComplaint_SUB_REQUEST_TYPE: '',
                subRequestComplaint_SERVICE_REQUIRED_DATE: '',
                subRequestComplaint_REGION_CODE: '',
                categoryCode: '',
                agentName: '',
                agentLocation: '',
                ProductFamily: ''
            };

            store.dispatch(addCustomers({ key: 'ACC001', Customer: customer }));
            const state = store.getState().customerslice;
            expect(state.Customers['ACC001']).toEqual(customer);
        });

        it('can add multiple customers', () => {
            const customer1 = { accountID: 'ACC001' } as any;
            const customer2 = { accountID: 'ACC002' } as any;

            store.dispatch(addCustomers({ key: 'ACC001', Customer: customer1 }));
            store.dispatch(addCustomers({ key: 'ACC002', Customer: customer2 }));

            const state = store.getState().customerslice;
            expect(Object.keys(state.Customers).length).toBe(2);
        });

        it('overwrites existing customer with same key', () => {
            const customer1 = { accountID: 'ACC001', customerName: 'First' } as any;
            const customer2 = { accountID: 'ACC001', customerName: 'Second' } as any;

            store.dispatch(addCustomers({ key: 'ACC001', Customer: customer1 }));
            store.dispatch(addCustomers({ key: 'ACC001', Customer: customer2 }));

            const state = store.getState().customerslice;
            expect(state.Customers['ACC001'].customerName).toBe('Second');
        });
    });
});
