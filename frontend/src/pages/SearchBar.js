import { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value.toLowerCase());
  };

  return (
    <Box
      className="App"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        mt: 3,
      }}
    >
      <form style={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="search-bar"
          className="text"
          onInput={handleInput}
          label="Search for Restaurant or dish"
          variant="outlined"
          placeholder="Search..."
          size="small"
          fullWidth
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </form>
    </Box>
  );
};

export default SearchBar;
