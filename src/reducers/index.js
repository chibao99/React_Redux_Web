import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import product from "./product";
import cart from "./cart";
import checkout from "./checkout";
import catalog from "./catalog";
import comment from "./comment";

const appReducer = combineReducers({
  alert,
  auth,
  product,
  cart,
  checkout,
  catalog,
  comment,
});
export default appReducer;
