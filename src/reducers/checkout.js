import {
  PAYMENT_ERROR,
  PAYMENT_SUCCESS,
  GET_CHECKOUT,
} from "../constant/AlertTypes";
let initialState = {
  status: null,
  checkouts: [],
};

const checkout = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case PAYMENT_SUCCESS:
      return {
        ...state,
        status: payload.msg,
      };
    case PAYMENT_ERROR:
      return {
        ...state,
        status: payload,
      };
    case GET_CHECKOUT:
      return {
        ...state,
        checkouts: payload.data,
      };
    default:
      return { ...state };
  }
};
export default checkout;
