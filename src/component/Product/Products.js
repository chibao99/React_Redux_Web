import React, { useState, useEffect } from "react";
import { Grid, Container, Input } from "semantic-ui-react";
import ProductItems from "./ProductItems";
import { useSelector } from "react-redux";

const Products = () => {
  //state redux
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    document.title = "Sản Phẩm";
  }, []);
  const [search, setsearch] = useState("");
  const isChange = (e) => {
    setsearch(e.target.value);
  };

  let result = [];

  products.forEach((item) => {
    if (
      item.name.toLowerCase().indexOf(search) !== -1 ||
      item.price.indexOf(search) !== -1
    ) {
      result.push(item);
    }
  });

  return (
    <Container>
      <Input
        size="large"
        loading
        placeholder="Search..."
        style={{ marginBottom: "20px" }}
        onChange={(e) => isChange(e)}
      />
      <Grid columns={4} stackable>
        <Grid.Row>
          {result.map((product, index) => {
            return <ProductItems key={index} product={product} />;
          })}
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Products;
