import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Header from "./Header";
import Search from "./Search";
import Artist from "./Artist";
import Favorites from "./Favorites";
import { url } from "../utils";
import { artistSelector, fetchArtist } from "../redux/artistSlice";

export default function Home() {
  console.count("Home");
  console.time("query");
  const [query, setQuery] = useState("");
  console.timeEnd("query");

  console.time("redux");
  const dispatch = useDispatch();
  const { artist, status, error } = useSelector(artistSelector);
  console.timeEnd("redux");

  const artistPath = url(query);
  const eventsPath = url(`${query}/events`) + "&date=all";

  console.time("fetch");
  useEffect(() => {
    if (query) {
      dispatch(fetchArtist({ artistPath, eventsPath }));
    }
  }, [artistPath, query, dispatch, eventsPath]);
  console.timeEnd("fetch");

  const handleChange = useCallback(
    (newValue) => {
      setQuery(newValue);
    },
    [setQuery]
  );

  // console.log("status & error, artist in Home", status, error, artist);
  return status === "loading" ? (
    <CircularProgress />
  ) : error ? (
    <div>Error: Failed to load</div>
  ) : (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={6} container spacing={3}>
          <Grid item xs={12}>
            <Search setSearchText={handleChange} />
          </Grid>
          {artist &&
            Object.keys(artist).length !== 0 &&
            artist.constructor === Object && (
              <Grid item xs={12}>
                <Artist />
              </Grid>
            )}
        </Grid>
        <Grid item xs={6}>
          <Favorites />
        </Grid>
      </Grid>
    </>
  );
}
