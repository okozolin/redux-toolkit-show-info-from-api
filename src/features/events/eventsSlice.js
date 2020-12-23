import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import Api from "../../services/services";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (eventsPath, thunkAPI) => {
    const response = await Api.getData(eventsPath);
    return response;
  }
);

const eventsAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    return b.datetime.localeCompare(a.datetime);
  },
});
const initialState = eventsAdapter.getInitialState({
  status: "idle",
  errors: null,
  artist: {},
});

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    initEvents(state, action) {
      eventsAdapter.setAll(state, []);
    },
  },
  extraReducers: {
    [fetchEvents.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.artist = payload[0]?.artist || [];
      eventsAdapter.setAll(state, payload);
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const {
  selectAll: selectAllEvents,
  selectById: selectEventById,
  selectIds: selectEventsIds,
} = eventsAdapter.getSelectors((state) => state.events);

export const { initEvents } = eventsSlice.actions;
export const selectEvents = (state) => state.events;
export default eventsSlice.reducer;
