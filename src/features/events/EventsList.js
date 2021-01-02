import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button,
} from "@material-ui/core";
import EventItem from "./EventItem";
import { NavLink } from "react-router-dom";
import { TOTAL_EVENTS_PER_PAGE } from "../../config";

export default function EventsList({ eventsIds, artistName }) {
  const [partialEventsIds, setPartialEventsIds] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const LoadMoreEvents = () => {
    setStartIndex((prev) => prev + TOTAL_EVENTS_PER_PAGE);
  };

  useEffect(() => {
    setLoading(true);
    const slicedEventsIds = eventsIds.slice(
      startIndex,
      startIndex + TOTAL_EVENTS_PER_PAGE
    );
    setPartialEventsIds((prev) => [...prev, ...slicedEventsIds]);
    setLoading(false);
  }, [startIndex, eventsIds]);
  return (
    <>
      <Box>
        <List>
          {partialEventsIds.map((eventId) => (
            <div key={eventId}>
              <ListItem
                disableGutters
                button
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
            </div>
          ))}
        </List>
        {startIndex + TOTAL_EVENTS_PER_PAGE <= eventsIds.length && (
          <Box m={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={LoadMoreEvents}
            >
              {isLoading
                ? "loading more..."
                : `Show More : ${startIndex + 1 + TOTAL_EVENTS_PER_PAGE} - ${
                    eventsIds.length
                  }`}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
