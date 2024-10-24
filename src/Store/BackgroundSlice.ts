import { createSlice } from "@reduxjs/toolkit";

const backgroundSlice = createSlice({
  name: "background",
  initialState: {
    isBackground: localStorage.getItem("background")
      ? JSON.parse(localStorage.getItem("background") as string)
      : "",
  },
  reducers: {
    addBackground: (state, action) => {
      state.isBackground = action.payload;
      const newFont = JSON.stringify(state.isBackground);
      localStorage.setItem("background", newFont);
    },
  },
});

export const { addBackground } = backgroundSlice.actions;
export default backgroundSlice.reducer;
