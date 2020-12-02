import { GET_CATALOG } from "../constant/AlertTypes";
import request from "./agent";

export const getCatalog = () => async (dispatch) => {
  try {
    const data = await request.get("/catalog");
    dispatch({
      type: GET_CATALOG,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
