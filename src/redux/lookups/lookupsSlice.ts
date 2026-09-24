import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { proxyURL } from '../../utils/lib/proxyAPI';
import { NO_FILTER } from '../../app/const';


interface Lookup {
    label: string;
    value: string;
}

interface State {
    lookups?: {
        lookups?: {
            UCAAS_USER_LINES_STATUS_FILTER?: Lookup[];
            LINKED_ACCOUNT_BULK_ACTIONS?: Lookup[];
        };
    };
}

const initialState = {
    lookups: {}
};

export const fetchLookups = createAsyncThunk('lookups/fetchLookups', async () => {
    const result = await fetch(`${proxyURL}/lookups`);
    if (!result.ok) {
        throw new Error('Faile to fetch lookups');
    }
    const data = await result.json();
    return data;
});

const settingSlice = createSlice({
    name: 'lookups',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchLookups.fulfilled, (state, action) => {
            state.lookups = action.payload;
        });
    }
});

export const selectUcaasFilters = (state: State): Lookup[] => [{ label: '--No Filter--', value: NO_FILTER }, ...(state.lookups?.lookups?.UCAAS_USER_LINES_STATUS_FILTER || [])];
export const selectBulkActions = (state: State): Lookup[] => (state.lookups?.lookups?.LINKED_ACCOUNT_BULK_ACTIONS || []);

export default settingSlice.reducer;
