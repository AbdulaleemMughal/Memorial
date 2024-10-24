import { createSlice } from "@reduxjs/toolkit";

const fontSlice = createSlice({
  name: "font",
  initialState: {
    isFont: localStorage.getItem("font")
      ? JSON.parse(localStorage.getItem("font") as string)
      : "",
  },
  reducers: {
    addFont: (state, action) => {
      state.isFont = action.payload;
      const newFont = JSON.stringify(state.isFont);
      localStorage.setItem("font", newFont);
    },
  },
});

export const { addFont } = fontSlice.actions;

export default fontSlice.reducer;
