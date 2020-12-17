import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../services/services";
import { fetchEvents } from "../events/eventsSlice";

export const fetchArtist = createAsyncThunk(
  "artist/fetchArtist",
  async ({ artistPath, eventsPath }, thunkAPI) => {
    const response = await Api.getData(artistPath);
    if (response.length == 0 || response?.error === "Not Found")
      return response;

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
      console.log("fetchArtist.pending------->");
      state.status = "loading";
    },
    [fetchArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log("fetchArtist.fulfilled------->");
      state.artist = action.payload;
    },
    [fetchArtist.rejected]: (state, action) => {
      console.log("fetchArtist.rejected------->");
      state.status = "failed";
      state.error = action.error;
      state.artist = {};
    },
  },
});

export const artistSelector = (state) => state.artist;

export default artistSlice.reducer;
