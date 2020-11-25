import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  CardHeader,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavorites,
  updateFavorites,
  selectAllFavorites,
} from "./favoritesSlice";
import CancelIcon from "@material-ui/icons/Cancel";

const Favorites = () => {
  const dispatch = useDispatch();

  let favorites = useSelector(selectAllFavorites);

  const localStorageFavorites = localStorage.getItem("favorites");
  console.log("localStorageFavorites in Favorites-->", localStorageFavorites);
  if (favorites.length === 0 && localStorageFavorites) {
    favorites = JSON.parse(localStorageFavorites);
    dispatch(updateFavorites(favorites));
  }
  return (
    <Box textAlign="center" bgcolor="#b7fcde">
      <Typography variant="h4">Favorites</Typography>
      {favorites.length ? (
        <Card>
          {favorites.map((event, i) => (
            <Card key={i}>
              <CardHeader
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={() => dispatch(removeFromFavorites(event.id))}
                  >
                    <CancelIcon />
                  </IconButton>
                }
                title={
                  <Typography gutterBottom variant="h5" component="h2">
                    {event.lineup[0]}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {event.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {event.datetime}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {event.venue.country}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Card>
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
