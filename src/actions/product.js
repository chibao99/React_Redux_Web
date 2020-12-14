import {
  FETCH_PRODUCTS,
  EDIT_INVENTORY_SUCCESS,
  FETCH_PRODUCTS_ALL,
  UPDATE_NEW_PRODUCT
} from "../constant/AlertTypes";
import request from "./agent";

//Fetch data
export const fetch_data = (page, limit) => async (dispatch) => {
  try {
    const res = await request.get(`/products?page=${page}&limit=${limit}`);
    dispatch({
      type: FETCH_PRODUCTS,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};
export const fetch_data_all = () => async (dispatch) => {
  try {
    const res = await request.get(`/products`);
    dispatch({
      type: FETCH_PRODUCTS_ALL,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};
//  Edit inventory products
export const edit_inventory = ({ quantity }, id) => async (dispatch) => {
  const body = JSON.stringify({ quantity });
  try {
    const res = await request.put(`/products/edit/inventory/${id}`, body);
    dispatch({
      type: EDIT_INVENTORY_SUCCESS,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};
export const addNewProduct = (oldData, newData) => async (dispatch) => {
  let temp = [...oldData]
  temp.products.push(newData);
  dispatch({
    type:UPDATE_NEW_PRODUCT,
    payload:temp
  })
};
