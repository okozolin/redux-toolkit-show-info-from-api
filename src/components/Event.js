import React from "react";
import { Typography, Paper, Box } from "@material-ui/core";
import { useParams } from "react-router-dom";

export default function Event() {
  const { id } = useParams();
  return (
    <div>
      <Box m={3}>event meta data id: {id}</Box>
      <Box m={3}>venu information</Box>
      <Box m={3}>special offers</Box>
      <Box m={3}>venu map</Box>
    </div>
  );
}
