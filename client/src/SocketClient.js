import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikeAndUnlike } from "./redux/reducers/post";
import {
  pushRealtimeMessage,
  getConversations,
} from "./redux/reducers/conversation";

function SocketClient() {
  const { socket, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket[0] && auth.user._id) {
      socket[0].emit("joinUser", auth.user._id);
    }
  }, [socket, auth.user._id]);
  useEffect(() => {
    if (socket[0]) {
      socket[0].on("likeToClient", (newpost) => {
        dispatch(setLikeAndUnlike(newpost));
      });
    }
  }, [socket, dispatch]);
  useEffect(() => {
    if (socket[0]) {
      socket[0].on("createMessageToClient", (newMsg) => {
        dispatch(pushRealtimeMessage(newMsg));
        dispatch(getConversations({ id: auth.user._id }));
      });
    }
  }, [socket, dispatch, auth.user]);
  return <div></div>;
}

export default SocketClient;
