import * as Types from "../constant/AlertTypes";
import uuid from "uuid";

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: Types.SET_ALERT,
    payload: { msg, alertType, id },
  });
};
