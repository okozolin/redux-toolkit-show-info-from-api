import React from "react";
import { Typography, Paper, Box } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { eventsSelector } from "../redux/eventsSlice";
import { IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  addToFavorites,
  removeFromFavorites,
  favoritesSelector,
} from "../redux/favoritesSlice";

export default function Event() {
  const { id, artist } = useParams();
  const { events } = useSelector(eventsSelector);
  const { favorites } = useSelector(favoritesSelector);

  const dispatch = useDispatch();

  const ev = events.filter((ev) => ev.id === id);
  const event = ev[0];

  const isFav = favorites && favorites.some((fav) => fav.id === id);

  const toggleClick = (e) => {
    isFav
      ? dispatch(removeFromFavorites(event))
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
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        {!isFav ? (
          <Typography component="span" color="primary" variant="body1">
            Add to Favorites
          </Typography>
        ) : (
          <Typography component="span" color="secondery" variant="body1">
            Remove from favorites
          </Typography>
        )}
      </Box>
      {event.title && <Typography variant="h2">{event.title}</Typography>}

      <Paper elevation={0} variant="outlined">
        <Box m={3}>
          event meta data artist, id: {artist}, {id}
        </Box>
      </Paper>

      <Paper variant="outlined">
        <Box m={3}>
          venu information
          <Typography>{event?.datetime}</Typography>
        </Box>
      </Paper>

      <Paper variant="outlined">
        <Box m={3}>special offers</Box>
      </Paper>
      <Paper variant="outlined">
        <Box m={3}>
          <Typography>{event?.venue.country}</Typography>
          <Typography>
            {event?.venue.city}, {event?.venue.location}
          </Typography>
          <Typography>{event?.venue.name}</Typography>
          venu map
        </Box>
      </Paper>
    </div>
  );
}
