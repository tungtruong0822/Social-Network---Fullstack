import React from "react";

import RightbarHome from "./rightbar/RightbarHome";
import RightbarUser from "./rightbar/RightbarUser";

function Rightbar({ profile }) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <RightbarUser profile={profile} /> : <RightbarHome />}
      </div>
    </div>
  );
}

export default Rightbar;
