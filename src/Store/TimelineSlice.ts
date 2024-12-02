import { createSlice } from "@reduxjs/toolkit";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    isSwitch: localStorage.getItem("timeline-switch")
      ? JSON.parse(localStorage.getItem("timeline-switch") as string)
      : false,
  },
  reducers: {
    addTimelineSwitch: (state) => {
      state.isSwitch = !state.isSwitch;
      localStorage.setItem("timeline-switch", JSON.stringify(state.isSwitch));
    },
  },
});

export const {
  addTimelineSwitch,
} = timelineSlice.actions;
export default timelineSlice.reducer;
