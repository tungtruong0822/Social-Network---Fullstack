import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getAllPost,
  getPostUser,
  updateComment,
} from "../../redux/reducers/post";

function CommentDisplay({ comment, post }) {
  const { auth } = useSelector((state) => state);
  const [content, setContent] = useState("");
  const [isReadMore, setIsReadMore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteComment = () => {
    dispatch(deleteComment(comment._id)).then((response) => {
      !response.error && dispatch(getAllPost());
      dispatch(getPostUser(auth.user._id));
    });
  };
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleUpdateComment = () => {
    dispatch(updateComment({ _id: comment._id, content })).then((response) => {
      !response.error && dispatch(getAllPost());
      dispatch(getPostUser(auth.user._id));
    });
    setIsEdit(false);
  };
  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  return (
    <div className="comment_display">
      <div className="comment_display_header">
        <Link
          to={`/profile/${comment.userId._id}`}
          className="comment_display_info"
        >
          <img
            className="comment_display_img"
            src={comment.userId.avatar}
            alt="avatar"
          />
          <span className="comment_display_name">
            {comment.userId.userName}
          </span>
        </Link>
        {comment?.userId?._id === auth.user._id ? (
          <div className="dropdown">
            <span
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ⋯
            </span>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <span className="dropdown-item" onClick={handleIsEdit}>
                  Edit Comment
                </span>
              </li>
              <li>
                <span className="dropdown-item" onClick={handleDeleteComment}>
                  Delete Comment
                </span>
              </li>
            </ul>
          </div>
        ) : auth.user._id === post.userId._id ? (
          <div className="dropdown">
            <span
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ⋯
            </span>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <span className="dropdown-item">Delete Comment</span>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="comment_display_footer">
        {isEdit ? (
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        ) : (
          <>
            <span className="comment_display_content">
              {comment.content.length > 160
                ? isReadMore
                  ? comment.content
                  : comment.content.slice(0, 160) + "..."
                : comment.content}{" "}
            </span>
            <span
              onClick={() => setIsReadMore(!isReadMore)}
              className="text-danger "
              style={{ cursor: "pointer", fontSize: "12px" }}
            >
              {comment.content.length > 160
                ? isReadMore
                  ? "hide"
                  : "read more"
                : ""}
            </span>
          </>
        )}
        <div className="comment_display_footer_end">
          <span className="comment_display_createAt">
            {moment(comment.createdAt).fromNow()}
          </span>
          <div className="comment_display_handle">
            {isEdit ? (
              <>
                {" "}
                <span onClick={handleUpdateComment}>apcept</span>
                <span onClick={handleIsEdit}>cancel</span>
              </>
            ) : (
              <>
                {" "}
                <span>0 like</span>
                <span>reply</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentDisplay;
