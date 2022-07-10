import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseFriend from "../../../components/CloseFriend";
import {
  getUser,
  handleUnFollow,
  handleFollow,
  setStatusFollow,
} from "../../../redux/reducers/auth";
import EditProfile from "./EditProfile";

function RightbarUser({ profile }) {
  const dispatch = useDispatch();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [showUserFollowing, setShowUserFollowing] = useState(false);
  const [showUserFollower, setShowUserFollower] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const { auth } = useSelector((state) => state);

  const handleFollowClient = () => {
    dispatch(handleFollow({ _id: auth.user._id, id: profile._id }));
  };
  const handleUnFollowClient = () => {
    dispatch(handleUnFollow({ _id: auth.user._id, id: profile._id }));
  };
  const handleUserFollowing = () => {
    if (profile.followings.length > 0) {
      setShowUserFollowing(!showUserFollowing);
    }
  };
  const handleUserFollower = () => {
    if (profile.followers.length > 0) {
      setShowUserFollower(!showUserFollower);
    }
  };

  useEffect(() => {
    if (auth.user._id === profile._id) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [auth.user._id, profile._id]);
  useEffect(() => {
    dispatch(getUser(profile._id));
    dispatch(setStatusFollow());
  }, [auth.statusFollow, dispatch, profile._id]);
  const profileRightBar = () => {
    return (
      <div>
        {!isSame && profile.followers ? (
          profile.followers.some((user) => user._id === auth.user._id) ? (
            <button
              style={{
                margin: "10px ",
                fontWeight: "bold",
                fontSize: "20px",
              }}
              className="btn btn-danger"
              onClick={handleUnFollowClient}
            >
              Un Follow -
            </button>
          ) : (
            <button
              style={{
                margin: "10px ",
                fontWeight: "bold",
                fontSize: "20px",
              }}
              className="btn btn-primary"
              onClick={handleFollowClient}
            >
              Follow +
            </button>
          )
        ) : (
          <button
            style={{
              margin: "10px ",
              fontWeight: "bold",
              fontSize: "20px",
            }}
            className="btn btn-info"
            onClick={() => setIsEditProfile(!isEditProfile)}
          >
            Edit Profile
          </button>
        )}

        <h3 className="rightbar-title">User Imformation</h3>
        <div className="rightbar-imformation">
          <div className="rightbar-imformation-item">
            <div className="rightbar-infokey">Form :</div>
            <div className="rightbar-inforvalue">
              {profile.from ? profile.from : "User has no update address "}
            </div>
          </div>
          <div className="rightbar-imformation-item">
            <div className="rightbar-infokey">Relationship :</div>
            <div className="rightbar-inforvalue">Single</div>
          </div>
          <div className="rightbar-imformation-item">
            <div className="rightbar-infokey">followers :</div>
            <div
              className="rightbar-inforvalue follow"
              style={{ marginTop: "3px" }}
            >
              <span onClick={handleUserFollower}>
                {profile.followers && profile.followers.length} users
              </span>
            </div>
          </div>
          <div className="rightbar-imformation-item">
            <div className="rightbar-infokey">followings :</div>
            <div
              className="rightbar-inforvalue follow"
              style={{ marginTop: "3px" }}
            >
              <span onClick={handleUserFollowing}>
                {profile.followings && profile.followings.length} users
              </span>
            </div>
          </div>
        </div>
        <h3 className="rightbar-title">User Friend</h3>
        <div className="rightbar-user-friends">
          <div className="rightbar-user-friend">
            <img
              src="/assets/person/1.jpeg"
              alt=""
              className="rightbar-user-friend-img"
            />
          </div>
          <div className="rightbar-user-friend">
            <img
              src="/assets/person/2.jpeg"
              alt=""
              className="rightbar-user-friend-img"
            />
          </div>
          <div className="rightbar-user-friend">
            <img
              src="/assets/person/3.jpeg"
              alt=""
              className="rightbar-user-friend-img"
            />
          </div>
          <div className="rightbar-user-friend">
            <img
              src="/assets/person/4.jpeg"
              alt=""
              className="rightbar-user-friend-img"
            />
          </div>
          <div className="rightbar-user-friend">
            <img
              src="/assets/person/7.jpeg"
              alt=""
              className="rightbar-user-friend-img"
            />
          </div>
        </div>
        {showUserFollower ? (
          <CloseFriend
            setShowUser={setShowUserFollower}
            showUser={showUserFollower}
            users={profile.followers}
          />
        ) : showUserFollowing ? (
          <CloseFriend
            setShowUser={setShowUserFollowing}
            showUser={showUserFollowing}
            users={profile.followings}
          />
        ) : (
          ""
        )}
        {isEditProfile && (
          <EditProfile
            isEditProfile={isEditProfile}
            setIsEditProfile={setIsEditProfile}
            profile={profile}
            auth={auth}
          />
        )}
      </div>
    );
  };

  return profileRightBar();
}

export default RightbarUser;
