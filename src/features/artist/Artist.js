import React from "react";
import { Grid, Typography, Box, CircularProgress } from "@material-ui/core";

import { capitalize } from "../../utils";
import { useSelector } from "react-redux";
import { artistSelector } from "./artistSlice";
import { selectEventsIds } from "../events/eventsSlice";
import EventsList from "../events/EventsList";

export default function Artist() {
  const { artist, status, error } = useSelector(artistSelector);
  console.log("status inside Artist--->", status);
  const orderedEventsIds = useSelector(selectEventsIds);
  const capitalizedArtistName = capitalize(artist.name);

  if (status === "idle") {
    return <></>;
  }

  return (
    <>
      {status === "loading" ? (
        <CircularProgress />
      ) : error ? (
        <div>Error: Failed to load</div>
      ) : (
        artist &&
        Object.keys(artist).length !== 0 &&
        artist.constructor === Object && (
          <Grid container direction="row">
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Box component="img" src={artist.image_url} height="320px" />
              </Grid>
              <Grid item xs={12}>
                <Typography>{capitalizedArtistName}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              {orderedEventsIds.length > 0 ? (
                <EventsList
                  eventsIds={orderedEventsIds}
                  artistName={artist.name}
                />
              ) : (
                <Box m={3}>
                  <Typography>
                    Did not find any events for {capitalizedArtistName}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        )
      )}
    </>
  );
}
