import React, { useState } from "react";
import {
  Grid,
  Segment,
  Table,
  Button,
  Label,
  Confirm,
  Input,
} from "semantic-ui-react";
import request from "../../actions/agent";
const AdminPayments = ({ checkouts }) => {
  let checkoutsPayment = checkouts.checkouts ? checkouts.checkouts : [];
  const edit = (name) => {
    if (name === false) {
      return (
        <Table.Cell>
          <Label color="red">Chưa Giao Hàng</Label>
        </Table.Cell>
      );
    } else {
      return (
        <Table.Cell>
          <Label color="green">Đã Giao Hàng</Label>
        </Table.Cell>
      );
    }
  };

  const [status, setstatus] = useState(false);

  const open = () => {
    setstatus(true);
  };

  const close = () => {
    setstatus(false);
  };

  const editB = (name, id) => {
    if (name === false) {
      return (
        <Table.Cell>
          <Button onClick={() => open()}>Xác Nhận</Button>
          <Confirm
            open={status}
            onCancel={() => close()}
            onConfirm={() => accessCheckout(id, status)}
            content="Xác nhận giao hàng ?"
            cancelButton="Hủy"
            confirmButton="Chấp Nhận"
          />
        </Table.Cell>
      );
    } else {
      return (
        <Table.Cell>
          <Button disabled>Xác Nhận</Button>
        </Table.Cell>
      );
    }
  };
  const accessCheckout = async (id, status) => {
    const body = { id, status };
    const data = await request.post("/checkout/accesscheckout", body);
    if (data) {
      window.location.reload(false);
    }
  };

  const [search, setSearch] = useState("");

  const getTextSearch = (e) => {
    setSearch(e.target.value);
  };

  let result = [];
  checkoutsPayment.forEach((item) => {
    if (
      item.user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      item.user.phone.toLowerCase().indexOf(search.toLowerCase()) !== -1
    ) {
      result.push(item);
    }
  });

  const getColonFormatDate = (date) => date.toString().slice(0, 10);

  const formatMonney = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  return (
    <Segment attached="bottom">
      <Grid.Column stretched width={13}>
        <Table textAlign="center" celled singleLine fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "70px" }}>STT</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "350px" }}>
                Địa Chỉ
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "100px" }}>
                Ngày Đặt
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "100px" }}>
                Tổng Tiền
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "150px" }}>
                Trạng Thái Giao Hàng
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "180px" }}>
                Tên và Sdt Khách Hàng
              </Table.HeaderCell>
              <Table.HeaderCell>Xác Nhận Giao Hàng</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {result.map((c, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{c.address}</Table.Cell>
                  <Table.Cell>{getColonFormatDate(c.date)}</Table.Cell>
                  <Table.Cell>{formatMonney(c.total)} VNĐ</Table.Cell>
                  {edit(c.status)}
                  <Table.Cell>
                    Tên: {c.user.name}
                    <br />
                    Số ĐT: {c.user.phone}
                  </Table.Cell>
                  {editB(c.status, c._id)}
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="6">
                <Input
                  type="text"
                  placeholder="Search..."
                  icon="search"
                  onChange={(e) => getTextSearch(e)}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Grid.Column>
    </Segment>
  );
};

export default AdminPayments;
