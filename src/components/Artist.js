import React from "react";
import {
  Grid,
  Typography,
  Avatar,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

import { capitalize } from "../utils";
import { FONT_SIZE_15 } from "../constants/constants";
import EventItem from "./EventItem";
import { useSelector } from "react-redux";
import { artistSelector } from "../redux/artistSlice";
import { eventsSelector } from "../redux/eventsSlice";

export default function Artist() {
  const { artist } = useSelector(artistSelector);
  const { events } = useSelector(eventsSelector);

  let EventLink;
  const eventsList = (
    <List>
      {events.map((item) => {
        EventLink = (props) => (
          <NavLink to={`${artist.name}/events/${item.id}`} {...props} />
        );
        return (
          <ListItem
            button
            key={item.id}
            component={EventLink}
            // classes={{ root: classes.item }}
          >
            <ListItemText>
              <EventItem event={item} />
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <>
      <Paper elevation={1}>
        <Grid container justify="flex-start" alignItems="center" spacing={3}>
          <Grid item>
            <Avatar
              alt="Artist/Band avatar"
              src={artist.thumb_url}
              size={FONT_SIZE_15} // 74px
            >
              {/* if picture file does not exist use alternative avatar with name initials */}
              {/* {getNameInitials(artist.PersonName)} */}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography>{capitalize(artist.name)}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {events.length > 0 ? (
        <List m={3}>{eventsList}</List>
      ) : (
        <Box m={3}>
          <Typography>No events found</Typography>
        </Box>
      )}
    </>
  );
}
