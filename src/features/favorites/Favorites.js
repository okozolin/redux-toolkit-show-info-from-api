import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  CardActionArea,
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

const useStyles = makeStyles((theme) => ({
  card: {
    borderBottom: "1px solid #eedbe1",
  },
}));

const Favorites = () => {
  const classes = useStyles();
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
              <Box display="flex" justifyContent="space-between">
                <CardActionArea
                  component={NavLink}
                  to={`${match.url}${event.lineup[0]}/events/${event.id}`}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {event.lineup[0]}
                    </Typography>
                    {event.title && (
                      <Box
                        component="Typography"
                        variant="body2"
                        color="textSecondary"
                      >
                        "{event.title}"
                      </Box>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      <Moment calendar={calendarStrings}>
                        {event.datetime}
                      </Moment>
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
              </Box>
            </Card>
          ))}
        </>
      ) : (
        <Box>
          <Typography variant="body2">
            You have no favorite events yet !
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Favorites;
