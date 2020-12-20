import React from "react";
import { List, ListItem, ListItemText, Divider, Box } from "@material-ui/core";
import EventItem from "./EventItem";
import { NavLink } from "react-router-dom";

export default function EventsList({ eventsIds, artistName }) {
  console.count("EventsList");

  return (
    <>
      <Box>
        <List>
          {eventsIds.map((eventId) => (
            <>
              <ListItem
                disableGutters
                button
                key={eventId}
                component={NavLink}
                to={{
                  pathname: `${artistName}/events/${eventId}`,
                  state: { from: "eventsList" },
                }}
              >
                <ListItemText>
                  <EventItem eventId={eventId} />
                </ListItemText>
              </ListItem>
              <Divider component="li" />
            </>
          ))}
        </List>
      </Box>
    </>
  );
}
