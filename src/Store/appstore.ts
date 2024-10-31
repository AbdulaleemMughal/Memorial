import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "./ColorSlice";
import fontReducer from './FontSlice';
import backgroundReducer from './BackgroundSlice';
import textReducer from './TextSlice';
import timelineReducer from './TimelineSlice';

export const appStore = configureStore({
    reducer: {
        color: colorReducer,
        font: fontReducer,
        background: backgroundReducer,
        text: textReducer,
        timeline: timelineReducer,
    }
});

export type RootState = ReturnType<typeof appStore.getState>;