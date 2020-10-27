import { combineReducers } from "redux";

import ArtistReducer from "./artistSlice";
import EventsReducer from "./eventsSlice";
import FavoritesReducer from "./favoritesSlice";

const rootReducer = combineReducers({
  artist: ArtistReducer,
  events: EventsReducer,
  favorites: FavoritesReducer,
});

export default rootReducer;
