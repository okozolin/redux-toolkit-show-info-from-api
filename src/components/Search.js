import React, { useState } from "react";
import { TextField } from "@material-ui/core";

export default function Search({ setSearchText }) {
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchText(value);
      e.preventDefault();
    }
  };
  return (
    <div>
      <TextField
        label="Artist"
        variant="outlined"
        placeholder="Enter Artist name. e.g: Bionce"
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleSearch}
      />
    </div>
  );
}
