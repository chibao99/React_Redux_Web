import React from "react";
import { Grid, Image, Header, Segment, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../../actions/checkout";
import { edit_inventory } from "../../actions/product";
import { useHistory } from "react-router-dom";
import { deleteAllCart } from "../../actions/cart";
import { toast } from "react-toastify";

const Checkout = () => {
  //state redux
  const cart = useSelector((state) => state.cart);
  const user1 = useSelector((state) => state.auth.user);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  //dispatch
  const dispatch = useDispatch();
  const totalCart = (cart) => {
    let result = 0;
    cart.forEach((cart) => {
      result +=
        cart.product.discount === 0
          ? cart.product.price * cart.quantity
          : (cart.product.price -
              (cart.product.price * cart.product.discount) / 100) *
            cart.quantity;
    });
    return result;
  };

  let address = `${user1.address}, ${user1.dis}, ${user1.city}`;

  const history = useHistory();

  if (isAdmin) {
    history.replace("/san-pham");
  }

  const total = totalCart(cart);
  const paymentOrder = () => {
    let user = user1._id;
    let cthd = [];
    cart.forEach((e) => {
      let product = e.product._id;
      let quantity = e.quantity;
      dispatch(edit_inventory({ quantity }, product));
      cthd.push({ product, quantity });
    });
    dispatch(payment({ hd: { user, cthd, address, total } }));
    localStorage.removeItem("cartReducers");
    dispatch(deleteAllCart());
    toast.info("Bạn đã đặt hàng thành công");
    history.replace("/gio-hang");
  };
  const display = () => {
    if (user1) {
      return (
        <div>
          <p>Tên: {user1.name}</p>
          <p>
            Địa Chỉ: {user1.address},{user1.dis}, {user1.city}
          </p>
          <p>Số Điện Thoại: {user1.phone}</p>
        </div>
      );
    }
  };
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Header
            color="olive"
            as="h2"
            content="Địa chỉ giao hàng"
            textAlign="center"
          />
          <Segment color="purple">
            {display()}
            <Button
              onClick={() => paymentOrder()}
              color="instagram"
              style={{ marginTop: "10px" }}
            >
              Gửi tới địa chỉ này
            </Button>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Header
            color="olive"
            as="h2"
            content="Hàng bạn muốn mua"
            textAlign="center"
          />
          <Segment color="grey">
            {cart.map((cart, index) => {
              const price =
                cart.product.discount === 0
                  ? cart.product.price
                  : cart.product.price -
                    (cart.product.price * cart.product.discount) / 100;
              return (
                <Grid key={index} columns={3}>
                  <Grid.Row>
                    <Grid.Column>
                      <Image src={cart.product.image} size="tiny" />
                    </Grid.Column>
                    <Grid.Column>
                      <p>{cart.product.name}</p>
                    </Grid.Column>
                    <Grid.Column>
                      <p>{price} VNĐ</p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              );
            })}
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>Tổng Tiền </Grid.Column>
                <Grid.Column>{totalCart(cart)} VNĐ </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Checkout;
