import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import product from "./product";
import cart from "./cart";
import checkout from "./checkout";
import catalog from "./catalog";

const appReducer = combineReducers({
  alert,
  auth,
  product,
  cart,
  checkout,
  catalog
});
export default appReducer;
