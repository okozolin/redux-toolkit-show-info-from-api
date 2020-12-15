import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, IconButton } from "@material-ui/core";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";
import { ClearContext } from "../../app/context";

export default function Search() {
  // const [value, setValue] = useState("");
  const { value, setValue } = useContext(ClearContext);

  let history = useHistory();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      history.push(`/${value}`);
    } else if (e.type === "click") {
      history.push(`/${value}`);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <>
      <TextField
        required
        fullWidth
        label="Artist/Band"
        variant="outlined"
        value={value}
        placeholder="Enter Artist or Band name, e.g: Beyonce"
        onChange={handleChange}
        onKeyPress={handleSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="search" onClick={handleClear}>
                <CloseIcon />
              </IconButton>
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
