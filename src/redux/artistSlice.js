import { createSlice } from "@reduxjs/toolkit";
import Api from "../services/services";

// const slice = createSlice({
//   name: "artist",
//   initialState: [],
//   reducers: {
//     getArtist: (state, action) => {
//       state.artist = action.payloadn;
//     },
//   },
// });

// export const { getArtist } = slice.actions;
// export default slice.reducer;

export const initialState = {
  loading: false,
  hasErrors: false,
  artist: {},
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    getArtist: (state) => {
      state.loading = true;
    },
    getArtistSuccess: (state, { payload }) => {
      state.artist = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getArtistFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getArtist,
  getArtistSuccess,
  getArtistFailure,
} = artistSlice.actions;

export const artistSelector = (state) => state.artist;

export default artistSlice.reducer;

export function fetchArtist(url) {
  return async (dispatch) => {
    dispatch(getArtist());

    try {
      const data = await Api.getData(url);
      dispatch(getArtistSuccess(data));
    } catch (error) {
      dispatch(getArtistFailure());
    }
  };
}
