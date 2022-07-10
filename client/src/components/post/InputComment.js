import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createComment,
  getAllPost,
  getPostUser,
} from "../../redux/reducers/post";

function InputComment({ post, authId }) {
  const [inputComment, setInputComment] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const comment = {
      userId: authId,
      postId: post._id,
      content: inputComment,
    };
    dispatch(createComment(comment)).then((response) => {
      !response.error && dispatch(getAllPost());
      dispatch(getPostUser(authId));
    });
    setInputComment("");
  };

  return (
    <form onSubmit={handleOnSubmit} className="Inputcomment">
      <input
        placeholder="Set your Input ..."
        onChange={(e) => setInputComment(e.target.value)}
        type="text"
        className="Inputcomment_input"
        value={inputComment}
      />
      <button className="inputComment_button" type="submit">
        post
      </button>
    </form>
  );
}

export default InputComment;
