import React from "react";
import { useSelector } from "react-redux";

import Online from "../../Online";

function RightbarHome() {
  const { auth } = useSelector((state) => state);
  return (
    <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="/assets/gift.png" alt="" />
        <span className="birthdayText">
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </span>
      </div>
      <img className="rightbarAd" src="/assets/ad.png" alt="" />
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFriendList">
        {auth.allUser.map((u, index) => (
          <Online key={index} user={u} />
        ))}
      </ul>
    </>
  );
}

export default RightbarHome;
