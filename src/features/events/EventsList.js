import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import EventItem from "./EventItem";
import NavLinkWrapper from "../../components/NavLinkWrapper";

export default function EventsList({ eventsIds, artistName }) {
  console.count("EventsList");

  return (
    <List m={3}>
      {eventsIds.map((eventId) => (
        <ListItem
          button
          key={eventId}
          component={NavLinkWrapper}
          to={`${artistName}/events/${eventId}`}
        >
          <ListItemText>
            <EventItem eventId={eventId} />
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
