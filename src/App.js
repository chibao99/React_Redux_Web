import React, { Fragment, useEffect } from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import Header from "./component/Header/HeaderMenu";
import Footer from "./component/Footer/Footer";
import Home from "./component/Home/Home";
import Products from "./component/Product/Products";
import ProductDetail from "./component/Product/ProductDetail";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Faqs from "./component/Faqs/Faqs";
import Contact from "./component/Contact/Contact";
import Cart from "./component/Cart/Cart";
import Register from "./component/Resgister/Register";
import Login from "./component/Login/Login";
import { ToastContainer } from "react-toastify";
import Checkout from "./component/Checkout/Checkout";
import Profile from "./component/Profile/Profile";
import PrivateRoute from "./routing/PrivateRoute";
import AdminRoute from "./routing/AdminRoute";
import AdminPage from "./component/Admin/AdminPage";
import { fetch_data_all } from "./actions/product";
import { useDispatch } from "react-redux";
import { getCatalog } from "./actions/catalog";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch_data_all());
    dispatch(getCatalog());
  }, [fetch_data_all,getCatalog]);
  return (
    <Router>
      <Fragment>
        <Container>
          <Header />
          <ToastContainer />
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/san-pham" exact={true} component={Products} />
            <Route path="/san-pham/chi-tiet/:id" component={ProductDetail} />
            <Route path="/faqs" component={Faqs} />
            <Route path="/lien-he" component={Contact} />
            <Route path="/gio-hang" component={Cart} />
            <Route path="/dang-ky" exact={true} component={Register} />
            <Route path="/dang-nhap" component={Login} />
            <PrivateRoute path="/thanh-toan" component={Checkout} />
            <PrivateRoute path="/trang-ca-nhan" component={Profile} />
            <Route path="/quan-ly" component={AdminPage} />
          </Switch>
          <Footer />
        </Container>
      </Fragment>
    </Router>
  );
};

export default App;
