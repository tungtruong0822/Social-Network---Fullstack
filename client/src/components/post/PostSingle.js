import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ImgThumbnail from "./ImgThumbnail";
import CloseFriend from "../../components/CloseFriend";
import {
  likeAndUnlike,
  getAllPost,
  getPostUser,
  setClearNotify,
  deletePost,
} from "../../redux/reducers/post";
import CreatePost from "./CreatePost";
import InputComment from "./InputComment";
import Comment from "./Comment";

function PostSingle({ user, post, socket, postParent }) {
  const [showUser, setShowUser] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [like, setLike] = useState(post.likes.length);
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(likeAndUnlike({ postId: post._id, userId: user._id, socket }));
    if (isLike) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  };
  const handleDeletePost = () => {
    dispatch(deletePost({ post }));
  };
  useEffect(() => {
    setLike(post.likes.length);
    if (post.likes.includes(user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [like, post, user._id]);
  useEffect(() => {
    if (postParent.postSuccess) {
      setIsEdit(false);
      dispatch(getAllPost());
      dispatch(setClearNotify());
      dispatch(getPostUser(user._id));
      // window.location.replace("/");
    }
  }, [post, dispatch, user._id, postParent.postSuccess]);
  return (
    <div className="post">
      {isEdit && (
        <CreatePost
          user={user}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          postEdit={post}
        />
      )}
      <div className="post_header">
        <div className="post_header_info">
          <div className="img_header_post">
            <img src={post.userId.avatar} alt="" />
          </div>
          <Link to={`/profile/${post.userId._id}`} className="info_user_post">
            {post.userId.userName}
          </Link>
        </div>
        <div className="post_header_edit">
          <div className="btn-group">
            <span
              className="span_edit_post"
              id="defaultDropdown"
              data-bs-toggle="dropdown"
              data-bs-auto-close="true"
              aria-expanded="false"
            >
              ⫶
            </span>
            <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
              <li onClick={() => setIsEdit(true)}>
                <span className="dropdown-item">
                  {user._id === post.userId._id && "Edit Post"}
                </span>
              </li>
              <li>
                <span className="dropdown-item">Copy Link</span>
              </li>
              <li>
                <span onClick={handleDeletePost} className="dropdown-item">
                  {user._id === post.userId._id && "Delete"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="post_center" style={{ position: "relative" }}>
        <div className="post_center_content">
          <span className="post_center_description">{post.desc}</span>
        </div>
        {post.img.length > 1 && (
          <span className="post_imgLegth">+{post.img.length - 1}</span>
        )}
        <div className="post_center_imgThumbnail">
          {post.img.length > 0 ? (
            <ImgThumbnail post={post} imgs={post.img} />
          ) : (
            ""
          )}
        </div>
      </div>
      <hr />
      <div className="post_footer">
        <div className="post_footer_feed">
          <img onClick={handleLike} src="/assets/like.png" alt="like" />
          <img onClick={handleLike} src="/assets/heart.png" alt="like" />
          {post.likes && isLike ? (
            <span onClick={() => setShowUser(!showUser)}>
              you and {like} liked it
            </span>
          ) : (
            <span onClick={() => setShowUser(!showUser)}> {like} liked it</span>
          )}
        </div>
        <div className="post_footer_comment">
          <span>{post.comments.length} Comment</span>
        </div>
      </div>
      {showUser && (
        <CloseFriend
          setShowUser={setShowUser}
          showUser={showUser}
          users={post.likes}
        />
      )}
      <hr />
      <Comment post={post} />
      <InputComment post={post} authId={user._id} />
    </div>
  );
}

export default PostSingle;
