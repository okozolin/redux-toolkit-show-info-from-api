import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Header from "./Header";
import Search from "./Search";
import Artist from "./Artist";
import Favorites from "./Favorites";
import { url } from "../utils";
import { artistSelector, fetchArtist } from "../redux/artistSlice";
import { fetchEvents } from "../redux/eventsSlice";

export default function Home() {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const { artist, loading, hasErrors } = useSelector(artistSelector);

  const artistPath = url(query);
  const eventsPath = url(`${artist.name}/events`) + "&date=all";

  useEffect(() => {
    if (query) {
      dispatch(fetchArtist(artistPath));
      dispatch(fetchEvents(eventsPath));
    }
  }, [dispatch, artistPath, eventsPath, query]);

  return loading ? (
    <CircularProgress />
  ) : hasErrors ? (
    <div>Error: Failed to load</div>
  ) : (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={6} container spacing={3}>
          <Grid item xs={12}>
            <Search setSearchText={setQuery} />
          </Grid>
          <Grid item xs={12}>
            {artist ? <Artist /> : ""}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Favorites />
        </Grid>
      </Grid>
    </>
  );
}
