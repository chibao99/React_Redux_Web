import {
  PAYMENT_SUCCESS,
  PAYMENT_ERROR,
  GET_CHECKOUT,
} from "../constant/AlertTypes";
import request from "./agent";
//payment
export const payment = (hd) => async (dispatch) => {
  const body = JSON.stringify(hd);
  try {
    const data = await request.post("/checkout", body);
    dispatch({
      type: PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_ERROR,
    });
  }
};

//Get Checkout by user
export const getCheckout = () => async (dispatch) => {
  try {
    const res = await request.get("/checkout");
    dispatch({
      type: GET_CHECKOUT,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};
