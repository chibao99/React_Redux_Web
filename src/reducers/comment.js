import { GET_COMMENT_BY_PRODUCTID } from "../constant/AlertTypes";
let initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COMMENT_BY_PRODUCTID:
      return (state = payload);
    default:
      return { ...state };
  }
};
