import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Paper } from "@material-ui/core";
import Search from "./Search";
import { url } from "../../utils";
import { fetchArtist } from "../artist/artistSlice";
import Navbar from "../../app/Navbar";
import Header from "../../components/Header";
import FaceIcon from "@material-ui/icons/Face";
import { useHistory } from "react-router-dom";

export default function Home() {
  console.count("Home");
  const [query, setQuery] = useState("");
  let history = useHistory();

  const dispatch = useDispatch();
  const artistPath = url(query);
  const eventsPath = url(`${query}/events`) + "&date=all";

  useEffect(() => {
    if (query) {
      dispatch(fetchArtist({ artistPath, eventsPath }));
      history.push("/");
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
      <Paper elevation={1}>
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12} container>
            <Box clone order={{ xs: 1, sm: 1 }}>
              <Grid item xs={6} sm={3}>
                <FaceIcon fontSize="large" />
              </Grid>
            </Box>

            <Box clone order={{ xs: 2, sm: 3 }}>
              <Grid item xs={6} sm={3}>
                <Navbar />
              </Grid>
            </Box>
            <Box clone order={{ xs: 3, sm: 2 }}>
              <Grid item xs={12} sm={3}>
                <Search setSearchText={handleChange} />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
