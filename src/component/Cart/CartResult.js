import React from "react";
import { Table, Button, Responsive } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const CartResult = () => {
  //state redux
  const cart = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const total = () => {
    let result = 0;
    cart.forEach((cart) => {
      result +=
        cart.product.discount === 0
          ? cart.product.price * cart.quantity
          : (cart.product.price -
            (cart.product.price * cart.product.discount) / 100)*cart.quantity;
    });
    return result;
  };
  let history = useHistory();
  const chuyenhuong = () => {
    if (isAuthenticated) {
      return history.push("/thanh-toan");
    } else {
      return history.push("/dang-nhap");
    }
  };
  return (
    <Table.Row>
      <Table.HeaderCell>Tổng Cộng</Table.HeaderCell>
      <Table.HeaderCell>{total()} VNĐ</Table.HeaderCell>
      <Table.HeaderCell colSpan="3">
        <Button.Group>
          <Link to="/san-pham">
            <Responsive
              {...Responsive.onlyMobile}
              as={Button}
              content="Tiếp Tục Mua Hàng"
              icon="arrow left"
              primary
              labelPosition="left"
            />
            <Responsive
              as={Button}
              content="Tiếp Tục Mua Hàng"
              icon="arrow left"
              labelPosition="left"
              primary
              minWidth={Responsive.onlyTablet.minWidth}
            />
          </Link>
          <Responsive
            {...Responsive.onlyMobile}
            as={Button}
            content="Thanh Toán Hóa Đơn"
            icon="arrow right"
            labelPosition="right"
            positive
            onClick={() => chuyenhuong()}
          />
          <Responsive
            as={Button}
            content="Thanh Toán Hóa Đơn"
            icon="arrow right"
            labelPosition="right"
            positive
            onClick={() => chuyenhuong()}
            minWidth={Responsive.onlyTablet.minWidth}
          />
        </Button.Group>
      </Table.HeaderCell>
    </Table.Row>
  );
};

export default CartResult;
