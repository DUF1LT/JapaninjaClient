import { createSlice } from '@reduxjs/toolkit';
import { AuthData } from '../models/response/AuthResponse';

const authDataFallback: AuthData = {
    id: undefined,
    accessToken: undefined,
    tokenExpirationTime: undefined,
    role: undefined,
};

const initializeAuthData = (): AuthData => {
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
        isLogedIn: localStorage.getItem('authData') ? true : false,
    },
    reducers: {
        login(state, action) {
            state.authData = action.payload;
            state.isLogedIn = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('authData', JSON.stringify(action.payload));
        },
        register(state, action) {
            state.authData = action.payload;
            state.isLogedIn = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('authData', JSON.stringify(action.payload));
        },
        logout(state) {
            state.authData = authDataFallback;
            state.isLogedIn = false;
            localStorage.removeItem('token');
            localStorage.removeItem('authData');
        },
    }
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;