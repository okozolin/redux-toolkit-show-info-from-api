import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  CardHeader,
  CardActionArea,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavorites,
  updateFavorites,
  selectAllFavorites,
} from "./favoritesSlice";
import { NavLink } from "react-router-dom";

import CancelIcon from "@material-ui/icons/Cancel";
import { Moment, calendarStrings } from "../../utils";
import { useRouteMatch } from "react-router-dom";

const Favorites = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  let favorites = useSelector(selectAllFavorites);

  const localStorageFavorites = localStorage.getItem("favorites");

  if (favorites.length === 0 && localStorageFavorites) {
    favorites = JSON.parse(localStorageFavorites);
    dispatch(updateFavorites(favorites));
  }

  return (
    <Box textAlign="center" bgcolor="#b7fcde">
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
              <CardActionArea
                key={event.id}
                component={NavLink}
                to={`${match.url}${event.lineup[0]}/events/${event.id}`}
              >
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Date :{" "}
                    <Moment calendar={calendarStrings}>{event.datetime}</Moment>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {event.venue.country}
                  </Typography>
                </CardContent>
              </CardActionArea>
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

{
  /* <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */
}
