import React, { useEffect, useState } from "react";
import {
  Grid,
  Header,
  Segment,
  Button,
  Icon,
  Item,
  Form,
  Message,
  Modal,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getCheckout } from "../../actions/checkout";
import quan from "./Address/quan_huyen.json";
import tinh from "./Address/tinh_tp.json";
import request from "../../actions/agent";
import { toast } from "react-toastify";
const Profile = () => {
  //state redux
  const user = useSelector((state) => state.auth.user);
  const checkouts = useSelector((state) => state.checkout.checkouts);
  //dispatch
  const dispatch = useDispatch();

  const [status, setStatus] = useState(false);
  const [pass, setpass] = useState(false);
  const changeStatus = () => {
    setStatus(!status);
  };
  const formatMonney = (num) =>
    num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  useEffect(() => {
    dispatch(getCheckout());
    document.title = "Trang Cá Nhân";
  }, [getCheckout]);

  const display = () => {
    if (user) {
      return (
        <Item>
          <Item.Image src={user.avatar} className="ui image circular avatar" />
          <Item.Content>
            <Item.Header>Tên: {user.name}</Item.Header>
            <Item.Description>
              Địa Chỉ: {user.address},{user.dis}, {user.city}
            </Item.Description>
            <Item.Description>Số Điện Thoại: {user.phone}</Item.Description>
            <Item.Extra>
              <Button.Group>
                <Button
                  negative
                  icon
                  floated="right"
                  labelPosition="left"
                  onClick={() => {
                    changeStatus();
                  }}
                >
                  Sửa Thông Tin
                  <Icon name="users" />
                </Button>
                <Button.Or />
                <Button
                  positive
                  icon
                  floated="right"
                  labelPosition="right"
                  onClick={() => changePass()}
                >
                  Đổi Mật Khẩu
                  <Icon name="unlock alternate" />
                </Button>
              </Button.Group>
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    }
  };

  const displayCheckout = () => {
    if (checkouts) {
      return checkouts.map((checkout, index) => {
        return (
          <Segment key={index}>
            {checkout.cthd.map((ch, index) => {
              return (
                <Segment color="yellow" key={index}>
                  <Grid columns="3">
                    <Grid.Row>
                      <Grid.Column>
                        <p>{ch.product.name}</p>
                      </Grid.Column>
                      <Grid.Column>
                        <p>{ch.quantity}</p>
                      </Grid.Column>
                      <Grid.Column>
                        <p>{ch.product.price}</p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              );
            })}
            <Header
              as="h4"
              content={
                "Tổng tiền cho hóa đơn này " + formatMonney(checkout.total)
              }
            />
          </Segment>
        );
      });
    }
  };

  const [form, setform] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    dis: user.dis,
    city: user.city,
  });
  const { name, email, phone, address, dis, city } = form;

  const isChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const getTinh = (tinh) => {
    var result = [];
    for (var t in tinh) {
      result.push(tinh[t].name);
    }
    return result;
  };

  const getQuan = (name) => {
    let result = [];
    for (var t in tinh) {
      for (var q in quan) {
        if (tinh[t].name === name) {
          if (quan[q].parent_code === tinh[t].code) {
            result.push(quan[q].name_with_type);
          }
        }
      }
    }
    return result;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await request.put("/users/editprofile", form);
      if (data.msg) {
        setStatus(!status);
        toast.success("Cập nhật thành công");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((er) => {
          toast.warning(er.msg);
        });
      }
    }
  };
  const changePass = () => {
    setpass(!pass);
  };
  const [formPass, setformPass] = useState({
    passwordOld: "",
    passwordNew: "",
    passwordNewLast: "",
  });
  const { passwordNew, passwordNewLast, passwordOld } = formPass;
  const isChangepass = (e) => {
    setformPass({ ...formPass, [e.target.name]: e.target.value });
  };
  const onsubmitpass = async (e) => {
    e.preventDefault();
    try {
      if (passwordNew !== passwordNewLast) {
        toast.error("Mat khau moi khong khop");
      } else {
        let data = await request.post("/users/changePass", {
          passwordOld,
          passwordNew,
        });
        if (data.msg) {
          localStorage.getItem("token");
          window.location.reload(false);
        }
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((er) => {
          toast.warning(er.msg);
        });
      }
    }
  };
  const displayFormChangePass = () => {
    if (pass) {
      return (
        <Form
          onSubmit={(e) => {
            onsubmitpass(e);
          }}
        >
          <Segment color="red">
            <Form.Input
              fluid
              icon="lock"
              type="password"
              iconPosition="left"
              name="passwordOld"
              value={passwordOld}
              placeholder="Nhập mật khẩu cũ"
              onChange={(e) => isChangepass(e)}
            />
            <Form.Input
              fluid
              icon="lock"
              type="password"
              iconPosition="left"
              name="passwordNew"
              value={passwordNew}
              placeholder="Nhập mật khẩu mới"
              onChange={(e) => isChangepass(e)}
            />
            <Form.Input
              fluid
              icon="lock"
              type="password"
              iconPosition="left"
              name="passwordNewLast"
              value={passwordNewLast}
              placeholder="Nhập lại mật khẩu mới"
              onChange={(e) => isChangepass(e)}
            />
            <Button fluid type="submit" color="linkedin">
              Cập Nhật
            </Button>
          </Segment>
        </Form>
      );
    }
  };
  const displayForm = () => {
    if (status) {
      return (
        <div>
          <Form size="large" onSubmit={(e) => onSubmit(e)}>
            <Segment stacked color="grey">
              <Form.Input
                fluid
                icon="male"
                placeholder="Nhập họ và tên"
                iconPosition="left"
                type="text"
                name="name"
                value={name}
                onChange={(e) => isChange(e)}
              />
              <Form.Input
                fluid
                icon="mail"
                placeholder="Nhập email"
                iconPosition="left"
                type="email"
                name="email"
                value={email}
                onChange={(e) => isChange(e)}
              />
              <Form.Input
                fluid
                icon="phone"
                placeholder="Nhập số điện thoại"
                iconPosition="left"
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => isChange(e)}
              />
              <Form.Input
                fluid
                icon="address card outline"
                placeholder="Nhập số nhà"
                iconPosition="left"
                type="text"
                name="address"
                value={address}
                onChange={(e) => isChange(e)}
              />
              <Form.Group widths="equal">
                <Form.Field>
                  <select
                    name="city"
                    value={city}
                    onChange={(e) => isChange(e)}
                  >
                    <option disabled selected value="">
                      Chọn Tỉnh
                    </option>
                    {getTinh(tinh).map((t, index) => {
                      return <option key={index}>{t}</option>;
                    })}
                  </select>
                </Form.Field>
                <Form.Field>
                  <select name="dis" value={dis} onChange={(e) => isChange(e)}>
                    <option disabled selected value="">
                      Chọn Quận Huyện
                    </option>
                    {getQuan(city).map((q, index) => {
                      return <option key={index}>{q}</option>;
                    })}
                  </select>
                </Form.Field>
              </Form.Group>
              <Button type="submit" color="teal" fluid>
                Cập Nhật
              </Button>
            </Segment>
          </Form>
        </div>
      );
    }
  };

  return (
    <Grid columns={2} stackable>
      <Grid.Row>
        <Grid.Column>
          <Segment secondary color="pink">
            <Header
              content="Thông Tin Của Bạn"
              textAlign="center"
              as="h3"
              color="green"
            />
            {display()}
          </Segment>
          <Modal size="small" open={status} onClose={() => changeStatus()}>
            <Modal.Header>Cập Nhật Thông Tin Cá Nhân</Modal.Header>
            <Modal.Content>{displayForm()}</Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => changeStatus()}>
                Hủy
              </Button>
            </Modal.Actions>
          </Modal>
          <Modal size="small" open={pass} onClose={() => changePass()}>
            <Modal.Header>Thay Đổi Mật Khẩu</Modal.Header>
            <Modal.Content>{displayFormChangePass()}</Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => changePass()}>
                Hủy
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
        <Grid.Column>
          <Segment secondary color="pink">
            <Header
              content="Các Hóa Đơn Bạn Đã Mua"
              as="h3"
              color="pink"
              textAlign="center"
            />
            <Segment color="teal">
              <Grid columns="3">
                <Grid.Row>
                  <Grid.Column>
                    <p>Tên Sản Phẩm</p>
                  </Grid.Column>
                  <Grid.Column>
                    <p>Số Lượng</p>
                  </Grid.Column>
                  <Grid.Column>
                    <p>Tiền</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            {displayCheckout()}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Profile;
