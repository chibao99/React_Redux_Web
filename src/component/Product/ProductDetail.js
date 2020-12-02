import React from "react";
import { Grid, Header } from "semantic-ui-react";
import ProductRelation from "./ProductRelation";
import { useSelector } from "react-redux";
import Detail from "./Detail";

const ProductDetail = ({ match }) => {
  //state redux
  const products = useSelector(state => state.product.products,);
  //dispatch
  const { id } = match.params;
  let dem = 0;

  return (
    <div>
      <Grid columns={2} stackable>
        {products.map((product, index) => {
          if (product._id === id) {
            return <Detail key={index} product={product} />;
          }
        })}
      </Grid>
      <Header
        textAlign="center"
        color="olive"
        as="h1"
        content="Các Sản Phẩm Liên Quan"
      />
      <Grid columns={4} stackable>
        {products.map((product, index) => {
          if (dem < 4) {
            dem++;
            if (product._id !== id) {
              return <ProductRelation key={index} product={product} />;
            }
          }
        })}
      </Grid>
    </div>
  );
};



export default (ProductDetail);
