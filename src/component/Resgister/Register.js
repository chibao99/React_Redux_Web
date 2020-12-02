import React, { useState } from "react";
import {
  Grid,
  Header,
  Form,
  Segment,
  Message,
  Button,
  Icon,
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";
import { toast } from "react-toastify";
import quan from "./Address/quan_huyen.json";
import tinh from "./Address/tinh_tp.json";
const Register = () => {
  document.title = "Đăng Ký"
  //state redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //dispatch
  const dispatch = useDispatch();
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    dis: "",
    city: "",
  });
  const {
    name,
    email,
    password,
    passwordtemp,
    phone,
    address,
    dis,
    city,
  } = form;
  const isChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordtemp) {
      toast.warning("Mật khẩu phải giống nhau !!!");
    } else {
      dispatch(register({ name, email, password, phone, address, dis, city }));
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

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
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 700 }}>
        <Header as="h2" color="teal" textAlign="center">
          Đăng ký tài khoản
        </Header>
        <Form size="large" onSubmit={(e) => onSubmit(e)}>
          <Segment stacked>
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
              icon="lock"
              placeholder="Nhập mật khẩu"
              iconPosition="left"
              type="password"
              name="password"
              value={password}
              onChange={(e) => isChange(e)}
            />
            <Form.Input
              fluid
              icon="lock"
              placeholder="Nhập lại mật khẩu"
              iconPosition="left"
              type="password"
              name="passwordtemp"
              value={passwordtemp}
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
                <select name="city" value={city} onChange={(e) => isChange(e)}>
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
              Đăng ký
            </Button>
          </Segment>
        </Form>
        <Message attached="bottom" warning>
          <Icon name="help" />
          Nếu bạn đã có tài khoản?&nbsp;
          <Link to="/dang-nhap">Đăng nhập</Link>
          &nbsp;
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
