import React, { useState } from "react";
import { TextField } from "@material-ui/core";

export default function Search({ setSearchText }) {
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchText(value);
    }
  };
  return (
    <div>
      <TextField
        required
        fullWidth
        label="Artist"
        variant="outlined"
        placeholder="Enter Artist name. e.g: Beyonce"
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleSearch}
      />
    </div>
  );
}
