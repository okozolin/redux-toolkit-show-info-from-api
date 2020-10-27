import React from "react";
import { Typography, Box, Card, CardContent } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavorites,
  favoritesSelector,
} from "../redux/favoritesSlice";

const Favorites = () => {
  const dispatch = useDispatch();

  let { favorites } = useSelector(favoritesSelector);
  const localStorageFavorites = localStorage.getItem("favorites");

  console.log("favorites", favorites);
  console.log("localStorageFavorites", localStorageFavorites);
  if (favorites.length === 0) {
    favorites = JSON.parse(localStorageFavorites).favorites;
  }
  return (
    <Box textAlign="center" bgcolor="#b7fcde">
      <Typography variant="h3" color="primary">
        Favorites
      </Typography>
      {favorites.length ? (
        <Card>
          {favorites.map((event, i) => (
            <Card
              onClick={() => dispatch(removeFromFavorites(event))}
              md={12}
              key={i}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {event.lineup[0]}
                </Typography>
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
          <h1>You have no favorite events yet !</h1>
        </Box>
      )}
    </Box>
  );
};

export default Favorites;
