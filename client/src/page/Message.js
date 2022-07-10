import React, { useEffect, useState } from "react";
import FeedChat from "../components/page/massage/FeedChat";
import RightbarChat from "../components/page/massage/RightbarChat";
import SidebarChat from "../components/page/massage/SidebarChat";
import Topbar from "../components/page/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../redux/reducers/conversation";

function Message() {
  const { auth, conversation } = useSelector((state) => state);
  const [isSearchAddUser, setIsSearchAddUser] = useState(false);

  const dispatch = useDispatch();

  const [recipient, setRecipient] = useState();
  const [isRightbar, setIsRightbar] = useState(false);
  useEffect(() => {
    dispatch(getConversations({ id: auth.user._id }));
  }, [dispatch, auth.user, conversation.loading]);
  return (
    <div className="message">
      <Topbar />

      <div className="homeContainer_chat">
        <SidebarChat
          auth={auth}
          setRecipient={setRecipient}
          recipient={recipient}
          setIsSearchAddUser={setIsSearchAddUser}
          isSearchAddUser={isSearchAddUser}
        />
        {conversation.conversations.length === 0 ? (
          <p
            style={{ flex: "9", fontSize: "30px", fontWeight: "bold" }}
            className="flex_center"
          >
            No Conversation
          </p>
        ) : (
          <FeedChat
            isRightbar={isRightbar}
            setIsRightbar={setIsRightbar}
            recipient={recipient}
            setIsSearchAddUser={setIsSearchAddUser}
            isSearchAddUser={isSearchAddUser}
          />
        )}
        {isRightbar && <RightbarChat auth={auth} recipient={recipient} />}
      </div>
    </div>
  );
}

export default Message;
