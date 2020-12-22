import React, { useContext, memo } from "react";
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
import { NavLink } from "react-router-dom";

import DeleteIcon from "@material-ui/icons/Delete";
import { Moment, calendarStrings } from "../../utils";
import { useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { DrawerContext } from "../../app/context";

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

const Favorites = memo(() => {
  const classes = useStyles();
  const { open, setOpen } = useContext(DrawerContext);

  const dispatch = useDispatch();
  const match = useRouteMatch();
  let favorites = useSelector(selectAllFavorites);

  const localStorageFavorites = localStorage.getItem("favorites");

  if (favorites.length === 0 && localStorageFavorites) {
    favorites = JSON.parse(localStorageFavorites);
    dispatch(updateFavorites(favorites));
  }

  return (
    <Box>
      {favorites.length ? (
        <>
          {favorites.map((event, i) => (
            <Card square key={i} classes={{ root: classes.card }}>
              <CardActionArea
                onClick={() => setOpen(false)}
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
