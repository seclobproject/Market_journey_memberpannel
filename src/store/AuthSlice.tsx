import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiCall } from '../Services/Api';

export const loginApi = createAsyncThunk<any, any>('auth/loginApi', async (data) => {
    try {
        const result = await ApiCall('post', '/api/user/user-login', data);
        console.log(result);
        
        return result;
    } catch (error: any) {
        console.error('Error in loginApi:', error);
        return error?.response?.data?.message;
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
                sessionStorage.setItem('packageType', action?.payload?.data?.packageType);                
                console.log('login fulfilled');
            })
            .addCase(loginApi.rejected, (state, action) => {
                console.log('login failed');
            });
    },
});
export default authSlice.reducer;
