import React from "react";
import { Grid, Button, Image, Header, Segment, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useDispatch } from "react-redux";
import { addcart } from "../../actions/cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Detail = ({ product }) => {
  //dispatch
  const dispatch = useDispatch();
  const themGioHang = (product) => {
    if (product.inventory <= 0) {
      toast.success("Mặt hàng này sắp hết vui lòng order");
    } else {
      dispatch(addcart(product, 1));
      toast.success("👍Đặt hàng thành công!!!");
    }
  };
  const formatMonney = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return (
    <Grid.Row>
      <Grid.Column>
        <Image size="huge" src={product.image} />
      </Grid.Column>
      <Grid.Column>
        <div style={{ paddingLeft: "80px" }}>
          <Header as="h1" content={product.name} />
          <Label tag color="red" size="medium">
            {formatMonney(product.price)} VND
          </Label>
          <Label tag color="orange">
            Số lượng hàng: {product.inventory}
          </Label>
          <h4>{product.desc}</h4>
          <Segment color="green" secondary>
            <Button
              onClick={() => {
                themGioHang(product, 1);
              }}
              color="teal"
              fluid
            >
              Mua Hàng
            </Button>
          </Segment>
        </div>
      </Grid.Column>
    </Grid.Row>
  );
};

export default Detail;
