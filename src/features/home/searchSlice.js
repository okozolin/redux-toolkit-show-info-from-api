import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  value: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchCleared: (state, action) => {
      state.value = "";
    },
    searchUpdated: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const searchSelector = (state) => state.search;
export const { searchCleared, searchUpdated } = searchSlice.actions;
export default searchSlice.reducer;
