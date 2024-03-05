// export { SearchBar };

import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Container, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchCategoriesElements,
  getOptions,
  getSelectValue,
  getValue,
  search,
  setSelectValue,
} from "@/store";

export function SearchBar() {
  const dispatch = useDispatch();

  const options = useSelector(getOptions);

  const selectValue = useSelector(getSelectValue);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const value = useSelector(getValue);

  const handleChangeValue = (event) => {
    dispatch(search(event.target.value));
  };

  const handleSelect = (event) => {
    dispatch(setSelectValue(event.target.value));
    dispatch(fetchCategoriesElements(event.target.value));
  };

  console.log("select value", selectValue);

  return (
    <Container
      maxWidth="xl"
      style={{ marginTop: "100px", display: "flex", alignItems: "center" }}
    >
      <Stack
        direction={{ sm: "column", md: "row", lg: "row", xl: "row" }}
        width={"100%"}
        spacing={{ xs: 4, sm: 4, md: 3, lg : 3,  xl :3 }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ m: 1, flex: 1 }}
            placeholder="Search name"
            type="search"
            value={value}
            inputProps={{ "aria-label": "search name" }}
            onChange={handleChangeValue}
          />
        </Paper>
        <FormControl sx={{ m: 1, minWidth: 270, margin: 0 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectValue}
            onChange={handleSelect}
            autoWidth
            label="Category"
          >
            <MenuItem value="All category">
              <em>All category</em>
            </MenuItem>
            {options.map((item, i) => (
              <MenuItem value={item} key={i}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Container>
  );
}
