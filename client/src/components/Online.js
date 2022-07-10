import React from "react";
import { Link } from "react-router-dom";

function Online({ user }) {
  return (
    <li>
      <Link
        style={{ padding: "0 15px" }}
        className="rightbarFriend"
        to={`/profile/${user._id}`}
      >
        <div className="rightbarProfileImgContainer">
          <img className="rightbarProfileImg" src={user.avatar} alt="" />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.userName}</span>
      </Link>
    </li>
  );
}

export default Online;
