import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from "../types"
import { jwtDecode } from 'jwt-decode';


const initialState: AuthState = {
    state: "unauthenticated",
    isAuthenticated: false,
    user: null,
    jwtToken: null,
    refreshToken: null,
    decodedJwtToken: {},
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setState(state, action) {
            state.state = action.payload
            if (action.payload === 'authenticated')
                state.isAuthenticated = true
            else
                state.isAuthenticated = false
        },
        setJwtToken(state, action) {
            state.jwtToken = action.payload
            state.decodedJwtToken = jwtDecode(action.payload, { header: false })
        },
        loginSuccess(state, action: PayloadAction<{ user: User; jwtToken: string; refreshToken: string }>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.jwtToken = action.payload.jwtToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.jwtToken = null;
            state.refreshToken = null;
        },
    },
    extraReducers(builder) {
    }
});

export const { loginSuccess, logout, setState, setJwtToken } = authSlice.actions;
export default authSlice.reducer;
