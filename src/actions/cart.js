import { ADD_CART, DELETE_CART, UPDATE_CART } from "../constant/AlertTypes";

export const addcart = (product, quantity) => (dispatch) => {
  dispatch({
    type: ADD_CART,
    product,
    quantity,
  });
};
export const deletecart = (product) => (dispatch) => {
  dispatch({
    type: DELETE_CART,
    product,
  });
};
export const updatecart = (product, quantity) => (dispatch) => {
  dispatch({
    type: UPDATE_CART,
    product,
    quantity,
  });
};
