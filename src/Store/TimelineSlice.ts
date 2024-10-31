import { createSlice } from "@reduxjs/toolkit";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    isTimelineInput: localStorage.getItem("timeline-input")
      ? JSON.parse(localStorage.getItem("timeline-input") as string)
      : "",
      isSwitch: false,
  },
  reducers: {
    addTimeline: (state, action) => {
      state.isTimelineInput = action.payload;
      const newTimelineInput = JSON.stringify(state.isTimelineInput);
      localStorage.setItem("timeline-input", newTimelineInput);
    },
    addTimelineSwitch: (state, action) => {
        state.isSwitch = !(state.isSwitch);
    }
  },
});

export const { addTimeline, addTimelineSwitch } = timelineSlice.actions;
export default timelineSlice.reducer;
