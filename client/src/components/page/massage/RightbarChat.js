import React, { useState } from "react";
import { Link } from "react-router-dom";

function RightbarChat({ recipient, auth }) {
  const [drop1, setDrop1] = useState(false);
  const [drop2, setDrop2] = useState(false);
  const [drop3, setDrop3] = useState(false);
  const [drop4, setDrop4] = useState(false);
  return (
    <div className=" rightbarchat">
      <div className="rightbarchat_header">
        <img
          className="rightbarchat_header_img"
          src={recipient.avatarGroup}
          alt={recipient.avatarGroup}
        />
        <span className="rightbarchat_Online"></span>
        <p className="rightbarchat_header_name">
          {recipient?.isGroup ? (
            <span className="sidebar-chat-item-right-name">
              {recipient.nameGroup}
            </span>
          ) : (
            <span className="sidebar-chat-item-right-name">
              {
                recipient?.totalUser.filter(
                  (user) => user._id !== auth.user._id
                )[0].userName
              }
            </span>
          )}
        </p>
        <p className="rightbarchat_header_active">is Active</p>
      </div>
      <div className="rightbarchat_content">
        <div className="list-group">
          <div className="dropdown">
            <span
              className="dropdown_Name"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="true"
              onClick={() => setDrop1(!drop1)}
            >
              <span>Customize messages</span>
              {drop1 ? (
                <div>
                  <span>∧</span>
                </div>
              ) : (
                <span>∨</span>
              )}
            </span>
            <ul
              onClick={(e) => e.stopPropagation()}
              className="dropdown-menu bonus"
              aria-labelledby="dropdownMenuButton1"
            >
              <li className="dropdown-item">
                <Link to="">Action</Link>
              </li>
              <li className="dropdown-item">
                <Link to="">Another action</Link>
              </li>
              <li className="dropdown-item">
                <Link to="">Something else here</Link>
              </li>
            </ul>
          </div>
          <div className="dropdown">
            <span
              className="dropdown_Name"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setDrop2(!drop2)}
            >
              <span>Menber in chat</span>
              {drop2 ? (
                <div>
                  <span>∧</span>
                </div>
              ) : (
                <span>∨</span>
              )}
            </span>
            <ul
              onClick={(e) => e.stopPropagation()}
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton2"
            >
              {recipient.totalUser.map((user, index) => (
                <div className="menbership">
                  <Link to={`/profile/${user._id}`} className="menbership_info">
                    <img src={user.avatar} alt={user.avatar} />
                    <span className="menbership_name">{user.userName}</span>
                  </Link>
                  <div className="dropdown" style={{ width: "auto" }}>
                    <span
                      type="button"
                      id="dropdownMenuButton3"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span style={{ padding: "0px 10px" }}>⋯</span>
                    </span>
                    <ul
                      className="dropdown-menu show_block"
                      aria-labelledby="dropdownMenuButton3"
                    >
                      <li className="dropdown-item">
                        <Link to="">Remove menber out conversation</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="">Another action</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to="">Something else here</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightbarChat;
