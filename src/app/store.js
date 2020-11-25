import { configureStore } from "@reduxjs/toolkit";
import artistReducer from "../features/artist/artistSlice";
import eventsReducer from "../features/events/eventsSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";

const store = configureStore({
  reducer: {
    artist: artistReducer,
    events: eventsReducer,
    favorites: favoritesReducer,
  },
});
console.log("store setup", store.getState()); // { ids: [], entities: {} }

export default store;
