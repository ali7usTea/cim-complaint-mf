'use client';

import { jwtDecode, JwtPayload } from 'jwt-decode';
import React, { Fragment, lazy, Suspense, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { AppDispatch } from '../../redux/store';
import { isEqual } from '../../utils/helpers';
import { tokenValidate } from '../../utils/tokenValidator';
import { addCustomers } from '../../redux/customer/customerSlice';
import { fetchAllGroupPermssion, fetchApiGroupPermssion } from '../../redux/groupPermission/groupPermssionSlice';
import { fetchLookups } from '../../redux/lookups/lookupsSlice';
import { fetchApiSettings } from '../../redux/settings/settingSlice';
import { fetchAllTabPermssion, fetchApiTabPermssion } from '../../redux/tabPermission/tabPermssionSlice';
import { fetchComplaintPermissions } from '../../redux/complaintPermission/complaintPermissionSlice';
import Footer from './Footer';

// @ts-ignore
const createMemoizedComponent = (importFunc: () => Promise<{ default: React.ComponentType<any> }>) => {
    const LazyComponent = lazy(importFunc);
    const MemoizedComponent = React.memo(
        (props: any) => (
            <Suspense fallback={<div>Loading...</div>}>
                <LazyComponent {...props} />
            </Suspense>
        ),
        (prevProps: any, nextProps: any) => isEqual(prevProps.value, nextProps.value)
    );
    return MemoizedComponent;
};

const Complaints = createMemoizedComponent(() => import('../components/Complaints'));

const ComplaintTab = () => {
    const dispatch: AppDispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { jwtToken } = useContext(LayoutContext);

    useEffect(() => {
        const actid = searchParams.get('accountId')! || searchParams.get('accountID')! || searchParams.get('accountid')! || searchParams.get("ACCOUNT_ID")!;
        const complaintUpdateTypeVariable = searchParams.get('complaintUpdateType')! || searchParams.get('complaintupdatetype')!;
        const complaintCaptureTypeVariable = searchParams.get('complaintCaptureMode')! || searchParams.get('complaintcapturemode')!;
        dispatch(
            addCustomers({
                key: actid,
                Customer: {
                    accountID: actid,
                    accountNumber: searchParams.get('accountNumber')! || searchParams.get('accountnumber')! || searchParams.get('ACCOUNT_NUMBER')!,
                    partyID: searchParams.get('partyId')! || searchParams.get('partyID')! || searchParams.get('partyid')!,
                    productCode: searchParams.get('productCode')! || searchParams.get('productcode')! || searchParams.get('PRODUCT_CODE')! || searchParams.get('PRODUCT_ID')!,
                    productDescription: searchParams.get('productDescription')! || searchParams.get('productdescription')! || searchParams.get('productDesc')! || searchParams.get('productdesc')!,
                    productGroupCode: searchParams.get('productGroupCode')! || searchParams.get('productgroupcode')! || searchParams.get('productGrpCode')! || searchParams.get('productgrpcode')!,
                    productGroupCodeDesc: searchParams.get('productGroupCodeDesc')! || searchParams.get('productgroupcodedesc')! || searchParams.get('productGrpDesc')! || searchParams.get('productgrpdesc')!,
                    productGroup: searchParams.get('productGroup')! || searchParams.get('productgroup')!,
                    customerSegment: searchParams.get('customerSegment')! || searchParams.get('customersegment')!,
                    customerSegmentDesc: searchParams.get('customerSegmentDesc')! || searchParams.get('customersegmentdesc')!,
                    customerSegmentGroup: searchParams.get('customerSegmentGroup')! || searchParams.get('customersegmentgroup')!,
                    customerCategory: searchParams.get('customerCategory')! || searchParams.get('customercategory')!,
                    productType: searchParams.get('productType')! || searchParams.get('producttype')!,
                    regionCode: searchParams.get('regionCode')! || searchParams.get('regioncode')!,
                    profileID: searchParams.get('profileID')! || searchParams.get('profileId')! || searchParams.get('profileid')!,
                    isMaxSuffix: searchParams.get('isMaxSuffix')!,
                    customerID: searchParams.get('customerID')! || searchParams.get('customerId')! || searchParams.get('customerid')!,
                    isLandLine: searchParams.get('isLandLine')! || searchParams.get('islandline')!,
                    isMobile: searchParams.get('isMobile')! || searchParams.get('ismobile')!,
                    customerName: searchParams.get('customerName')! || searchParams.get('customername')!,
                    partyProfileId: searchParams.get('partyProfileId')! || searchParams.get('partyprofileid')! || searchParams.get('partyProfileID')!,
                    accountStatus: searchParams.get('accountStatus')! || searchParams.get('accountstatus')!,
                    valueSegment: searchParams.get('valueSegment')!,
                    consumerValueSegment: searchParams.get('consumerValueSegment')!,
                    businessValueSegment: searchParams.get('businessValueSegment')!,
                    createdUserId: searchParams.get('createdUserId')!,
                    preferredLanguage: searchParams.get('preferredLanguage')!,
                    productDesc: searchParams.get('productDesc')!,
                    businessSegmentValue: searchParams.get('businessSegmentValue')!,
                    contactSearchId: searchParams.get('contactSearchId')!,
                    domainName: searchParams.get('domainName')!,
                    userName: searchParams.get('userName')! || searchParams.get('username')!,
                    agentName: searchParams.get('agentName')! || searchParams.get('agentName')!,
                    agentLocation: searchParams.get('agentLocation')! || searchParams.get('agentLocation')!,
                    subRequestProductCode: searchParams.get('subRequestProductCode')!,
                    subRequestProductGroupDesc: searchParams.get('subRequestProductGroupDesc')!,
                    subRequestProductGroup: searchParams.get('subRequestProductGroup') || '',
                    subRequestTypeCode: searchParams.get('subRequestTypeCode')!,
                    subRequestProductGroupCode: searchParams.get('subRequestProductGroupCode')!,
                    noOfRecords: searchParams.get('noOfRecords')!,
                    EID: searchParams.get('EID')! || searchParams.get('eid')!,
                    'PVP FRP ID': searchParams.get('PVP FRP ID')!,
                    ProductFamily: searchParams.get('PRODUCT_FAMILY')!,
                    customerEmail: searchParams.get('customerEmail')!,
                    customerEmiratesId: searchParams.get('customerEmiratesId')!,
                    contactNumber: searchParams.get('contactNumber')!,
                    serialNumber: searchParams.get('serialNumber')!,
                    overrideFlag: searchParams.get('overrideFlag')!,
                    activityDuration: searchParams.get('activityDuration')!,
                    activityId: searchParams.get('activityId')! || searchParams.get('activityID')!,
                    subRequestNo: searchParams.get('subRequestNo')! || searchParams.get('subRequestno')!,
                    isBitstream: searchParams.get('isBitstream')! || searchParams.get('isbitstream')!,
                    subRequestId: searchParams.get('subRequestId')! || searchParams.get('subRequestID')!,
                    sourceChannelId: searchParams.get('sourceChannelID')! || searchParams.get('sourceChannelId')! || searchParams.get('sourcechannelid')!,
                    subRequest: searchParams.get('subrequest')! || searchParams.get('subRequest')!,
                    complaintUpdateType: searchParams.get('complaintUpdateType')! || searchParams.get('complaintupdatetype')!,
                    complaintCaptureType: searchParams.get('complaintCaptureMode')! || searchParams.get('complaintcapturemode')!,
                    complaintId: searchParams.get('complaintId')! || searchParams.get('complaintID')! || searchParams.get('complaintid')!,
                    // Third-party >> No-Management
                    SRVC_CODE: searchParams.get('SRVC_CODE')!,
                    FALCON_MIGRATION_STATUS: searchParams.get('FALCON_MIGRATION_STATUS')!,
                    RETAILER_PARTY_PROFILE_ID: searchParams.get('RETAILER_PARTY_PROFILE_ID')!,
                    ACCOUNT_NUMBER: searchParams.get('ACCOUNT_NUMBER')!,
                    NUMBER_TYPE: searchParams.get('NUMBER_TYPE')!,
                    ENTITY_DESC: searchParams.get('ENTITY_DESC')!,
                    STATUS: searchParams.get('STATUS')!,
                    RETAILER_NAME: searchParams.get('RETAILER_NAME')!,
                    RESERVED_BY: searchParams.get('RESERVED_BY')!,
                    SUBREQUEST_ID: searchParams.get('SUBREQUEST_ID')!,
                    ACCOUNT_SUFFIX: searchParams.get('ACCOUNT_SUFFIX')!,
                    NOTES: searchParams.get('NOTES')!,
                    SUBREQUEST_ACCOUNTID: searchParams.get('ACCOUNT_ID')!,
                    EBILL_CONTACT: searchParams.get('EBILL_CONTACT')!,
                    // Subrequest Complaint fields
                    subRequestComplaint_SUBREQUEST_ID: searchParams.get('SUBREQUEST_ID')!,
                    subRequestComplaint_PARTY_ID: searchParams.get('PARTY_ID')!,
                    subRequestComplaint_PRODUCT_CODE: searchParams.get('PRODUCT_CODE')!,
                    subRequestComplaint_PRODUCT_DESCRIPTION: searchParams.get('PRODUCT_DESCRIPTION')!,
                    subRequestComplaint_PRODUCT_GROUP_CODE: searchParams.get('PRODUCT_GROUP_CODE')!,
                    subRequestComplaint_PRODUCT_GROUP: searchParams.get('PRODUCT_GROUP')!,
                    subRequestComplaint_SERVICE_ID: searchParams.get('SERVICE_ID')!,
                    subRequestComplaint_SERVICE_DESCRIPTION: searchParams.get('SERVICE_DESCRIPTION')!,
                    subRequestComplaint_PARTY_NAME: searchParams.get('PARTY_NAME')!,
                    subRequestComplaint_ACCOUNT_CATEGORY: searchParams.get('ACCOUNT_CATEGORY')!,
                    subRequestComplaint_ACCOUNT_ID: searchParams.get('ACCOUNT_ID')!,
                    subRequestComplaint_ACCOUNT_NUMBER: searchParams.get('ACCOUNT_NUMBER')!,
                    subRequestComplaint_SUB_REQUEST_CREATION_DATE: searchParams.get('SUB_REQUEST_CREATION_DATE')!,
                    subRequestComplaint_SUB_REQUEST_STATUS: searchParams.get('SUB_REQUEST_STATUS')!,
                    subRequestComplaint_SUB_REQUEST_TYPE: searchParams.get('SUB_REQUEST_TYPE')!,
                    subRequestComplaint_SERVICE_REQUIRED_DATE: searchParams.get('SERVICE_REQUIRED_DATE')!,
                    subRequestComplaint_REGION_CODE: searchParams.get('REGION_CODE')!,
                    categoryCode: searchParams.get('categoryCode')!,
                    debugReport: searchParams.get('debugReport')! || searchParams.get('debugreport')! ||
                                 searchParams.get('isDebugMode')! || searchParams.get('isdebugmode')!
                }
            })
        );
    }, [dispatch, searchParams]);

    useEffect(() => {
        if (jwtToken) {
            const valid = tokenValidate(jwtToken);
            if (valid) {
                const decoded = jwtDecode<JwtPayload>(jwtToken);
                const ntLogin = decoded.sub as string;
                dispatch(fetchApiTabPermssion({ jwtToken, ntLogin }));
                dispatch(fetchAllTabPermssion({ jwtToken, ntLogin }));
                dispatch(fetchApiGroupPermssion({ jwtToken, ntLogin }));
                dispatch(fetchAllGroupPermssion({ jwtToken, ntLogin }));
                dispatch(fetchComplaintPermissions({ jwtToken, ntLogin }));
            }
        }
        dispatch(fetchApiSettings());
        dispatch(fetchLookups());
    }, [dispatch, jwtToken]);

    return (
        <Fragment>
            <div className="card">
                <Complaints />
            </div>
            <Footer />
        </Fragment>
    );
};

export default ComplaintTab;
