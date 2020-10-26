import React from "react";
import { Grid, Typography, Avatar, Paper } from "@material-ui/core";
import { capitalize } from "../utils";
import { FONT_SIZE_15 } from "../constants";
import EventItem from "./EventItem";
import { useSelector } from "react-redux";
import { artistSelector } from "../redux/artistSlice";
import { eventsSelector } from "../redux/eventsSlice";

export default function Artist() {
  const { artist: data } = useSelector(artistSelector);
  const { events } = useSelector(eventsSelector);

  return (
    <>
      <Paper elevation={1}>
        <Grid container justify="flex-start" alignItems="center" spacing={3}>
          <Grid item>
            <Avatar
              alt="Artist/Band avatar"
              src={data.thumb_url}
              size={FONT_SIZE_15} // 74px
            >
              {/* if picture file does not exist use alternative avatar with name initials */}
              {/* {getNameInitials(data.PersonName)} */}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography>{capitalize(data.name)}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {events && events.map((item) => <EventItem key={item.id} event={item} />)}
    </>
  );
}
