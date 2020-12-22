import React, { memo } from "react";
import { Typography, Box, Grid, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectEventById } from "./eventsSlice";
import { Moment } from "../../utils";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: 24,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const EventItem = memo(({ eventId }) => {
  const classes = useStyles();
  const event = useSelector((state) => selectEventById(state, eventId));
  const { offers } = event;

  return (
    <>
      <Grid container wrap="nowrap">
        <Grid item xs={2}>
          <Box
            display="flex"
            color={"#33a8ac"}
            flexDirection="column"
            textAlign="center"
          >
            <Box
              fontSize={12}
              style={{
                textTransform: "uppercase",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <Moment format="MMM">{event.datetime}</Moment>
            </Box>
            <Box fontSize={26} style={{ lineHeight: "29px" }}>
              <Moment format="D">{event.datetime}</Moment>
            </Box>
            <Box fontSize={12} style={{ lineHeight: "12px" }}>
              <Moment format="YYYY">{event.datetime}</Moment>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Typography>{event.venue.country}</Typography>
          <Box fontSize={14}>
            {event.venue.name}, {event.venue.city}
            {event.venue.region && <>, {event.venue.region}</>}
          </Box>
        </Grid>
        {offers.length > 0 && (
          <Grid item xs classes={{ item: classes.button }}>
            <Button variant="outlined" color="primary">
              {offers[0].type}
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
});

export default EventItem;
