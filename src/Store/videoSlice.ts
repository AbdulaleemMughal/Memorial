import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    isVideoSwitch: localStorage.getItem("video-switch")
      ? JSON.parse(localStorage.getItem("video-switch") as string)
      : false,
  },
  reducers: {
    addSwitch: (state) => {
      state.isVideoSwitch = !state.isVideoSwitch;
      const newSwitch = JSON.stringify(state.isVideoSwitch);
      localStorage.setItem("video-switch", newSwitch);
    },
  },
});

export const { addSwitch } = videoSlice.actions;

export default videoSlice.reducer;
