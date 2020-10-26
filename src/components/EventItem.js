import React from "react";
import Moment from "react-moment";
import { Typography, Paper, Box } from "@material-ui/core";

export default function EventItem({ event }) {
  const { offers } = event;

  Moment.globalFormat = "D MMM YYYY";
  const calendarStrings = {
    lastDay: "[Yesterday at] LT",
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    lastWeek: "[last] dddd [at] LT",
    nextWeek: "dddd [at] LT",
    sameElse: "L",
  };

  return (
    <>
      <Paper elevation={2}>
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
      </Paper>
    </>
  );
}
