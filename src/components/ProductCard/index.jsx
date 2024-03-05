import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,
  Stack,
} from "@mui/material";
import { StyledProductCard } from "./styled";
import { Link } from "react-router-dom";

function ProductCard({ elm }) {
  const { image, title, description, rating, id } = elm;
  return (
    <StyledProductCard>
      <Link to={`/project/${id}`}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="250"
          image={image}
          className="image"
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title.slice(0, 10)}
        </Typography>
        <Typography
          variant="body2"
          className="description"
          color="text.secondary"
        >
          {description}
        </Typography>
        <Stack
          className="stack"
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Rating
            name="read-only"
            className="rating"
            value={rating.rate}
            readOnly
          />
          <Typography l sx={{ mr: "auto", fontSize: 18 }}>
            5.990€{" "}
          </Typography>
        </Stack>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </StyledProductCard>
  );
}

export { ProductCard };
