import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Box, CircularProgress } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useSelector, useDispatch } from "react-redux";

import { capitalize } from "../../utils";
import {
  selectEventsIds,
  selectEvents,
  fetchEvents,
} from "../events/eventsSlice";
import EventsList from "../events/EventsList";
import { useParams } from "react-router-dom";
import { url } from "../../utils";

export default function Artist() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const query = useParams();
  const { artist, status } = useSelector(selectEvents);
  const orderedEventsIds = useSelector(selectEventsIds);
  const capitalizedArtistName = capitalize(artist.name);
  const capitalizedQueryParam = capitalize(query.artist);
  const imgRef = useRef();

  const dispatch = useDispatch();

  const error = !artist || status === "failed";

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImgLoaded(true);
    }
  }, []);

  useEffect(() => {
    const eventsPath = query ? url(`${query.artist}/events`) + "&date=all" : "";
    if (
      query.artist &&
      query.artist?.toLowerCase() !== artist?.name?.toLowerCase()
    ) {
      dispatch(fetchEvents(eventsPath));
    }
  }, [query, dispatch, artist.name]);

  if (status === "idle") {
    return <></>;
  }

  return (
    <>
      {status === "loading" ? (
        <Box display="flex" justifyContent="center" alignItems="center" m={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box m={3}>
          <Typography component="div">
            <p>
              Could not find <b>{capitalizedQueryParam}</b>.
            </p>
            <p>Maybe we do not have this data, or wrong spelling.</p>
          </Typography>
        </Box>
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
                {imgLoaded ? null : (
                  <Skeleton variant="rect" width={200} height={200} />
                )}
                <Box
                  style={imgLoaded ? {} : { display: "none" }}
                  component="img"
                  ref={imgRef}
                  src={artist.image_url}
                  width={{ xs: "200px", sm: "320px" }}
                  onLoad={() => setImgLoaded(true)}
                />
              </Grid>
            </Grid>
            {orderedEventsIds.length > 0 ? (
              <Grid item xs sm={6}>
                <EventsList
                  eventsIds={orderedEventsIds}
                  artistName={artist.name}
                />
              </Grid>
            ) : (
              <Grid item>
                <Box m={3}>
                  <Typography>Did not find {capitalizedQueryParam},</Typography>

                  <Typography>
                    or any events for {capitalizedQueryParam}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )
      )}
    </>
  );
}
