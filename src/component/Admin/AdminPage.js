import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Menu } from "semantic-ui-react";
import { useSelector } from "react-redux";
import request from "../../actions/agent";
import AdminProducts from "./AdminProducts";
import AdminCustomer from "./AdminCustomer";
import AdminPayments from "./AdminPayments";
const AdminPage = () => {
  //state redux
  const products = useSelector((state) => state.product.products);
  const [users, setusers] = useState([]);
  const [checkouts, setucheckouts] = useState([]);
  useEffect(() => {
    document.title = "Quản Lý"
    const fetchData = async () => {
      let data = await request.get("/users/getallcustomer");
      setusers(data);
    };
    const fetchDataCh = async () => {
      let data = await request.get("/checkout/getallcheckout");
      setucheckouts(data);
    };
    fetchData();
    fetchDataCh()
  }, [products]);
  const [item, setitem] = useState({
    activeItem: "Sản Phẩm",
  });
  const handelItemClick = (name) => {
    setitem({ activeItem: name });
  };

  const displayMenu = () => {
    if (item.activeItem === "Sản Phẩm") {
      return <AdminProducts products={products} />;
    } else if (item.activeItem === "Khach Hang") {
      return <AdminCustomer users={users} />;
    } else {
      return <AdminPayments checkouts={checkouts} />;
    }
  };
  return (
    <div>
      <Menu attached="top" tabular>
        <Menu.Item
          name="Sản Phẩm"
          active={item.activeItem === "Sản Phẩm"}
          onClick={() => {
            handelItemClick("Sản Phẩm");
          }}
        />
        <Menu.Item
          name="Khách Hàng"
          active={item.activeItem === "Khach Hang"}
          onClick={() => {
            handelItemClick("Khach Hang");
          }}
        />
        <Menu.Item
          name="Hóa Đơn"
          active={item.activeItem === "Hoa Dơn"}
          onClick={() => {
            handelItemClick("Hoa Dơn");
          }}
        />
      </Menu>
      {displayMenu()}
    </div>
  );
};

export default AdminPage;
