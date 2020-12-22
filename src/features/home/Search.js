import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, IconButton } from "@material-ui/core";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import {
  searchUpdated,
  searchCleared,
  searchSelector,
} from "../home/searchSlice";

export default function Search() {
  const { value: searchValue } = useSelector(searchSelector);
  const [value, setValue] = useState(searchValue);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(searchUpdated(value));
      history.push(`/${value}`);
    } else if (e.type === "click") {
      dispatch(searchUpdated(value));
      history.push(`/${value}`);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    dispatch(searchCleared());
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
