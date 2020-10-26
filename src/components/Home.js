import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Header from "./Header";
import Search from "./Search";
import Artist from "./Artist";
import { url } from "../utils";
import { artistSelector, fetchArtist } from "../redux/artistSlice";

export default function Home() {
  const [query, setQuery] = useState("");
  const [eventsData, setEventsData] = useState([]);

  const dispatch = useDispatch();
  const { artist, loading, hasErrors } = useSelector(artistSelector);
  console.log("artist: ", artist);

  const path = url(query);
  const eventsPath = url(`${artist.name}/events`) + "&date=all";

  useEffect(() => {
    if (query) {
      dispatch(fetchArtist(path));
    }
  }, [dispatch, path, query]);

  console.log("query", query);
  console.log("artist from home component", artist);
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
          <Artist data={artist} events={eventsData} />
        </Grid>
      </Grid>
    </>
  );
}
