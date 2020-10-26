import { combineReducers } from "redux";

import ArtistReducer from "./artistSlice";
import EventsReducer from "./eventsSlice";

const rootReducer = combineReducers({
  artist: ArtistReducer,
  events: EventsReducer,
  // favorites: FavoritesReducer,
});

export default rootReducer;
