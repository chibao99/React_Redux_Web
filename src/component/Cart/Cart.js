import React from "react";
import { Table, Header, Button, Segment, Icon } from "semantic-ui-react";
import CartItems from "./CartItems";
import CartResult from "./CartResult";
import { useDispatch, useSelector } from "react-redux";
import { updatecart, deletecart } from "../../actions/cart";
import { Link } from "react-router-dom";
const Cart = () => {
  //state redux
  const cart = useSelector((state) => state.cart);
  //dispatch
  const dispatch = useDispatch();
  const update = (product, quantity) => dispatch(updatecart(product, quantity));
  const deleteCart = (product) => dispatch(deletecart(product));
  let data = JSON.parse(localStorage.getItem("cartReducers"))
    ? JSON.parse(localStorage.getItem("cartReducers"))
    : [];
  document.title = "Giỏ Hàng";
  const display = () => {
    if (cart.length > 0) {
      return (
        <Table color="orange" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Hình Ảnh</Table.HeaderCell>
              <Table.HeaderCell>Sản Phẩm</Table.HeaderCell>
              <Table.HeaderCell>Giá</Table.HeaderCell>
              <Table.HeaderCell>Số Lượng</Table.HeaderCell>
              <Table.HeaderCell>Tổng Cộng</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((product, index) => {
              return (
                <CartItems
                  key={index}
                  cart={product}
                  update={update}
                  deleteCart={deleteCart}
                />
              );
            })}
          </Table.Body>
          <Table.Footer fullWidth>
            <CartResult />
          </Table.Footer>
        </Table>
      );
    } else {
      return (
        <Segment placeholder color="black">
          <Header icon color="purple" as="h2">
            <Icon name="plus cart" color="red" />
            Giỏ Hàng Của Bạn Đang Rỗng
          </Header>
          <Link to="/san-pham">
            <Button color="olive" content="Quay Lại Mua Hàng" size="large" />
          </Link>
        </Segment>
      );
    }
  };
  return <div>{display()}</div>;
};

export default Cart;
