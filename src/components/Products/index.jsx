import React, { useEffect, useState } from "react";
import { StyledProducts } from "./styled";
import { ProductCard } from "@/components";
import { Container, Grid, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  getPageProducts,
  getPage,
  getAllProducts,
} from "@/store";

export const Products = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());

    dispatch(getPage(1));
  }, []);

  const data = useSelector(getPageProducts);

  const dataAll = useSelector(getAllProducts);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getPage(newPage));
  };

  return (
    <StyledProducts>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {data?.map((elm) => (
            <Grid item xs={3} key={elm.id}>
              <>
                <ProductCard elm={elm} />
              </>
            </Grid>
          ))}
        </Grid>
        {data?.length > 9 && (
          <Pagination
            className="pagination"
            variant="outlined"
            shape="rounded"
            count={2}
            page={page} // Adjust index for display purposes
            onChange={handleChangePage}
            color="primary"
          />
        )}
      </Container>
    </StyledProducts>
  );
};
