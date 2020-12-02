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
import "semantic-ui-css/semantic.min.css";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/auth";

const Login = () => {
  document.title = "Đăng Nhập"
  //state redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const block = useSelector((state) => state.auth.block);
  //dispatch
  const dispatch = useDispatch();
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const isChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  if (isAuthenticated && isAdmin === false && block === false) {
    return <Redirect to="/" />;
  }
  if (isAdmin) {
    return <Redirect to="/quan-ly" />;
  }
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Đăng nhập vào tài khoản
        </Header>
        <Form size="large" onSubmit={(e) => onSubmit(e)}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => isChange(e)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => isChange(e)}
            />
            <Button type="submit" color="teal" fluid size="large">
              Đăng Nhập
            </Button>
          </Segment>
        </Form>
        <Message attached="bottom" warning>
          <Icon name="help" />
          Nếu bạn chưa có tài khoản?&nbsp;
          <Link to="/dang-ky">Đăng ký</Link>
          &nbsp;
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
