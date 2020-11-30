import React from "react";
import { List, ListItem, ListItemText, Divider, Box } from "@material-ui/core";
import EventItem from "./EventItem";
import { NavLink } from "react-router-dom";

export default function EventsList({ eventsIds, artistName }) {
  console.count("EventsList");

  return (
    <List m={3}>
      {eventsIds.map((eventId, index) => (
        <Box key={index}>
          <ListItem
            button
            key={eventId}
            component={NavLink}
            to={`${artistName}/events/${eventId}`}
          >
            <ListItemText>
              <EventItem eventId={eventId} />
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
        </Box>
      ))}
    </List>
  );
}
