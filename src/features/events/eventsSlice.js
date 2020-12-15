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
});

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvents.pending]: (state, action) => {
      console.log("fetchEvents.pending------->");
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, { payload }) => {
      console.log("fetchEvents.fulfilled------->");
      state.status = "succeeded";
      eventsAdapter.setAll(state, payload);
    },
    [fetchEvents.rejected]: (state, action) => {
      console.log("fetchEvents.rejected------->", action);
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

export default eventsSlice.reducer;
