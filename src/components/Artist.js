import React from "react";
import { Grid, Typography, Avatar, Paper } from "@material-ui/core";
import { capitalize } from "../utils";
import { FONT_SIZE_15 } from "../constants";
import EventItem from "./EventItem";

export default function Artist({ data, events }) {
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
