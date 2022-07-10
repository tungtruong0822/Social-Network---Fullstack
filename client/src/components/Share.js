/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./post/CreatePost";
import { createPost } from "../redux/reducers/post";
import {
  getAllPost,
  setClearNotify,
  getPostUser,
} from "../redux/reducers/post";

function Share({ user }) {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state);
  const [content, setContent] = useState("");
  const intial = { img: [], userId: "", desc: "" };
  const [postNew, setPostNew] = useState(intial);
  const [isShare, setIsShare] = useState(false);

  const onChangevalue = (e) => {
    setContent(e.target.value);
  };
  const handleShare = (e) => {
    e.preventDefault();
    if (content) {
      dispatch(createPost(postNew));
    }
  };
  useEffect(() => {
    if (post.postSuccess === "Create Post Success...") {
      setIsShare(false);
      dispatch(getAllPost());
      dispatch(setClearNotify());
      dispatch(getPostUser(user._id));
      // window.location.replace("/");
    }
  }, [post.postSuccess, dispatch, user._id]);
  useEffect(() => {
    setPostNew({
      ...postNew,
      userId: `${user._id}`,
      desc: `${content}`,
    });
  }, [content, user._id]);
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.avatar} alt="" />
          <input
            placeholder={`What's in your mind ${user.userName}?`}
            className="shareInput"
            onChange={onChangevalue}
          />
        </div>
        {isShare && <CreatePost user={user} setIsShare={setIsShare} />}
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <i className="fas fa-images shareIcon    "></i>
              <span
                className="shareOptionText"
                onClick={() => setIsShare(true)}
              >
                Photo or Video
              </span>
            </div>
            <div className="shareOption">
              <i className="fa fa-tag" aria-hidden="true"></i>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <i className="fas fa-map-marked-alt    "></i>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <i className="fas fa-grin   shareIcon  "></i>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button onClick={handleShare} className="shareButton">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default Share;
