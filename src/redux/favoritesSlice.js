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
      console.log("action in favoritesSlice--->", action, state);
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
} = favoritesAdapter.getSelectors((state) => state.favorites);

export default favoritesSlice.reducer;

// export const { setFavorites, toggleFavorites } = favoritesSlice.actions;

// export const favoritesSelector = (state) => state.favorites;

// export default favoritesSlice.reducer;

// export const addToFavorites = (event) => async (dispatch, getState) => {
//   dispatch(
//     toggleFavorites({
//       type: ADD_TO_FAVORITES,
//       payload: event,
//     })
//   );
//   localStorage.setItem("favorites", JSON.stringify(getState().favorites));
// };

// export const removeFromFavorites = (event) => (dispatch, getState) => {
//   dispatch(
//     toggleFavorites({
//       type: REMOVE_FROM_FAVORITES,
//       payload: event,
//     })
//   );

//   localStorage.setItem("favorites", JSON.stringify(getState().favorites));
// };
