import { createSlice } from "@reduxjs/toolkit";

const memoriesSlice = createSlice({
  name: "memories",
  initialState: {
    isMemoriesSwitch: localStorage.getItem("memories-switch")
      ? JSON.parse(localStorage.getItem("memories-switch") as string)
      : false,

      isMemoriesImages: localStorage.getItem("memories-images")
      ? JSON.parse(localStorage.getItem("memories-images") as string)
      : [],
  },
  reducers: {
    addSwitch: (state) => {
      state.isMemoriesSwitch = !state.isMemoriesSwitch;
      const newSwitch = JSON.stringify(state.isMemoriesSwitch);
      localStorage.setItem("memories-switch", newSwitch);
    },

    addMemoryImages: (state, action) => {
      state.isMemoriesImages = action.payload;
      const newImages = JSON.stringify(state.isMemoriesImages);
      localStorage.setItem("memories-images", newImages);
    }
  },
});

export const { addSwitch, addMemoryImages } = memoriesSlice.actions;

export default memoriesSlice.reducer;
