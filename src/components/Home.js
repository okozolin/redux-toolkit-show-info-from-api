import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Header from "./Header";
import Search from "./Search";
import Artist from "./Artist";
import Favorites from "./Favorites";
import { url } from "../utils";
import { artistSelector, fetchArtist } from "../redux/artistSlice";

export default function Home() {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const { artist, status, error } = useSelector(artistSelector);

  const artistPath = url(query);
  const eventsPath = url(`${query}/events`) + "&date=all";

  useEffect(() => {
    if (query) {
      dispatch(fetchArtist({ artistPath, eventsPath }));
    }
  }, [artistPath, query, dispatch, eventsPath]);

  console.log("status & error, artist in Home", status, error, artist);
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
            <Search setSearchText={setQuery} />
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
