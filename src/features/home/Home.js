import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Search from "./Search";
import Artist from "../artist/Artist";
import Favorites from "../favorites/Favorites";
import { url } from "../../utils";
import { artistSelector, fetchArtist } from "../artist/artistSlice";

export default function Home() {
  console.count("Home");
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const { artist, status, error } = useSelector(artistSelector);
  console.log("status inside Home--->", status);
  const artistPath = url(query);
  const eventsPath = url(`${query}/events`) + "&date=all";

  useEffect(() => {
    if (query) {
      dispatch(fetchArtist({ artistPath, eventsPath }));
    }
  }, [artistPath, query, dispatch, eventsPath]);

  const handleChange = useCallback(
    (newValue) => {
      setQuery(newValue);
    },
    [setQuery]
  );

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6} container spacing={3}>
          <Grid item xs={12}>
            <Search setSearchText={handleChange} />
          </Grid>

          {status === "loading" ? (
            <CircularProgress />
          ) : error ? (
            <div>Error: Failed to load</div>
          ) : (
            artist &&
            Object.keys(artist).length !== 0 &&
            artist.constructor === Object && (
              <Grid item xs={12}>
                <Artist />
              </Grid>
            )
          )}
        </Grid>
        <Grid item xs={6}>
          <Favorites />
        </Grid>
      </Grid>
    </>
  );
}
