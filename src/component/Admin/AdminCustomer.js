import React, { useState } from "react";
import { Grid, Segment, Table, Button, Input, Icon } from "semantic-ui-react";
import request from "../../actions/agent";

const AdminCustomer = ({ users }) => {
  const [search, setSearch] = useState("");

  const getTextSearch = (e) => {
    setSearch(e.target.value);
  };
  let result = [];
  users.forEach((item) => {
    if (
      item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      item.phone.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
    ) {
      result.push(item);
    }
  });

  const editIconBlock = (block) => {
    if (block) {
      return <Icon name="lock" circular color="red" inverted />;
    } else {
      return <Icon name="unlock" color="green" inverted circular />;
    }
  };

  const editStatusBlock = async (blockStatus, id) => {
    let block = !blockStatus;
    const data = await request.put("/auth/blockuser", { block, id });
    if(data.msg){
      window.location.reload(false);
    }
  };

  const editButtonBlock = (block, id) => {
    if (block) {
      return (
        <Button onClick={() => editStatusBlock(block, id)} color="green">
          Bỏ Chặn
        </Button>
      );
    } else {
      return (
        <Button onClick={() => editStatusBlock(block, id)} color="red">
          Chặn
        </Button>
      );
    }
  };

  return (
    <Segment attached="bottom">
      <Grid.Column stretched width={13}>
        <Table textAlign="center" singleLine celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "70px" }}>STT</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "150px" }}>
                Tên
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "200px" }}>
                Email
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "120px" }}>
                Số Điện Thoại
              </Table.HeaderCell>
              <Table.HeaderCell>Địa Chỉ</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "100px" }}>
                Trạng Thái
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "150px" }}>
                Hành Động
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {result.map((u, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{u.name}</Table.Cell>
                  <Table.Cell>{u.email}</Table.Cell>
                  <Table.Cell>{u.phone}</Table.Cell>
                  <Table.Cell>{u.address + u.city + u.dis}</Table.Cell>
                  <Table.Cell>{editIconBlock(u.block)}</Table.Cell>
                  <Table.Cell>{editButtonBlock(u.block, u._id)}</Table.Cell>
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

export default AdminCustomer;
