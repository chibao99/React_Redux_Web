import React, { useEffect } from "react";
import { Grid, Header } from "semantic-ui-react";
import ProductRelation from "./ProductRelation";
import { useSelector, useDispatch } from "react-redux";
import Detail from "./Detail";
import Comment from "../Comment/CommentProduct";
import { getCommentByProductID } from "../../actions/comment";

const ProductDetail = ({ match }) => {
  //state redux
  const products = useSelector((state) => state.product.products);
  //dispatch
  const dispatch = useDispatch();
  const { id } = match.params;
  let dem = 0;
  useEffect(() => {
    dispatch(getCommentByProductID(id));
  }, []);
  const comment = useSelector((state) => state.comment);
  return (
    <div>
      <Grid columns={2} stackable>
        {products.map((product, index) => {
          if (product._id === id) {
            return <Detail key={index} product={product} />;
          }
        })}
      </Grid>
      <Comment comment={comment} idP={id} />
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

export default ProductDetail;
