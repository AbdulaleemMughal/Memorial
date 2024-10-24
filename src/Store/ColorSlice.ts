import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
    name: "color",
    initialState: {
        isColor: localStorage.getItem("color")
        ? JSON.parse(localStorage.getItem("color") as string)
        : "",
    },
    reducers: {
        addColor: (state, action) => {
            state.isColor = action.payload;
            const newColor = JSON.stringify(state.isColor);
            localStorage.setItem('color', newColor);
        },
    }
});

export const { addColor } = colorSlice.actions;

export default colorSlice.reducer;