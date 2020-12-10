import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useSelector } from "react-redux";

import { capitalize } from "../../utils";
import { artistSelector } from "./artistSlice";
import { selectEventsIds } from "../events/eventsSlice";
import EventsList from "../events/EventsList";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { url } from "../../utils";
import { fetchArtist } from "../artist/artistSlice";

export default function Artist() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const query = useParams();

  const dispatch = useDispatch();
  const artistPath = query ? url(query.artist) : "";
  const eventsPath = query ? url(`${query.artist}/events`) + "&date=all" : "";

  useEffect(() => {
    if (query.artist) {
      dispatch(fetchArtist({ artistPath, eventsPath }));
    }
  }, [artistPath, query, dispatch, eventsPath]);

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
        <Box m={3}>Error: Failed to load</Box>
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
                {/* {imgLoaded ? null : (
                  <Skeleton variant="rect" width={200} height={200} />
                )} */}
                <Box
                  style={imgLoaded ? {} : { display: "none" }}
                  component="img"
                  src={artist.image_url}
                  width={{ xs: "200px", sm: "320px" }}
                  onLoad={() => setImgLoaded(true)}
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
