import { GET_CATALOG } from "../constant/AlertTypes";
let initialState = {
  catalog: [],
};

const catalog = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CATALOG:
      return {
        catalog: payload,
      };
    default:
      return { ...state };
  }
};

export default catalog;
