import React, { useState } from "react";
import { TextField, IconButton, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function Search({ setSearchText }) {
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchText(value);
    } else if (e.type === "click") {
      setSearchText(value);
    }
  };
  return (
    <>
      <TextField
        required
        fullWidth
        label="Artist/Band"
        variant="outlined"
        placeholder="Enter Artist or Band name, e.g: Beyonce"
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                // className={classes.iconButton}
                aria-label="search"
                onClick={handleSearch}
              >
                <MusicNoteIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
