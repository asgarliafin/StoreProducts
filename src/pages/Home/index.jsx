import React from "react";
import { StyledHome } from "./styled";
import { Products, SearchBar } from "@/components";


const Home = () => {
 

  return (
    <StyledHome>
      <SearchBar />
      
      <Products />
    </StyledHome>
  );
};

export { Home };
