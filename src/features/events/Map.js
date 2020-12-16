import React from "react";
import { Card, CardMedia } from "@material-ui/core";

export default function Map({ lat, lon }) {
  const url = `https://www.google.com/maps?q=${lat},${lon}&amp;z=15&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div style={{ width: "100%" }}>
      <Card>
        <CardMedia
          component="iframe"
          width="100%"
          height="528"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={url}
        />
      </Card>
    </div>
  );
}
