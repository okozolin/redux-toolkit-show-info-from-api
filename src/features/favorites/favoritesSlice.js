import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { setFavorites } from "./favoritesService";

const favoritesAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    return b.datetime.localeCompare(a.datetime);
  },
});

const initialState = favoritesAdapter.getInitialState();

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      favoritesAdapter.addOne(state, action.payload);
      setFavorites(state.entities);
    },
    removeFromFavorites(state, action) {
      favoritesAdapter.removeOne(state, action.payload);
      setFavorites(state.entities);
    },
    updateFavorites: favoritesAdapter.upsertMany,
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  updateFavorites,
} = favoritesSlice.actions;

export const {
  selectAll: selectAllFavorites,
  selectById: selectFavoriteById,
  selectTotal: selectTotalFavorites,
} = favoritesAdapter.getSelectors((state) => state.favorites);

export default favoritesSlice.reducer;
