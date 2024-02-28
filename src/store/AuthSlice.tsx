import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiCall } from '../Services/Api';

export interface Login {
    email: string;
    password: string;
}

export const loginApi = createAsyncThunk<any, any>('auth/loginApi', async (data) => {
    try {
        const result = await ApiCall('post', '/api/user/user-login', data);
        return result;
    } catch (error) {
        console.error('Error in loginApi:', error);
        throw error; // Rethrow the error to be handled by the rejection of the promise
    }
});

const initialState = {
    loading: false,
    token: '',
    error: '',
    message: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginApi.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(loginApi.fulfilled, (state, action) => {
                state.token = action.payload?.data?.access_token;
                console.log('login fulfilled');
            })
            .addCase(loginApi.rejected, (state, action) => {
                console.log('login failed');
            });
    },
});
export default authSlice.reducer;
