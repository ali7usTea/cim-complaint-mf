import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ComplaintPermission {
    name: string;
    advance?: string;
    description?: string;
}

interface ComplaintPermissionState {
    permissionMap: Record<string, ComplaintPermission>;
    roles: string[];
}

const initialState: ComplaintPermissionState = {
    permissionMap: {},
    roles: []
};

export const fetchComplaintPermissions = createAsyncThunk('ComplaintPermission/fetchComplaintPermissions', async ({ jwtToken, ntLogin }: { jwtToken: string; ntLogin: string }) => {
    try {
        console.log('VITE_PUBLIC_ALL_PERMISSIONS_URL');
        const url = `${import.meta.env.VITE_PUBLIC_ALL_PERMISSIONS_URL}`;
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                ntLogin: ntLogin,
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

        if (!result.ok) {
            throw new Error('Failed to fetch complaint permissions');
        }

        const data = await result.json();

        return {
            permissionMap: data.permissionDtoMap || {},
            roles: data.roles || []
        };
    } catch (error) {
        console.log('Error :: complaintPermissionSlice::fetchComplaintPermissions: ' + error);
        return { permissionMap: {}, roles: [] };
    }
});

const complaintPermissionSlice = createSlice({
    name: 'ComplaintPermission',
    initialState,
    reducers: {
        addComplaintPermission: (state, action: PayloadAction<ComplaintPermission>) => {
            const { name } = action.payload;
            state.permissionMap[name] = action.payload;
        },
        clearComplaintPermissions: (state) => {
            state.permissionMap = {};
            state.roles = [];
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchComplaintPermissions.fulfilled, (state, action) => {
            state.permissionMap = action.payload.permissionMap;
            state.roles = action.payload.roles;
        });
    }
});

export const { addComplaintPermission, clearComplaintPermissions } = complaintPermissionSlice.actions;
export default complaintPermissionSlice.reducer;
