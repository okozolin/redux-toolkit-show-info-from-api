import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, IconButton } from "@material-ui/core";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function Search() {
  const [value, setValue] = useState("");

  let history = useHistory();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      history.push(`/${value}`);
    } else if (e.type === "click") {
      history.push(`/${value}`);
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
              <IconButton aria-label="search" onClick={handleSearch}>
                <MusicNoteIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
