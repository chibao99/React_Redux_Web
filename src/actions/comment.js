import request from "./agent";
import { GET_COMMENT_BY_PRODUCTID } from "../constant/AlertTypes";
export const getCommentByProductID = (id) => async (dispatch) => {
  try {
    const res = await request.get(`/comments/${id}`);
    dispatch({
      type: GET_COMMENT_BY_PRODUCTID,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};
