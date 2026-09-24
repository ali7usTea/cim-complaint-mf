import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { proxyURL } from "../../utils/lib/proxyAPI";

export interface Setting {
    CS_KEY: string
    CS_VALUE: any
    CS_CREATED_DATE: any
    CS_UPDATED_DATE: any
    CUSTOMER_SUMMARY_BCRM_SYS_URL: string
}
interface SettingState {
    settings: Setting | Record<string, any>;
}
const initialState: SettingState = {
    settings: {},
};

export const fetchApiSettings = createAsyncThunk("settings/fetchSettings", async () => {
    const result = await fetch(`${proxyURL}/settings`);
    if (!result.ok) {
        throw new Error("Faile to fetch settings ");
    }

    const data = await result.json();
    return data as unknown as Setting;
});


const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchApiSettings.fulfilled, (state, action) => {
            state.settings = action.payload;
        })
    },
})

export const { } = settingSlice.actions
export default settingSlice.reducer;