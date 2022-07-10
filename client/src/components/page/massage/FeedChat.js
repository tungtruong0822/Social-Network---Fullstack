/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BotChat from "./BotChat";
import Icon from "./Icon";
import { createMessage } from "../../../redux/reducers/conversation";

function FeedChat({
  isRightbar,
  recipient,
  setIsRightbar,
  isSearchAddUser,
  setIsSearchAddUser,
}) {
  const emailInputRef = useRef(null);
  const dispatch = useDispatch();
  const { auth, conversation, socket } = useSelector((state) => state);
  const initial = {
    totalUser: [],
    sender: "",
    content: "",
    media: [],
  };
  const [msg, setMsg] = useState(initial);

  const [media, setMedia] = useState([]);
  const [contentChat, setContentChat] = useState("");
  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 10) {
        return (err = "The image/video largest is 10mb.");
      }

      return newMedia.push(file);
    });

    setMedia([...media, ...newMedia]);
    emailInputRef.current.focus();
  };
  const showImage = (url) => (
    <img className="img-thumbnail rounded" src={url} alt="images" />
  );

  const showVideo = (url) => (
    <video controls className="img-thumbnail rounded" src={url} alt="videos" />
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    if (contentChat.length > 0 || media.length > 0) {
      dispatch(createMessage({ msg, socket: socket[0] }));
    }
    setContentChat("");
    setMedia([]);
  };
  const deleteInputImage = (index) => {
    const newArray = [...media];
    newArray.splice(index, 1);
    setMedia(newArray);
  };
  useEffect(() => {
    setMsg({
      ...msg,
      sender: auth.user._id,
      content: contentChat,
      totalUser: recipient?.totalUser,
      media: media,
      conversation: recipient?._id,
    });
  }, [media, contentChat, media, auth.user._id, recipient]);
  useEffect(() => {
    emailInputRef.current.focus();
  }, [emailInputRef]);

  return (
    <div className={isRightbar ? "feed" : "feed-chat"}>
      <div className="feedchat_header">
        <div className="feedchat_header-info">
          {recipient?.isGroup ? (
            <img
              className="sidebar-chat-item-img"
              src={recipient.avatarGroup}
              alt=""
            />
          ) : (
            <img
              className="sidebar-chat-item-img"
              src={
                recipient?.totalUser.filter(
                  (user) => user._id !== auth.user._id
                )[0]?.avatar
              }
              alt=""
            />
          )}
          <div className="sidebar-chat-item-right">
            {recipient?.isGroup ? (
              <span className="sidebar-chat-item-right-name">
                {recipient.nameGroup}
              </span>
            ) : (
              <span className="sidebar-chat-item-right-name">
                {
                  recipient?.totalUser.filter(
                    (user) => user._id !== auth.user._id
                  )[0]?.userName
                }
              </span>
            )}
            <span>Active 1 hour ago</span>
          </div>
        </div>
        <div className="feedchat_footer_icons">
          <div onClick={() => setIsSearchAddUser(!isSearchAddUser)}>
            <i
              className="fa fa-plus feedchat_footer_icon"
              style={{ color: "#0084ff", backgroundColor: "white" }}
            ></i>
          </div>
          <div>
            <i
              className="fas fa-phone-alt feedchat_footer_icon"
              style={{ color: "#0084ff", backgroundColor: "white" }}
            ></i>
          </div>
          <div>
            <i
              className="fas fa-video feedchat_footer_icon"
              style={{ color: "#0084ff", backgroundColor: "white" }}
            ></i>
          </div>
          <div onClick={() => setIsRightbar(!isRightbar)}>
            <i
              className="fa fa-info-circle feedchat_footer_icon"
              style={{
                color: "#0084ff",
                backgroundColor: "white",
              }}
            ></i>
          </div>
        </div>
      </div>
      <div className="feedchat_content">
        {conversation.messages.length > 0
          ? conversation.messages.map((msg, index) => (
              <>
                {auth.user._id === msg?.sender ? (
                  <>
                    <div className={`${index > 0 && "d-none"}`}>
                      {conversation.loading ? (
                        <span className="statusSend">
                          {/* <i class="far fa-check-circle"></i> */}
                          <img
                            src="/assets/loading.gif"
                            alt="loading..."
                            className="loadingGifChat"
                          />
                        </span>
                      ) : (
                        <span className="statusSend">
                          {/* <i class="fas fa-check-circle"></i> */}
                        </span>
                      )}
                    </div>
                    <div className="feedchat_content_end">
                      <BotChat me="me" msg={msg} />
                    </div>
                  </>
                ) : (
                  <div className="feedchat_content_start">
                    <BotChat msg={msg} />
                  </div>
                )}
              </>
            ))
          : ""}
      </div>
      {media.length !== 0 && (
        <div className="showImages">
          {media.map((img, index) => (
            <div key={index} className="showImages-conntent">
              {img.url
                ? img.url.match(/video/i)
                  ? showVideo(img.url)
                  : showImage(img.url)
                : img.type.match(/video/i)
                ? showVideo(URL.createObjectURL(img))
                : showImage(URL.createObjectURL(img))}

              <span
                className="btn-delete-Input-image"
                onClick={() => deleteInputImage(index)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="feedchat_footer">
        <div className="feedchat_footer_icons">
          <label htmlFor="lableChangeMedia">
            {" "}
            <i className="fas fa-file-image feedchat_footer_icon   "></i>
          </label>
          <input
            onChange={handleChangeMedia}
            type="file"
            id="lableChangeMedia"
            style={{ display: "none" }}
            multiple
            accept="image/* , video/*"
          />
          <div>
            <i className="fas fa-sticky-note feedchat_footer_icon   "></i>
          </div>
          <div>
            {" "}
            <i className="fa fa-gift feedchat_footer_icon "></i>
          </div>
        </div>
        <div className="feedchat_footer_input">
          <form
            style={{ width: "93%", height: "55px" }}
            onSubmit={handleSubmit}
          >
            <input
              className="feedchat_footer_txt"
              type="text"
              name="contentChat"
              placeholder="Aa"
              value={contentChat}
              onChange={(e) => setContentChat(e.target.value)}
              autoComplete="off"
              ref={emailInputRef}
            />
            <div className="feedchat_footer_input_icon">
              <Icon setContentChat={setContentChat} contentChat={contentChat} />
            </div>
          </form>
        </div>

        <i className="fas fa-thumbs-up  feedchat_footer_icon-like  "></i>
      </div>
    </div>
  );
}

export default FeedChat;
