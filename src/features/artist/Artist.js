import React from "react";
import { Grid, Typography, Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import { capitalize } from "../../utils";
import { artistSelector } from "./artistSlice";
import { selectEventsIds } from "../events/eventsSlice";
import EventsList from "../events/EventsList";

export default function Artist() {
  const { artist, status, error } = useSelector(artistSelector);
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
          <Grid container justify="flex-start" alignItems="flex-start">
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
              sm={6}
            >
              <Grid item>
                <Box m={2}>
                  <Typography variant="h6">{capitalizedArtistName}</Typography>
                </Box>
              </Grid>

              <Grid item>
                <Box
                  component="img"
                  src={artist.image_url}
                  width={{ xs: "200px", sm: "320px" }}
                />
              </Grid>
            </Grid>
            <Grid item xs sm={6}>
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
