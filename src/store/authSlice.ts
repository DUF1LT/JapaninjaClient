import { createSlice } from '@reduxjs/toolkit';
import { AuthData } from '../models/response/AuthData';

const authDataFallback: Partial<AuthData> = {
    id: undefined,
    token: undefined,
    tokenExpirationTime: undefined,
    role: undefined,
};

const initializeAuthData = (): AuthData | Partial<AuthData> => {
    const token = localStorage.getItem('token');
    const authDataString = localStorage.getItem('authData');

    if (token != null) {
        const authData = JSON.parse(authDataString!) as AuthData;
        const tokenExpirationTime = new Date(authData.tokenExpirationTime!);

        if (tokenExpirationTime < new Date()) {
            localStorage.removeItem('token');
            localStorage.removeItem('authData');

            return authDataFallback;
        }

        return authData;
    }

    return authDataFallback;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initializeAuthData(),
        isLoggedIn: localStorage.getItem('authData') ? true : false,
    },
    reducers: {
        login(state, action) {
            state.authData = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('authData', JSON.stringify(action.payload));
        },
        register(state, action) {
            state.authData = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('authData', JSON.stringify(action.payload));
        },
        logout(state) {
            state.authData = authDataFallback;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
            localStorage.removeItem('authData');
        },
    }
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;