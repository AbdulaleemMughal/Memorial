import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    isFavouriteSwitch: localStorage.getItem("favourite-switch")
      ? JSON.parse(localStorage.getItem("favourite-switch") as string)
      : false,
  },
  reducers: {
    addSwitch: (state) => {
      state.isFavouriteSwitch = !state.isFavouriteSwitch;
      const newSwitch = JSON.stringify(state.isFavouriteSwitch);
      localStorage.setItem("favourite-switch", newSwitch);
    },
  },
});

export const { addSwitch } = favouriteSlice.actions;

export default favouriteSlice.reducer;
