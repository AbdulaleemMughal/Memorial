import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "./ColorSlice";
import fontReducer from './FontSlice';
import backgroundReducer from './BackgroundSlice';

export const appStore = configureStore({
    reducer: {
        color: colorReducer,
        font: fontReducer,
        background: backgroundReducer,
    }
});

export type RootState = ReturnType<typeof appStore.getState>;