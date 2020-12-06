import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Grid, Box, Paper, Typography } from "@material-ui/core";
import Search from "./Search";
import { url } from "../../utils";
import { fetchArtist } from "../artist/artistSlice";
import Navbar from "../../app/Navbar";
import Header from "../../components/Header";
import FaceIcon from "@material-ui/icons/Face";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    [theme.breakpoints.down("md")]: {
      marginTop: 20,
    },
  },
  fireworks: {
    "&:hover": {},
  },
}));

export default function Home() {
  const classes = useStyles();

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
  }, [artistPath, query, dispatch, eventsPath, history]);

  const handleChange = useCallback(
    (newValue) => {
      setQuery(newValue);
    },
    [setQuery]
  );

  return (
    <>
      <Paper square elevation={1}>
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justify="space-between"
            style={{ padding: "0 20px", marginBottom: "20px" }}
          >
            <Box
              clone
              alignItems="center"
              display="flex"
              order={{ md: 1, lg: 1 }}
              color="#ce285d"
            >
              <Grid item xs md={4} classes={{ root: classes.fireworks }}>
                <FaceIcon fontSize="large" />
                <Typography>oritkozolin</Typography>
              </Grid>
            </Box>

            <Box clone order={{ md: 2, lg: 3 }}>
              <Grid item xs={6} md>
                <Navbar />
              </Grid>
            </Box>
            <Box clone order={{ md: 3, lg: 2 }}>
              <Grid item xs={12} lg={4} classes={{ item: classes.search }}>
                <Search setSearchText={handleChange} />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
