import { createSlice } from "@reduxjs/toolkit";
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../constants/favoritesConstants";
export const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, { payload }) => {
      state.favorites = payload;
    },

    toggleFavorites: (state = { favorites: [] }, action) => {
      switch (action.payload.type) {
        case ADD_TO_FAVORITES:
          return {
            ...state,
            favorites: [...state.favorites, action.payload.payload],
          };
        case REMOVE_FROM_FAVORITES:
          return {
            ...state,
            favorites: state.favorites.filter(
              (x) => x.id !== action.payload.payload.id
            ),
          };
        default:
          return state;
      }
    },
  },
});

export const { setFavorites, toggleFavorites } = favoritesSlice.actions;

export const favoritesSelector = (state) => state.favorites;

export default favoritesSlice.reducer;

export const addToFavorites = (event) => async (dispatch, getState) => {
  dispatch(
    toggleFavorites({
      type: ADD_TO_FAVORITES,
      payload: event,
    })
  );
  localStorage.setItem("favorites", JSON.stringify(getState().favorites));
};

export const removeFromFavorites = (event) => (dispatch, getState) => {
  dispatch(
    toggleFavorites({
      type: REMOVE_FROM_FAVORITES,
      payload: event,
    })
  );

  localStorage.setItem("favorites", JSON.stringify(getState().favorites));
};
