import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    return () => {
      setProduct(null);
    };
  }, [id]);

  console.log("product", product);

  return (
    <div style={{ paddingBlock: "100px" }}>
      <Container>
        {product ? (
          <Card>
            <CardMedia
              image={product.image}
              title={product.title}
              sx={{ height: "500px", backgroundPosition: "top" }}
            />
            <CardContent>
              <Typography variant="h5" component="h1">
                {product.title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {product.description}
              </Typography>
              <Typography variant="h6" color="textPrimary">
                Price: ${product.price}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Category: {product.category}
              </Typography>
            </CardContent>
            <CardActions>
              <Button href="/" size="small" variant="outlined">
                Back to
              </Button>
            </CardActions>
          </Card>
        ) : (
          <CircularProgress size={"small"} color="secondary" />
        )}
      </Container>
    </div>
  );
};

export { Details };
