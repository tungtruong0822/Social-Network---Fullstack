import React, { useEffect } from "react";
import Feed from "../../components/page/Feed";
import Rightbar from "../../components/page/Rightbar";
import Topbar from "../../components/page/Topbar";
import Sidebar from "../../components/page/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getPostUser } from "../../redux/reducers/post";
import { useParams } from "react-router-dom";
import { getUser } from "../../redux/reducers/auth";

function ProFile() {
  const { post, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPostUser(id));
    dispatch(getUser(id));
  }, [dispatch, id]);
  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profile_rightbar">
          <div className="profile_rightbar_top">
            <div className="profile_rightbar_top_coverImg">
              <img
                className="profile_img-cover"
                src={auth.userParams.coverPicture}
                alt=""
              />
              <img
                className="profile-img-user"
                src={`${auth.userParams.avatar}`}
                alt=""
              />
            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">{auth.userParams.userName}</h4>
              <span className="profileInfoDesc">
                {auth.userParams.desc
                  ? auth.userParams.desc
                  : "User has no description "}
              </span>
              {/* {auth.user.desc} */}
            </div>
          </div>
          <div className="profile_rightbar_bottom">
            <Feed posts={post.postUser} />
            <Rightbar profile={auth.userParams} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProFile;
