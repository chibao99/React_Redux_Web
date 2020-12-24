import {
  ADD_CART,
  DELETE_CART,
  UPDATE_CART,
  DELETE_ALL_CART,
} from "../constant/AlertTypes";

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
export const deleteAllCart = () => (dispatch) => {
  dispatch({
    type: DELETE_ALL_CART,
  });
};
