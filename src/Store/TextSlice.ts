import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
    name: "text",
    initialState: {
        isText: localStorage.getItem("text")
        ? JSON.parse(localStorage.getItem("text") as string)
        : "",
    },
    reducers: {
      addText: (state, action) => {
        state.isText = action.payload;
        const newText = JSON.stringify(state.isText);
        localStorage.setItem("text", newText);
      },
    },
  });

  export const { addText } = textSlice.actions;
  export default textSlice.reducer;