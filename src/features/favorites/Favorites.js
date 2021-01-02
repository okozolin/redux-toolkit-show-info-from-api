import React, { memo } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavorites,
  updateFavorites,
  selectAllFavorites,
} from "./favoritesSlice";
import { searchUpdated } from "../home/searchSlice";

import { NavLink } from "react-router-dom";

import DeleteIcon from "@material-ui/icons/Delete";
import { Moment, calendarStrings } from "../../utils";
import { useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getFavorites } from "./favoritesService";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #eedbe1",
  },
  thumb: {
    width: 100,
  },
  actionAria: {
    display: "flex",
    justifyContent: "flex-start",
    padding: 5,
  },
}));

const Favorites = memo(({ setOpen }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const match = useRouteMatch();
  let favorites = useSelector(selectAllFavorites);
  const localStorageFavorites = getFavorites();

  if (favorites.length === 0 && localStorageFavorites) {
    dispatch(updateFavorites(localStorageFavorites));
  }

  const handleClickEvent = (artistName) => (e) => {
    setOpen(false);
    dispatch(searchUpdated(artistName));
  };

  return (
    <Box>
      {favorites.length ? (
        <>
          {favorites.map((event, i) => (
            <Card square key={i} classes={{ root: classes.card }}>
              <CardActionArea
                onClick={handleClickEvent(event.lineup[0])}
                classes={{ root: classes.actionAria }}
                component={NavLink}
                to={{
                  pathname: `${match.url}${event.lineup[0]}/events/${event.id}`,
                  state: { from: "favorites" },
                }}
              >
                <CardMedia
                  className={classes.thumb}
                  component="img"
                  image={event.thumb}
                  title={event.lineup[0]}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {event.lineup[0]}
                  </Typography>
                  {event.title && (
                    <Typography variant="body2" color="textSecondary">
                      "{event.title}"
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary">
                    <Moment calendar={calendarStrings}>{event.datetime}</Moment>
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {event.venue.country}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box>
                <IconButton
                  aria-label="delete"
                  onClick={() => dispatch(removeFromFavorites(event.id))}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))}
        </>
      ) : (
        <Box m={3}>
          <Typography variant="body2">
            You have no favorite events yet !
          </Typography>
        </Box>
      )}
    </Box>
  );
});

export default Favorites;
