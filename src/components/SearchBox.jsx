import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SearchBox = ({term , setTerm}) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField value={term || ''} onChange={(e)=>{setTerm(e.target.value)}} id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>
  );
};

export default SearchBox;
