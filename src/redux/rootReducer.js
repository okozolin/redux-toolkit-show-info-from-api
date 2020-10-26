import { combineReducers } from "redux";

import ArtistReducer from "./artistSlice";

const rootReducer = combineReducers({
  artist: ArtistReducer,
  // events: EventsReducer,
  // favorites: FavoritesReducer,
});

export default rootReducer;
