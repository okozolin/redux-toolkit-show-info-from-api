import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../services/services";
import { fetchEvents } from "./eventsSlice";

export const fetchArtist = createAsyncThunk(
  "artist/fetchArtist",
  async ({ artistPath, eventsPath }, thunkAPI) => {
    const response = await Api.getData(artistPath);
    await thunkAPI.dispatch(fetchEvents(eventsPath));
    return response;
  }
);
export const initialState = {
  status: "idle",
  error: null,
  artist: {},
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {},
  // Example how to use thunk action creators with typescript
  // ----------------------------------------------------------
  // extraReducers: builder => {
  //   builder.addCase(fetchArtist.fullfilled, (state, action) => {})
  // }
  extraReducers: {
    [fetchArtist.pending]: (state, action) => {
      console.log("fetchArtist.pending, state, action", state, action);
      state.status = "loading";
    },
    [fetchArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log("fetchArtist.fulfilled, action", action);
      // Add any fetched posts to the array
      // postsAdapter.upsertMany(state, action.payload)
      state.artist = action.payload;
    },
    [fetchArtist.rejected]: (state, action) => {
      console.log("fetchArtist.rejected, action", action);
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const artistSelector = (state) => state.artist;

export default artistSlice.reducer;
