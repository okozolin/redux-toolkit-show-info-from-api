import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavorites,
  favoritesSelector,
} from "../redux/favoritesSlice";

const Favorites = ({ history }) => {
  const dispatch = useDispatch();

  const { favorites } = useSelector(favoritesSelector);

  return (
    <Box textAlign="center">
      {favorites.length ? (
        <Card stackable itemsPerRow={5}>
          {favorites.map((event, i) => (
            <Card
              onClick={() => dispatch(removeFromFavorites(event))}
              md={12}
              key={i}
              textAlign="center"
            >
              <CardContent textAlign="center">
                <CardHeader>{event.name}</CardHeader>
                <CardMedia src={event} wrapped />
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
