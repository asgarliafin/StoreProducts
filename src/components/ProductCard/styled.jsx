import * as React from "react";
import { Box, Card, styled } from "@mui/material";

export const StyledProductCard = styled(Card)({
  ".image": {
    objectFit: "cover",
    objectPosition: "top",
  },

  ".description": {
    overflow: "hidden",
    display: "-webkit-box",
    " -webkit-line-clamp": "4" /* number of lines to show */,
    lineClamp: "4",
    " -webkit-box-orient": "vertical",
    minHeight: "80px",
  },

  ".stack": {
    marginTop: 20,

    ".MuiTypography-root": {
      margin: 0,
    },

    ".rating": {
      cursor: "pointer",
    },
  },
});
