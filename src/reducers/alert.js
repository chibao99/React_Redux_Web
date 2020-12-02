import * as Types from "../constant/AlertTypes";
const initiaState = [];
const alerts = (state = initiaState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.SET_ALERT:
      return [...state, payload];

    default:
      return state;
  }
};
export default alerts;
