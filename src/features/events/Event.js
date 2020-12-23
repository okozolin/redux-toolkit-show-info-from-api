import React, { useEffect } from "react";
import {
  Typography,
  Paper,
  Box,
  IconButton,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";

import {
  addToFavorites,
  removeFromFavorites,
  selectFavoriteById,
} from "../favorites/favoritesSlice";
import { selectEventById } from "./eventsSlice";
import { Moment, calendarStrings } from "../../utils";

import { url } from "../../utils";
import { selectEvents, fetchEvents } from "../events/eventsSlice";

import Map from "./Map";

const useStyles = makeStyles((theme) => ({
  beatingHeart: {
    animation: "$heartBeat 1.5s infinite", // NOTE: prefix the animation name with $
  },

  "@keyframes heartBeat": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.3)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
}));

export default function Event() {
  window.scroll(0, 0);
  const classes = useStyles();
  const { state } = useLocation();
  const { from } = state || { from: "home" };
  const { id, artist: artistParam } = useParams();
  const favorite = useSelector((state) => selectFavoriteById(state, id));
  const event = useSelector((state) => selectEventById(state, id)) || favorite;
  const { artist, status } = useSelector(selectEvents);

  const imageUrl = favorite ? favorite.thumb : artist?.image_url;

  const dispatch = useDispatch();
  const error = !artist || status === "failed";

  useEffect(() => {
    const eventsPath = artistParam
      ? url(`${artistParam}/events`) + "&date=all"
      : "";
    if (from !== "eventsList") {
      dispatch(fetchEvents(eventsPath));
    }
  }, [artistParam, from, dispatch]);

  const toggleClick = (e) => {
    favorite
      ? dispatch(removeFromFavorites(id))
      : dispatch(addToFavorites({ ...event, thumb: artist.thumb_url }));
  };

  if (status === "idle") {
    return <></>;
  }

  return (
    <>
      {status === "loading" ? (
        <Box display="flex" justifyContent="center" alignItems="center" m={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box m={3}>Error: Failed to load</Box>
      ) : event ? (
        <>
          <Box>
            <IconButton
              style={{ color: "magenta" }}
              aria-label="More Options"
              onClick={toggleClick}
            >
              {favorite ? (
                <FavoriteIcon className={classes.beatingHeart} />
              ) : (
                <FavoriteBorderIcon className={classes.beatingHeart} />
              )}
            </IconButton>
            {!favorite ? (
              <Typography component="span" color="primary" variant="body1">
                Add to Favorites
              </Typography>
            ) : (
              <Typography component="span" variant="body1">
                Remove from favorites
              </Typography>
            )}
          </Box>
          {event.title && (
            <Typography variant="h3">
              <Box m={3}>"{event.title}</Box>
            </Typography>
          )}

          <Paper square elevation={0} variant="outlined">
            <Grid container>
              <Grid
                item
                component={NavLink}
                to={{
                  pathname: `/${artistParam}`,
                  state: { from: "event" },
                }}
                exact
              >
                <Box
                  m={1}
                  component="img"
                  src={imageUrl}
                  width={{ xs: "100px", sm: "220px" }}
                />
              </Grid>
              <Grid item sm={6}>
                <Box m={3}>
                  <Typography>Event meta data</Typography>
                  <Typography>Artist : {artistParam}</Typography>
                  <Typography>Event id: {id}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Paper square variant="outlined">
            <Box m={3}>
              Venu information
              <Typography>
                Date :{" "}
                <Moment calendar={calendarStrings}>{event.datetime}</Moment>
              </Typography>
              <Typography>
                Time: <Moment format="HH:mm">{event.datetime}</Moment>
              </Typography>
            </Box>
          </Paper>

          <Paper square variant="outlined">
            <Box m={3}>special offers</Box>
          </Paper>
          <Paper square variant="outlined">
            <Box m={3}>
              <Typography>{event?.venue.country}</Typography>
              <Typography>
                {event?.venue.city}, {event?.venue.location}
              </Typography>
              <Typography>{event?.venue.name}</Typography>
              Venu map
            </Box>
          </Paper>
          <Box p={4} mb={3}>
            <Paper square variant="outlined">
              <Map lat={event.venue.latitude} lon={event.venue.longitude} />
            </Paper>
          </Box>
        </>
      ) : (
        <>
          <Box p={4}>
            <Typography>Event #{id} was not found</Typography>
          </Box>
        </>
      )}
    </>
  );
}
