import React from "react";
import { Typography, Paper, Box, IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  addToFavorites,
  removeFromFavorites,
  selectFavoriteById,
} from "../favorites/favoritesSlice";
import { selectEventById } from "./eventsSlice";
import { Moment, calendarStrings } from "../../utils";

export default function Event() {
  const { id, artist } = useParams();
  const favorite = useSelector((state) => selectFavoriteById(state, id));
  const event = useSelector((state) => selectEventById(state, id)) || favorite;

  const dispatch = useDispatch();
  const toggleClick = (e) => {
    favorite
      ? dispatch(removeFromFavorites(id))
      : dispatch(addToFavorites(event));
  };

  return (
    <div>
      <Box>
        <IconButton
          style={{ color: "magenta" }}
          aria-label="More Options"
          onClick={toggleClick}
        >
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
        <Box m={3}>
          <Typography>Event meta data</Typography>
          <Typography>Artist : {artist}</Typography>
          <Typography>Event id: {id}</Typography>
        </Box>
      </Paper>

      <Paper square variant="outlined">
        <Box m={3}>
          Venu information
          <Typography>
            Date : <Moment calendar={calendarStrings}>{event.datetime}</Moment>
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
    </div>
  );
}
