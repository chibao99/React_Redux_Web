import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
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
  const discount = product.discount + "%";
  const price =
    product.discount === 0
      ? product.price
      : product.price - (product.price * product.discount) / 100;
  return (
    <Grid.Column style={{ marginBottom: "40px" }}>
      <Link to={`/san-pham/chi-tiet/${product._id}`}>
        <Card color={randomColor()}>
          <Image
            size="medium"
            src={product.image}
            wrapped
            ui={false}
            label={{ corner: "right", content: discount, color: "red" }}
          />
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Meta style={{ textDecoration: "line-through" }}>
              {formatMonney(product.price)} VNĐ
            </Card.Meta>
            <Card.Description>{formatMonney(price)} VNĐ</Card.Description>
          </Card.Content>
        </Card>
      </Link>
    </Grid.Column>
  );
};

export default ProductItems;
