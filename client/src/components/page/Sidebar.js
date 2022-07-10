import React from "react";
import { Users } from "../../Data";
import CloseFriend from "../../components/CloseFriend";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar ">
      <div className="sidebarWrapper ">
        <ul className="sidebarList list-group">
          <Link
            to="/"
            className="sidebarListItem list-group-item list-group-item-action"
          >
            <i className="sidebarIcon fas fa-home "></i>
            <span className="sidebarListItemText">Home</span>
          </Link>
          <Link
            to="/message"
            className="sidebarListItem list-group-item list-group-item-action"
          >
            <i className="sidebarIcon fas fa-comment-alt    "></i>
            <span className="sidebarListItemText">Chats</span>
          </Link>
          {/* <Link
            to="/message"
            className="sidebarListItem list-group-item list-group-item-action"
          >
            <i className="sidebarIcon fa fa-play-circle" aria-hidden="true"></i>
            <span className="sidebarListItemText">Videos</span>
          </Link> */}
          <Link
            to="/message"
            className="sidebarListItem list-group-item list-group-item-action"
          >
            <i className="sidebarIcon fas fa-user-friends    "></i>
            <span className="sidebarListItemText">Groups</span>
          </Link>
          <Link
            to="/Information"
            className="sidebarListItem list-group-item list-group-item-action"
          >
            <i
              className="sidebarIcon fas fa-info-circle"
              aria-hidden="true"
            ></i>
            <span className="sidebarListItemText">About me</span>
          </Link>
          {/* <Link
            to="/message"
            className="sidebarListItem list-group-item list-group-item-action"
          >
            <i
              className="sidebarIcon fa fa-question-circle"
              aria-hidden="true"
            ></i>
            <span className="sidebarListItemText">Questions</span>
          </Link>
          <Link
            to="/message"
            className="sidebarListItem list-group-item list-group-item-action"
          >
            <i className="sidebarIcon fa fa-briefcase" aria-hidden="true"></i>
            <span className="sidebarListItemText">Jobs</span>
          </Link>
          <Link
            to="/message"
            className="sidebarListItem list-group-item list-group-item-action"
          >
            <i className="sidebarIcon fa fa-calendar" aria-hidden="true"></i>
            <span className="sidebarListItemText">Events</span>
          </Link>
          <Link
            to="/message"
            className="sidebarListItem list-group-item list-group-item-action"
          >
            <i
              className="sidebarIcon fa fa-graduation-cap"
              aria-hidden="true"
            ></i>
            <span className="sidebarListItemText">Courses</span>
          </Link> */}
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}

export default Sidebar;
