import React from "react";
import { Grid, Typography, Avatar, Box } from "@material-ui/core";

import { capitalize } from "../utils";
import { FONT_SIZE_15 } from "../constants/constants";
import { useSelector } from "react-redux";
import { artistSelector } from "../redux/artistSlice";
import { selectEventsIds } from "../redux/eventsSlice";
import EventsList from "./EventsList";

export default function Artist() {
  console.count("Artist");
  const { artist } = useSelector(artistSelector);
  const orderedEventsIds = useSelector(selectEventsIds);
  const capitalizedArtistName = capitalize(artist.name);
  return (
    <>
      <Box bgcolor="#ec15c09c">
        <Grid container justify="flex-start" alignItems="center" spacing={3}>
          <Grid item>
            <Avatar
              alt="Artist/Band avatar"
              src={artist.thumb_url}
              size={FONT_SIZE_15} // 74px
            >
              {/* if picture file does not exist use alternative avatar with name initials */}
              {/* {getNameInitials(artist.PersonName)} */}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography>{capitalizedArtistName}</Typography>
          </Grid>
        </Grid>
      </Box>
      {orderedEventsIds.length > 0 ? (
        <EventsList eventsIds={orderedEventsIds} artistName={artist.name} />
      ) : (
        <Box m={3}>
          <Typography>
            Did not find any events for {capitalizedArtistName}
          </Typography>
        </Box>
      )}
    </>
  );
}
