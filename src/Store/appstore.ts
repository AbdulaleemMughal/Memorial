import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "./ColorSlice";
import fontReducer from './FontSlice';
import backgroundReducer from './BackgroundSlice';
import textReducer from './TextSlice';
import timelineReducer from './TimelineSlice';
import editorReducer from './EditorSlice';
import favouriteReducer from './FavouriteSlice';
import memoriesReducer from './memoriesSlice';
import videoReducer from './videoSlice';
import galleryReducer from './gallerySlice'

export const appStore = configureStore({
    reducer: {
        color: colorReducer,
        font: fontReducer,
        background: backgroundReducer,
        text: textReducer,
        timeline: timelineReducer,
        editor: editorReducer,
        favourite: favouriteReducer,
        memories: memoriesReducer,
        video: videoReducer,
        gallery: galleryReducer,
        }
});

export type RootState = ReturnType<typeof appStore.getState>;