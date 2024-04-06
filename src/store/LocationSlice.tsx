import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiCall } from '../Services/Api';
import { statelistPageUrl } from '../utils/EndPoints';

interface LocationsState {
    loading: boolean;
    stateList: any;
    districtList: any;
    zonalList: any;
    panchayathList: any;
    error: any;
}

export const getStatesApi = createAsyncThunk<any>('location/states', async () => {
    try {
        const response = await ApiCall('get', statelistPageUrl);
        return response;
    } catch (error) {
        console.log('error in statesApi', error);
        throw error;
    }
});

const initialState: LocationsState = {
    loading: false,
    stateList: [],
    districtList: [],
    zonalList: [],
    panchayathList: [],
    error: null,
};
const locationSlice = createSlice({
    name: 'states',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStatesApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStatesApi.fulfilled, (state, action) => {
                state.stateList = action.payload.data?.states;
                state.loading = false;
            })
            .addCase(getStatesApi.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            });
    },
});
export default locationSlice.reducer;
