import { createSlice } from "@reduxjs/toolkit";

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    isSwitch: localStorage.getItem("editor-switch")
      ? JSON.parse(localStorage.getItem("editor-switch") as string)
      : false,
  },
  reducers: {
    addSwitch: (state) => {
      state.isSwitch = !state.isSwitch;
      const newSwitch = JSON.stringify(state.isSwitch);
      localStorage.setItem("editor-switch", newSwitch);
    },
  },
});

export const { addSwitch } = editorSlice.actions;

export default editorSlice.reducer;
