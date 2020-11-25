import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Box } from "@material-ui/core";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <Box m={4} display="flex" justifyContent="center">
      <Typography variant="h3" color="primary">
        Artist and Bands events info
      </Typography>
      <Box>
        <Link to="/">Home</Link>
      </Box>
    </Box>
  );
};

export default Navbar;
