import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authSlice from './auth/authSlice';
import settingSlice from './settings/settingSlice';
import agentSlice from './TabsData/SMSShortCodeDetailsTabSlice';
import SMSShortCodeDetailsTab from './TabsData/SMSShortCodeDetailsTabSlice';
import customerslice from './customer/customerSlice';
import TabPermisionslice from './tabPermission/tabPermssionSlice';
import GroupPermisionslice from './groupPermission/groupPermssionSlice';
import ActionReportTabSlice from './TabsData/ActionReportTabSlice';
import lookups from './lookups/lookupsSlice';
import complaintPermissionSlice from './complaintPermission/complaintPermissionSlice';

import notifications from './notifications';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        settingSlice,
        agentSlice,
        SMSShortCodeDetailsTab,
        customerslice,
        TabPermisionslice,
        GroupPermisionslice,
        ActionReportTabSlice,
        notifications,
        lookups,
        complaintPermissionSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const UseAppDispatch: () => AppDispatch = useDispatch;
