import React from "react";
import { Grid, Button, Image, Header, Segment, Label } from "semantic-ui-react";
import { useDispatch,useSelector } from "react-redux";
import { addcart } from "../../actions/cart";
import { toast } from "react-toastify";

const Detail = ({ product }) => {

  document.title = "Chi Tiết Sản Phẩm";
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
  const discount = product.discount + "%";
  const price =
    product.discount === 0
      ? product.price
      : product.price - (product.price * product.discount) / 100;
  return (
    <Grid.Row>
      <Grid.Column>
        <Image
          fluid
          src={product.image}
          label={{ corner: "right", content: discount, color: "red" }}
        />
      </Grid.Column>
      <Grid.Column>
        <div style={{ paddingLeft: "80px" }}>
          <Header as="h1" content={product.name} />
          <Label tag color="red" size="medium">
            {formatMonney(price)} VND
          </Label>
          <Label tag color="orange">
            Số lượng hàng: {product.inventory}
          </Label>
          <h4>{product.desc}</h4>
          <Segment color="green" secondary>
            <Button
              onClick={() => {
                themGioHang(product);
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
