import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Comment, Form, Header, Rating } from "semantic-ui-react";
import request from "../../actions/agent";
import { useDispatch } from "react-redux";
import { getCommentByProductID } from "../../actions/comment";
import { toast } from "react-toastify";
const CommentProduct = ({ comment, idP }) => {
  const history = useHistory();
  let comments = comment.comments ? comment.comments : [];
  const [formCommnet, setformCommnet] = useState({
    reply: "",
    content: "",
    raitng: 0,
  });
  const { reply, content } = formCommnet;
  const isChange = (e) => {
    setformCommnet({ ...formCommnet, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const addResponse = async (productID, commentID) => {
    if (!localStorage.getItem("token")) {
      toast.error("Đăng nhập trước khi bình luận");
      history.push("/dang-nhap");
    }
    if (reply === "") {
      toast.error("Bình luận không rỗng");
      return;
    }
    const body = { content: reply };
    const res = await request.post(
      `/comments/addresponse/${productID}/${commentID}`,
      body
    );
    if (res.msg === true) {
      console.log(res);
      dispatch(getCommentByProductID(idP));
      toast.success("Bình luận thành công!!!");
      setformCommnet({ reply: "" });
    }
  };

  const addComment = async () => {
    if (!localStorage.getItem("token")) {
      toast.error("Đăng nhập trước khi bình luận");
      history.push("/dang-nhap");
    }
    if (content === "") {
      toast.error("Bình luận không để trống");
      return;
    }
    if (comments.length === 0) {
      let body = { product: idP, content: content };
      const res = await request.post("/comments/newcomments", body);
      if (res.msg === true) {
        dispatch(getCommentByProductID(idP));
        toast.success("Thêm comment thành công!!!");
        setformCommnet({ content: "" });
      }
    } else {
      let body = { productID: idP, content: content };
      const res = await request.post("/comments/addcommnet", body);
      if (res.msg === true) {
        dispatch(getCommentByProductID(idP));
        toast.success("Thêm comment thành công!!!");
        setformCommnet({ content: "" });
      }
    }
  };

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Bình Luận
      </Header>
      {comments &&
        comments.map((com, index) => {
          return com.comments.map((comm, index1) => {
            return (
              <Comment key={index1}>
                <Comment.Avatar as="a" src={comm.userComment.avatar} />
                <Comment.Content>
                  <Comment.Author as="a">
                    {comm.userComment.name}
                  </Comment.Author>
                  <Comment.Metadata>
                    <span>{comm.time}</span>
                  </Comment.Metadata>
                  <Comment.Text>{comm.content}</Comment.Text>
                  <Comment.Actions>
                    <Rating
                      icon="star"
                      defaultRating={comm.rating}
                      maxRating={5}
                      disabled
                    />
                  </Comment.Actions>
                </Comment.Content>
                <Comment.Group>
                  {comm.response.map((res, index) => {
                    return (
                      <Comment key={index}>
                        <Comment.Avatar src={res.user.avatar} />
                        <Comment.Content>
                          <Comment.Author as="a">
                            {res.user.name}
                          </Comment.Author>
                          <Comment.Metadata>
                            <div>{res.time}</div>
                          </Comment.Metadata>
                          <Comment.Text>{res.content}</Comment.Text>
                          <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>
                    );
                  })}
                  <Form reply>
                    <Form.TextArea
                      onChange={(e) => isChange(e)}
                      name="reply"
                      value={reply}
                    />
                    <Button
                      content="Trả lời"
                      labelPosition="left"
                      icon="send"
                      primary
                      onClick={() => addResponse(idP, comm._id)}
                    />
                  </Form>
                </Comment.Group>
              </Comment>
            );
          });
        })}
      <Form reply>
        <Form.TextArea
          name="content"
          value={content}
          onChange={(e) => isChange(e)}
        />
        <Button
          content="Thêm bình luận"
          labelPosition="left"
          icon="send"
          primary
          onClick={() => addComment()}
        />
      </Form>
    </Comment.Group>
  );
};

export default CommentProduct;
