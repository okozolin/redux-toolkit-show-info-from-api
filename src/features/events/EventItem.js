import React from "react";
import { Typography, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectEventById } from "./eventsSlice";
import { Moment, calendarStrings } from "../../utils";

export default function EventItem({ eventId }) {
  // console.count("EventItem");
  const event = useSelector((state) => selectEventById(state, eventId));
  const { offers } = event;

  return (
    <>
      <Box m={2}>
        <Typography>{event.venue.country}</Typography>
        <Typography>
          Date : <Moment calendar={calendarStrings}>{event.datetime}</Moment>
        </Typography>
        {offers.length > 0 && (
          <Typography variant="body2">
            {offers[0].type} : {offers[0].status}
          </Typography>
        )}
      </Box>
    </>
  );
}
