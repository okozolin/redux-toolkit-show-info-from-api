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
import { Link as RouterLink, Route } from "react-router-dom";

import { capitalize } from "../utils";
import { FONT_SIZE_15 } from "../constants";
import EventItem from "./EventItem";
import { useSelector } from "react-redux";
import { artistSelector } from "../redux/artistSlice";
import { eventsSelector } from "../redux/eventsSlice";
import { NavLink } from "react-router-dom";

export default function Artist() {
  const { artist: data } = useSelector(artistSelector);
  const { events } = useSelector(eventsSelector);

  let EventLink;
  const list = (
    <List>
      {events.map((item) => {
        EventLink = (props) => (
          <NavLink to="/events/:id" {...props} />
          //   <Link href={url} as={link} color="inherit" {...props} />
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
              src={data.thumb_url}
              size={FONT_SIZE_15} // 74px
            >
              {/* if picture file does not exist use alternative avatar with name initials */}
              {/* {getNameInitials(data.PersonName)} */}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography>{capitalize(data.name)}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {events.length > 0 ? (
        <List m={3}>{list}</List>
      ) : (
        <Box m={3}>
          <Typography>No events found</Typography>
        </Box>
      )}
    </>
  );
}
