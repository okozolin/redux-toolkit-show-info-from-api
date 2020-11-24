import { configureStore } from "@reduxjs/toolkit";
import artistReducer from "./artistSlice";
import eventsReducer from "./eventsSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    artist: artistReducer,
    events: eventsReducer,
    favorites: favoritesReducer,
  },
});
console.log("store setup", store.getState()); // { ids: [], entities: {} }

export default store;
