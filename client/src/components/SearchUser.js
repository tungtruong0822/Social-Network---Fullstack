/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchUser, clearSearchUser } from "../redux/reducers/auth";
import {
  pushConversations,
  setConversation,
} from "../redux/reducers/conversation";

function SearchUser({ isInputChat }) {
  const dispatch = useDispatch();
  const { auth, conversation } = useSelector((state) => state);
  const [isSearch, setIsSearch] = useState(false);
  const [searchName, setSearchName] = useState("");

  const handleCancel = () => {
    setIsSearch(false);
    setSearchName("");
  };
  const handleSearchChat = (userSearch) => {
    let data = [];
    let check = false;
    if (userSearch._id === auth.user._id) return;
    conversation.conversations.forEach((cvst) => {
      if (cvst.isGroup !== true) {
        if (cvst.totalUser.some((user) => user._id === userSearch._id)) {
          data = conversation.conversations.filter((item) => item._id !== "");
          data = data.filter((item) => item._id !== cvst._id);
          data.unshift(cvst);
          dispatch(setConversation(data));
          check = true;
          return;
        }
      }
    });
    if (!check) {
      data = conversation.conversations.filter((item) => item._id !== "");
      console.log(data);
      const initial = {
        _id: "",
        founder: auth.user._id,
        isGroup: false,
        content: "",
        totalUser: [userSearch, auth.user],
        media: [],
      };
      data.unshift(initial);
      dispatch(setConversation(data));
      //dispatch(pushConversations({ userSearch, auth: auth.user }));

      // if (cvst._id === "") {
      //   data = conversation.conversations.filter((item) => item._id !== "");
      //   dispatch(setConversation(data));
      // }
    }
  };
  useEffect(() => {
    if (searchName) {
      dispatch(searchUser(searchName));
      setIsSearch(true);
    } else {
      setIsSearch(false);
      dispatch(clearSearchUser());
    }
  }, [dispatch, searchName]);
  return (
    <div className="topbarLeft">
      {!isInputChat && (
        <>
          {isSearch ? (
            <div onClick={() => setIsSearch(!isSearch)}>
              <i className="fa fa-arrow-left left-icon"></i>
            </div>
          ) : (
            <a href="/">
              <img
                src="https://res.cloudinary.com/dujubytqp/image/upload/v1638191132/social-upload/br285x7yowwuls1fh8ii.png"
                alt="https://res.cloudinary.com/dujubytqp/image/upload/v1638191132/social-upload/br285x7yowwuls1fh8ii.png"
                className="img-icon"
              />
            </a>
          )}
        </>
      )}
      <div
        className={`${isInputChat ? "sidebar-chat-header-input" : "searchbar"}`}
      >
        <input
          placeholder={`${
            isInputChat ? "Find on Message" : "Search for Friend - Group"
          }`}
          className={`${isInputChat ? "sidebar-chat-input" : "searchInput"}`}
          onChange={(e) => setSearchName(e.target.value)}
          onFocus={() => setIsSearch(true)}
        />
      </div>
      <div onBlur={() => setIsSearch(false)}>
        {isSearch && auth.searchUsers.length > 0 && (
          <ul className="search-list">
            {auth.searchUsers.map((user, index) => (
              <li onClick={handleCancel} key={index}>
                {isInputChat ? (
                  <span
                    onClick={() => handleSearchChat(user)}
                    className="search-item"
                  >
                    <img src={`${user.avatar}`} alt="" />
                    <p>{user.userName}</p>
                  </span>
                ) : (
                  <Link className="search-item" to={`/profile/${user._id}`}>
                    <img src={`${user.avatar}`} alt="" />
                    <p>{user.userName}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchUser;
