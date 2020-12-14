import React, { useEffect } from "react";
import { Menu, Button, Icon, Image } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, loadUser } from "../../actions/auth";

const HeaderMenu = () => {
  //state redux
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const logout1 = () => {
    dispatch(logout());
    return history.replace("/");
  };
  useEffect(() => {
    dispatch(loadUser());
  }, [loadUser]);
  const display = () => {
    if (user) {
      return (
        <div>
          <Link to="/trang-ca-nhan">
            <span style={{ margin: "0px 6px" }}>
              <Image avatar src={user.avatar} />
              {user.name}
            </span>
          </Link>
          <a href="#/" onClick={() => logout1()}>
            Đăng Xuất
          </a>
        </div>
      );
    } else {
      return (
        <Button.Group size="tiny">
          <Link to="/dang-ky">
            <Button>Đăng Ký</Button>
          </Link>
          <Button.Or />
          <Link to="/dang-nhap">
            <Button positive>Đăng Nhập</Button>
          </Link>
        </Button.Group>
      );
    }
  };
  return (
    <Menu size="small" inverted stackable>
      <Menu.Item name="Trang Chủ">
        <Link to="/">Trang Chủ</Link>
      </Menu.Item>

      <Menu.Item name="Sản Phẩm">
        <Link to="/san-pham">Sản Phẩm</Link>
      </Menu.Item>

      <Menu.Item name="Faqs">
        <Link to="/faqs">Faqs</Link>
      </Menu.Item>

      <Menu.Item name="Liên Hệ">
        <Link to="/lien-he">Liên Hệ</Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Link to="/gio-hang">
          <Menu.Item style={{ marginTop: "6px" }}>
            <Button animated="vertical">
              <Button.Content hidden>{cart.length}</Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
            </Button>
          </Menu.Item>
        </Link>
        <Menu.Item>{display()}</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default HeaderMenu;
