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
    display: "inline-block",
    margin: "10px",
    fontStyle: "normal",
    position: "relative",
    "& span": {
      color: "orange",
      position: "relative",
    },
    "&:hover span": {
      animation: "$change 1s forwards",
    },
    "&::before": {
      content: ' ""',
      position: "absolute",
      top: "calc(50% - 45px)",
      left: "calc(50% - 45px)",
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      borderColor: "orange",
      borderStyle: "solid",
      borderWidth: "45px",
      transform: "scale(0)",
      boxSizing: "border-box",
    },
    "&:hover::before": {
      transition: "transform 0.5s, border-width 0.5s 0.5s",
      borderWidth: 0,
      transform: "scale(1)",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      width: "160px",
      height: "160px",
      left: "calc(50% - 80px)",
      top: "calc(50% - 80px)",
      background:
        "radial-gradient(circle, red 50%, transparent 60%), radial-gradient(circle, red 50%, transparent 60%), radial-gradient(circle, red 50%, transparent 60%), radial-gradient(circle, red 50%, transparent 60%), radial-gradient(circle, orange 50%, transparent 60%), radial-gradient(circle, orange 50%, transparent 60%), radial-gradient(circle, orange 50%, transparent 60%), radial-gradient(circle, orange 50%, transparent 60%)",
      backgroundSize: "16px 16px",
      backgroundPosition:
        "calc(50% - 50px) calc(50% - 50px), calc(50% + 50px) calc(50% - 50px), calc(50% - 50px) calc(50% + 50px), calc(50% + 50px) calc(50% + 50px), calc(50% + 0px) calc(50% + 70px), calc(50% + 70px) calc(50% + 0px), calc(50% - 70px) calc(50% + 0px), calc(50% + 0px) calc(50% - 70px)",
      backgroundRepeat: "no-repeat",
      borderRadius: "50%",
      transform: "scale(0)",
    },
    "&:hover::after": {
      transform: "scale(1)",
      opacity: 0,
      backgroundSize: "0 0",
      transition:
        "transform 0.5s 0.5s, opacity 0.4s 0.9s, background-size 0.5s 0.9s",
    },
  },

  "@keyframes change": {
    "50%": {
      transform: "scale(0)",
      filter: "grayscale(100%)",
    },

    "51%": {
      filter: "grayscale(0%)",
    },

    "100%": {
      transform: "scale(1)",
      filter: "grayscale(0%)",
    },
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
            <Grid item xs md={4}>
              <div className={classes.fireworks}>
                <span style={{ display: "inline-block", fontStyle: "normal" }}>
                  <Box
                    alignItems="center"
                    display="flex"
                    order={{ md: 1, lg: 1 }}
                    color="#ce285d"
                  >
                    <FaceIcon fontSize="large" />
                    <Typography>oritkozolin</Typography>
                  </Box>
                </span>
              </div>
            </Grid>
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
