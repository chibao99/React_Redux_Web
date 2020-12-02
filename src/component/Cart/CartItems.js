import React from "react";
import { Table, Button, Icon, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItems = ({ cart, update, deleteCart }) => {
  const removeAndUpdateCart = (product, quantity) => {
    if (quantity <= 0) {
      deleteCart(product);
      toast.warning("Xóa Giỏ Hàng Thành Công !!!")
    } else {
      update(product, quantity);
      toast.success("Cập nhật giở hàng thành công!!!")
    }
  };
  return (
    <Table.Row>
      <Table.Cell>
        <Image src={cart.product.image} size="tiny" />
      </Table.Cell>
      <Table.Cell>{cart.product.name}</Table.Cell>
      <Table.Cell>{cart.product.price} VNĐ</Table.Cell>
      <Table.Cell>
        <span className="qty" style={{ marginRight: "10px" }}>
          {cart.quantity}
        </span>
        <Button.Group>
          <Button
            onClick={() => removeAndUpdateCart(cart.product, cart.quantity - 1)}
            icon
          >
            <Icon name="minus circle" />
          </Button>
          <Button
            onClick={() => removeAndUpdateCart(cart.product, cart.quantity + 1)}
            icon
          >
            <Icon name="plus circle" />
          </Button>
        </Button.Group>
      </Table.Cell>
      <Table.Cell>{cart.product.price * cart.quantity} VNĐ</Table.Cell>
    </Table.Row>
  );
};

export default (CartItems);
