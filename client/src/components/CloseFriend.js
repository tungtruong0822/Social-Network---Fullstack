import React from "react";
import { Link } from "react-router-dom";

function CloseFriend({ setShowUser, showUser, users }) {
  return (
    <div className="show_listUser">
      <ul style={{ position: "relative" }}>
        <div onClick={() => setShowUser(!showUser)} className="buttonc_close">
          <span>⨯</span>
        </div>
        {users?.map((user, key) => (
          <li key={key} className="sidebarFriend">
            <Link to={`/profile/${user._id}`} style={{ cursor: "pointer" }}>
              <img className="sidebarFriendImg" src={user.avatar} alt="" />
              <span className="sidebarFriendName">{user.userName}</span>
            </Link>
            <div className="dropdown" style={{ width: "auto" }}>
              <span
                type="button"
                id="dropdownMenuButton3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span style={{ cursor: "pointer", padding: "0px 10px" }}>
                  ⋯
                </span>
              </span>
              <ul
                className="dropdown-menu show_block"
                aria-labelledby="dropdownMenuButton3"
                style={{
                  backgroundColor: "GrayText",
                  width: "auto",
                  height: "auto",
                }}
              >
                <li className="dropdown-item">
                  <Link to="">Action 1</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="">Action 2</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="">Action 3</Link>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CloseFriend;
