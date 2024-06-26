import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiCall } from "../Services/Api";
import { getProfileUrl } from "../utils/EndPoints";


interface UserState {
    loading: boolean;
    user: any; 
    error: any ; 
}

export const userProfileApi = createAsyncThunk<any>('user/Profile', async () => {
    try {
        const response = await ApiCall('get', getProfileUrl);        
        return response;
    } catch (error) {
        console.log('error in profileApi', error);
        throw error;
    }
});

const initialState: UserState = {
    loading: false,
    user: {},
    error: null,
};
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(userProfileApi.pending,(state)=>{
            state.loading = true;
        
        }).addCase(userProfileApi.fulfilled,(state,action)=>{
            state.user = action.payload.data;
            sessionStorage.setItem('status', action?.payload?.data?.userStatus);
            // sessionStorage.setItem('packageType', action?.payload?.data?.packageType);
            sessionStorage.setItem('franchise', action?.payload?.data?.franchise);
            state.loading = false;
        }).addCase(userProfileApi.rejected,(state,action)=>{
            state.error = action.error;
            state.loading=false
        })
    }
})
export default userSlice.reducer;