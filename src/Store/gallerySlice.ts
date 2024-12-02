import { createSlice } from "@reduxjs/toolkit";

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    isGallerySwitch: localStorage.getItem("gallery-switch")
      ? JSON.parse(localStorage.getItem("gallery-switch") as string)
      : false,
  },
  reducers: {
    addSwitch: (state) => {
      state.isGallerySwitch = !state.isGallerySwitch;
      const newSwitch = JSON.stringify(state.isGallerySwitch);
      localStorage.setItem("gallery-switch", newSwitch);
    },
  },
});

export const { addSwitch } = gallerySlice.actions;

export default gallerySlice.reducer;
