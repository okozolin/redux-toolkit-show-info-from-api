import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  xs: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
}));
export default function Header() {
  const classes = useStyles();
  return (
    <Box
      mb={4}
      py={3}
      display="flex"
      justifyContent="center"
      fontSize={36}
      fontFamily="Verdana, sans-serif"
      fontWeight="bold"
      color="white"
      bgcolor="rgba(51,153,204,1)"
      // bgcolor="#ef3172"
      textAlign="center"
      className={classes.xs}
    >
      Artist/Bands events info
    </Box>
  );
}
