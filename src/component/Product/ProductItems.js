import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
const ProductItems = ({ product }) => {
  const randomColor = () => {
    let color = [
      "olive",
      "red",
      "yellow",
      "orange",
      "green",
      "teal",
      "blue",
      "violet",
      "purple",
      "pink",
      "brown",
      "grey",
      "black",
    ];
    return color[Math.floor(Math.random() * 14)];
  };
  const formatMonney = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return (
    <Grid.Column style={{ marginBottom: "40px" }}>
      <Link to={`/san-pham/chi-tiet/${product._id}`}>
        <Card color={randomColor()}>
          <Image size="medium" src={product.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Description>
              {formatMonney(product.price)} VNĐ
            </Card.Description>
          </Card.Content>
        </Card>
      </Link>
    </Grid.Column>
  );
};

export default ProductItems;
