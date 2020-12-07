import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

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
      localStorage.setItem("favorites", JSON.stringify(state.entities));
    },
    removeFromFavorites(state, action) {
      favoritesAdapter.removeOne(state, action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.entities));
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
  selectIds: selectFavoritesIds,
  selectTotal: selectTotalFavorites,
} = favoritesAdapter.getSelectors((state) => state.favorites);

export default favoritesSlice.reducer;
