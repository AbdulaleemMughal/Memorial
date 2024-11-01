import { createSlice } from "@reduxjs/toolkit";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    isTimelineInput: localStorage.getItem("timeline-input")
      ? JSON.parse(localStorage.getItem("timeline-input") as string)
      : "",
    isSwitch: localStorage.getItem("timeline-year")
    ? JSON.parse(localStorage.getItem("timeline-year") as string)
    : false,
    isYear: localStorage.getItem("timeline-year")
      ? JSON.parse(localStorage.getItem("timeline-year") as string)
      : "",
    isMonth: localStorage.getItem("timeline-month")
      ? JSON.parse(localStorage.getItem("timeline-month") as string)
      : "",
    isDay: localStorage.getItem("timeline-day")
      ? JSON.parse(localStorage.getItem("timeline-day") as string)
      : "",
    isTitle: localStorage.getItem("timeline-title")
    ? JSON.parse(localStorage.getItem("timeline-title") as string)
    : null,
    isLocation: localStorage.getItem("timeline-location")
    ? JSON.parse(localStorage.getItem("timeline-location") as string)
    : "",
  },
  reducers: {
    addTimeline: (state, action) => {
      state.isTimelineInput = action.payload;
      const newTimelineInput = JSON.stringify(state.isTimelineInput);
      localStorage.setItem("timeline-input", newTimelineInput);
    },
    addTimelineSwitch: (state) => {
      state.isSwitch = !state.isSwitch;
      const newTimelineSwitch = JSON.stringify(state.isSwitch);
      localStorage.setItem("timeline-switch", newTimelineSwitch);
    },
    addYear: (state, action) => {
      state.isYear = action.payload;
      const newTimelineYear = JSON.stringify(state.isYear);
      localStorage.setItem("timeline-year", newTimelineYear);
    },
    addMonth: (state, action) => {
      state.isMonth = action.payload;
      const newTimelineMonth = JSON.stringify(state.isMonth);
      localStorage.setItem("timeline-month", newTimelineMonth);
    },
    addDay: (state, action) => {
      state.isDay = action.payload;
      const newTimelineDay = JSON.stringify(state.isDay);
      localStorage.setItem("timeline-day", newTimelineDay);
    },
    addTilte: (state, action) => {
      state.isTitle = action.payload;
      const newTimelineTitle = JSON.stringify(state.isTitle);
      localStorage.setItem("timeline-title", newTimelineTitle);
    },
    addLocation: (state, action) => {
      state.isLocation = action.payload;
      const newTimelineLocation = JSON.stringify(state.isLocation);
      localStorage.setItem("timeline-location", newTimelineLocation);
    },
  },
});

export const { addTimeline, addTimelineSwitch, addDay, addMonth, addYear, addTilte, addLocation } = timelineSlice.actions;
export default timelineSlice.reducer;
