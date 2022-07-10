/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchUser from "../SearchUser";

function Topbar() {
  const { auth } = useSelector((state) => state);
  // const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("userId");
    window.location.replace("/");
  };

  useEffect(() => {
    if (localStorage.getItem("login")) {
      setLogin(true);
    }
  }, []);
  return (
    <div className="topbarContainer">
      <SearchUser />
      <div className="topbarCenter">
        <div className="top-bar-icon-center">
          <Link
            to="/"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Home"
            delay="0"
          >
            <i className="top-icon-center fas fa-home "></i>
          </Link>
          <Link
            to=""
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Friend"
            delay="0"
          >
            <i className="top-icon-center fas fa-user-friends"></i>
          </Link>
          <Link
            to=""
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Watch TV"
            delay="0"
          >
            <i className="top-icon-center fa fa-tv"></i>
          </Link>
          <Link
            to=""
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Group"
            delay="0"
          >
            <i className="top-icon-center fa fa-users"></i>
          </Link>
          <Link
            to=""
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Game"
            delay="0"
          >
            <i className="top-icon-center fa fa-gamepad"></i>
          </Link>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <i className="fas fa-user-friends"></i>
            <span className="topbarIconBadge">1</span>
          </div>
          <Link
            style={{ color: "white" }}
            to="/message"
            className="topbarIconItem"
          >
            <i className="fas fa-comment-dots    "></i>
            <span className="topbarIconBadge">2</span>
          </Link>
          <div className="topbarIconItem">
            <i className="fas fa-bell    "></i>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        {login ? (
          <div className="dropdown" style={{ width: "auto" }}>
            <Link
              to={`/profile/${auth.user._id}`}
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={auth.user.avatar}
                alt={auth.user.avatar}
                className="topbarImg"
              />
            </Link>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link
                  to={`/profile/${auth.user._id}`}
                  className="dropdown-item a_none"
                >
                  Profile
                </Link>
              </li>

              <li>
                <span className="dropdown-item" onClick={handleLogout}>
                  Log Out
                </span>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
            <Link to="/register" style={{ marginLeft: "10px", color: "white" }}>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
