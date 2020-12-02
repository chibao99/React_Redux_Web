import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Grid,
  Segment,
  Table,
  Image,
  Button,
  Form,
  Icon,
  Input,
  Modal,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import request from "../../actions/agent";
import { toast } from "react-toastify";
import { fetch_data_all } from "../../actions/product";
const AdminProducts = ({ products }) => {
  const catalogs = useSelector((state) => state.catalog.catalog);
  const dispatch = useDispatch();
  const [form, setform] = useState({
    id: "",
    name: "",
    image: "",
    price: "",
    inventory: "",
    desc: "",
    catalog: "",
    nameButton: "Thêm Sản Phẩm",
  });
  const { name, price, inventory, desc, id, image, catalog } = form;

  const isChange = (e) => {
    switch (e.target.name) {
      case "image":
        setform({ [e.target.name]: e.target.files[0] });
        break;
      default:
        setform({ ...form, [e.target.name]: e.target.value });
    }
  };

  const [status, setstatus] = useState(false);
  const removeProduct = async (id) => {
    const data = await request.delete(`/products/${id}`);
    if (data.msg) {
      window.location.reload(false);
    }
  };
  const changeStatus = () => {
    setstatus(!status);
    setform({
      id: "",
      name: "",
      price: "",
      inventory: "",
      desc: "",
      nameButton: "Thêm Sản Phẩm",
    });
  };

  const update = (p) => {
    setstatus(!status);
    setform({
      catalog: p.catalog,
      id: p._id,
      name: p.name,
      price: p.price,
      inventory: p.inventory,
      desc: p.desc,
      nameButton: "Cập Nhật",
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let formd = new FormData();
    formd.append("name", name);
    formd.append("price", price);
    formd.append("inventory", inventory);
    formd.append("desc", desc);
    formd.append("image", image);
    formd.append("catalog", catalog);
    if (id) {
      try {
        const data = await request.put(`/products/edit/${id}`, formd);
        if (data.msg) {
          window.location.reload(false);
        }
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((er) => {
            toast.error(er.msg);
          });
        }
      }
    } else {
      try {
        const data = await request.post("/products", formd);
        if (data.msg) {
          dispatch(fetch_data_all);
          setstatus(false);
        }
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((er) => {
            toast.error(er.msg);
          });
        }
      }
    }
  };

  const displayForm = () => {
    if (status) {
      return (
        <Segment color="grey" style={{ width: "500px" }}>
          <Form onSubmit={(e) => submitForm(e)}>
            <Form.Input
              fluid
              type="file"
              name="image"
              // value={image}
              onChange={(e) => isChange(e)}
            />
            <Form.Field>
              <select
                name="catalog"
                value={catalog}
                onChange={(e) => isChange(e)}
              >
                <option value="" selected disabled>
                  Loại sản phẩm
                </option>
                {catalogs.map((c, i) => {
                  return (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </Form.Field>
            <Form.Input
              fluid
              type="text"
              name="name"
              value={name}
              placeholder="Nhập tên sản phẩm"
              onChange={(e) => isChange(e)}
            />

            <Form.Input
              fluid
              type="number"
              name="price"
              value={price}
              placeholder="Nhập giá sản phẩm"
              onChange={(e) => isChange(e)}
            />
            <Form.Input
              fluid
              type="number"
              name="inventory"
              value={inventory}
              placeholder="Nhập số lượng sản phẩm"
              onChange={(e) => isChange(e)}
            />
            <Form.TextArea
              fluid
              type="text"
              name="desc"
              value={desc}
              placeholder="Nhập mô tả sản phẩm"
              onChange={(e) => isChange(e)}
            />
            <Button type="submit" color="google plus" fluid>
              {form.nameButton}
            </Button>
          </Form>
        </Segment>
      );
    }
  };

  const [search, setSearch] = useState("");

  const getTextSearch = (e) => {
    setSearch(e.target.value);
  };
  let result = [];
  products.forEach((item) => {
    if (
      item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      item.price.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
    ) {
      result.push(item);
    }
  });

  const formatMonney = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  return (
    <Segment attached="bottom">
      <Grid.Column stretched width={13}>
        <Table textAlign="center" celled singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "70px" }}>STT</Table.HeaderCell>
              <Table.HeaderCell>Hình</Table.HeaderCell>
              <Table.HeaderCell>Tên Sản Phẩm</Table.HeaderCell>
              <Table.HeaderCell>Số Lượng Tồn</Table.HeaderCell>
              <Table.HeaderCell>Giá</Table.HeaderCell>
              <Table.HeaderCell>Mô Tả</Table.HeaderCell>
              <Table.HeaderCell>Hành Động</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {result.map((p, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    <Image src={p.image} size="tiny" />
                  </Table.Cell>
                  <Table.Cell>{p.name}</Table.Cell>
                  <Table.Cell>{p.inventory}</Table.Cell>
                  <Table.Cell>{formatMonney(p.price)} VNĐ</Table.Cell>
                  <Table.Cell>{p.desc}</Table.Cell>
                  <Table.Cell>
                    <Button.Group>
                      <Button
                        onClick={() => {
                          removeProduct(p._id);
                        }}
                      >
                        Xóa
                      </Button>
                      <Button.Or />
                      <Button onClick={() => update(p)} positive>
                        Cập Nhật
                      </Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="7">
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  onClick={() => changeStatus()}
                >
                  <Icon name="add" /> Thêm Sản Phẩm
                </Button>
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
      <br />
      <br />
      <Modal
        open={status}
        onClose={() => setstatus(false)}
        onOpen={() => setstatus(true)}
        size="tiny"
        dimmer="inverted"
      >
        <Modal.Header>Thêm Sản Phẩm </Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>{displayForm()}</Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setstatus(false)} color="red">
            Hủy <Icon name="close" />
          </Button>
        </Modal.Actions>
      </Modal>
    </Segment>
  );
};

export default AdminProducts;