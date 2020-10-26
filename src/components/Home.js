import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Header from "./Header";
import Search from "./Search";
import Artist from "./Artist";
import { url } from "../utils";
import { artistSelector, fetchArtist, resetArtist } from "../redux/artistSlice";
import { eventsSelector, fetchEvents } from "../redux/eventsSlice";

export default function Home() {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const { artist, loading, hasErrors } = useSelector(artistSelector);
  const { events } = useSelector(eventsSelector);

  const artistPath = url(query);
  const eventsPath = url(`${artist.name}/events`) + "&date=all";

  useEffect(() => {
    if (query) {
      dispatch(fetchArtist(artistPath));
      dispatch(fetchEvents(eventsPath));
      console.log("after second dispatch");
    }
    // return () => {
    //   dispatch(resetArtist(null));
    //   dispatch(resetEvents(null));
    // };
  }, [dispatch, artistPath, eventsPath, query]);

  return loading ? (
    <CircularProgress />
  ) : (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Search setSearchText={setQuery} />
        </Grid>
        <Grid item xs={12} sm={6}>
          Favorites
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item sm>
          <Artist />
        </Grid>
      </Grid>
    </>
  );
}
