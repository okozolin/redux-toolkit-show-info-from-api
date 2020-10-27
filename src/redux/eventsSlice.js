import { createSlice } from "@reduxjs/toolkit";
import Api from "../services/services";

export const initialState = {
  loading: false,
  hasErrors: false,
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    getEvents: (state) => {
      state.loading = true;
    },
    getEventsSuccess: (state, { payload }) => {
      state.events = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getEventsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getEvents,
  getEventsSuccess,
  getEventsFailure,
} = eventsSlice.actions;

export const eventsSelector = (state) => state.events;

export default eventsSlice.reducer;

export function fetchEvents(url) {
  return async (dispatch) => {
    dispatch(getEvents());

    try {
      let hashmap = [];
      const data = await Api.getData(url);
      if (data) {
        data.reverse();
        // hashmap = data.reduce((acc, cur) => {
        //   return { ...acc, [cur.id]: cur };
        // }, []);
      }
      dispatch(getEventsSuccess(data));
    } catch (error) {
      dispatch(getEventsFailure());
    }
  };
}
