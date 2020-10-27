import React from "react";
import { Typography, Box } from "@material-ui/core";

export default function Header() {
  return (
    <Box m={3}>
      <Typography variant="h3" color="primary">
        Who's in town
      </Typography>
    </Box>
  );
}
