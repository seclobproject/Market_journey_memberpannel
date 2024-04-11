import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import AuthSlice from './AuthSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import UserSlice from './UserSlice';
import LocationSlice from './LocationSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    auth:AuthSlice,
    user:UserSlice,
    location:LocationSlice
});

const store = configureStore({
    reducer: rootReducer,
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export type IRootState = ReturnType<typeof rootReducer>;

export default store;