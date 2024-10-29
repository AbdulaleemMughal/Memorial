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
      const newBackground = JSON.stringify(state.isBackground);
      localStorage.setItem("background", newBackground);
    },
  },
});

export const { addBackground } = backgroundSlice.actions;
export default backgroundSlice.reducer;
