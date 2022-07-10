/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SearchUser from "../../SearchUser";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  clearMeesages,
} from "../../../redux/reducers/conversation";
import AddUserCvst from "./AddUserCvst";

function SidebarChat({
  auth,
  setRecipient,
  recipient,
  isSearchAddUser,
  setIsSearchAddUser,
}) {
  const dispatch = useDispatch();

  const [isFocused, setIsFocused] = useState(0);
  const { conversation } = useSelector((state) => state);
  const isInputChat = true;

  const handleOnChangeRecipient = (cvst, index) => {
    setRecipient(cvst);
    if (cvst._id) dispatch(getMessages(cvst?._id));
    else dispatch(clearMeesages());

    setIsFocused(index);
  };
  useEffect(() => {
    if (conversation.conversations) {
      setRecipient(conversation.conversations[0]);
      setIsFocused(0);
    }
    if (conversation.conversations[0]?._id)
      dispatch(getMessages(conversation.conversations[0]?._id));
    else dispatch(clearMeesages());
  }, [conversation.conversations]);
  return (
    <div className="sidebar-chat">
      <div className="sidebar-chat-header">
        <h3>Chat</h3>
        <div className="sidebar-chat-header-icons">
          <i className="fa fa-ellipsis-h sidebar-chat-header-icon"></i>
          <i className="fas fa-video sidebar-chat-header-icon"></i>
          <i className="fa fa-edit sidebar-chat-header-icon"></i>
        </div>
      </div>

      {isSearchAddUser ? (
        <AddUserCvst
          recipient={recipient}
          setIsSearchAddUser={setIsSearchAddUser}
        />
      ) : (
        <>
          <SearchUser isInputChat={isInputChat} />

          <div className="sidebar-chat-content">
            {conversation?.conversations ? (
              <ul className="sidebar-chat-list">
                {conversation?.conversations?.map((cvst, index) => (
                  <li
                    onClick={() => handleOnChangeRecipient(cvst, index)}
                    key={index}
                    className={`sidebar-chat-item ${
                      isFocused === index ? "item-focused" : ""
                    }`}
                  >
                    {cvst?.isGroup ? (
                      <img
                        className="sidebar-chat-item-img"
                        src={cvst.avatarGroup}
                        alt=""
                      />
                    ) : (
                      <img
                        className="sidebar-chat-item-img"
                        src={
                          cvst?.totalUser.filter(
                            (user) => user._id !== auth.user._id
                          )[0].avatar
                        }
                        alt=""
                      />
                    )}
                    <div className="sidebar-chat-item-right">
                      {cvst?.isGroup ? (
                        <span className="sidebar-chat-item-right-name">
                          {cvst.nameGroup}
                        </span>
                      ) : (
                        <span className="sidebar-chat-item-right-name">
                          {
                            cvst?.totalUser.filter(
                              (user) => user._id !== auth.user._id
                            )[0].userName
                          }
                        </span>
                      )}
                      <span>
                        {cvst?.content.length !== 0
                          ? cvst?.content.length > 12
                            ? cvst?.content.slice(0, 10) + " ..."
                            : cvst?.content
                          : cvst?.media.length > 0
                          ? "Media detection ..."
                          : "No message"}
                        <span style={{ float: "right", color: "gray" }}>
                          1 hour
                        </span>
                      </span>
                    </div>

                    {cvst?.isGroup ? (
                      <img
                        className="sidebar-chat-item-img-thumbnail"
                        src={cvst?.avatarGroup}
                        alt=""
                      />
                    ) : (
                      <img
                        className="sidebar-chat-item-img-thumbnail"
                        src={
                          cvst?.totalUser.filter(
                            (user) => user._id !== auth.user._id
                          )[0].avatar
                        }
                        alt=""
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              "No Message"
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SidebarChat;
