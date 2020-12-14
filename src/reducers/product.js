import {
  FETCH_PRODUCTS,
  EDIT_INVENTORY_SUCCESS,
  FETCH_PRODUCTS_ALL,
  UPDATE_NEW_PRODUCT,
} from "../constant/AlertTypes";
const initiaState = {
  products: [],
  totalPage: null,
};

const product = (state = initiaState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: payload.results,
        totalPage: payload.totals,
      };
    case FETCH_PRODUCTS_ALL:
      return {
        ...state,
        products: payload.results,
        totalPage: payload.totals,
      };
    case EDIT_INVENTORY_SUCCESS:
      return { ...state };
    case UPDATE_NEW_PRODUCT:
      return {
        products: payload,
      };
    default:
      return { ...state };
  }
};
export default product;
