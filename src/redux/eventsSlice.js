import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import Api from "../services/services";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (eventsPath, thunkAPI) => {
    const response = await Api.getData(eventsPath);
    console.log("events response in EventsSlice", response);
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
});

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvents.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, { payload }) => {
      console.log("fetchEvents.fulfilled payload", payload);
      state.status = "succeeded";
      eventsAdapter.setAll(state, payload);
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

// Can create a set of memoized selectors based on the location of this entity state
export const {
  selectAll: selectAllEvents,
  selectById: selectEventById,
  selectIds: selectEventsIds,
} = eventsAdapter.getSelectors((state) => state.events);

export default eventsSlice.reducer;
