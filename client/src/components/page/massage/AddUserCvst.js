import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser, clearSearchUser } from "../../../redux/reducers/auth";
import { addUserInConversation } from "../../../redux/reducers/conversation";

function AddUserCvst({ setIsSearchAddUser, recipient }) {
  const { auth } = useSelector((state) => state);
  const [searchName, setSearchName] = useState("");
  const [nameGroup, setNameGroup] = useState("");
  const [isNameGroup, setIsNameGroup] = useState(false);
  const [userSearch, setUserSearch] = useState({});

  const dispatch = useDispatch();
  const handleCancel = () => {
    setSearchName("");
    setIsSearchAddUser(false);
  };
  const handleCancelSetNameGroup = () => {
    setIsNameGroup(false);
    setNameGroup("");
  };
  const handleAddUser = (user) => {
    setUserSearch(user);
    if (nameGroup) {
      dispatch(
        addUserInConversation({
          conversationId: recipient._id,
          userId: user._id,
          isGroup: recipient.isGroup,
          authId: auth.user._id,
          nameGroup: nameGroup,
        })
      );
      handleCancel();
    } else {
      setIsNameGroup(true);
      let newName = user.userName;
      recipient.totalUser.every((user) => (newName += "," + user.userName));
      setNameGroup(newName);
    }
  };

  useEffect(() => {
    if (searchName) {
      dispatch(searchUser(searchName));
    } else {
      dispatch(clearSearchUser());
    }
    setNameGroup(recipient?.nameGroup);
  }, [dispatch, searchName, recipient]);
  return (
    <div className="AddUserCvst">
      <span className="AddUserCvst_info">Add User to Conversation</span>
      <div className="AddUserCvst_header">
        <input
          placeholder="Search user"
          className="AddUserCvst_input"
          onChange={(e) => setSearchName(e.target.value)}
          value={searchName}
          autoFocus
        />
        <div className="AddUserCvst_Cancel">
          <span className="btn btn-danger " onClick={handleCancel}>
            &times;
          </span>
        </div>
      </div>
      <div className="showSearchAddUser">
        {auth.searchUsers.length > 0 && (
          <ul className="search-list">
            {auth.searchUsers.map((user, index) => (
              <li key={index}>
                <span
                  onClick={() => handleAddUser(user)}
                  className="search-item"
                >
                  <img src={`${user.avatar}`} alt="" />
                  <p>{user.userName}</p>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isNameGroup && (
        <div className="setNameGroup">
          <div className="setNameGroup_content">
            <div className="setNameGroup_info">
              <p>Set Name Group</p>
              <span>Set empty to Name default</span>
              <i>name Group is :{`${nameGroup}`}</i>
            </div>
            <div className="setNameGroup_input">
              <input
                type="text"
                placeholder="Name Group Chat"
                autoFocus
                onChange={(e) => setNameGroup(e.target.value)}
              />
            </div>
            <div className="setNameGroup_btns">
              <button
                onClick={handleCancelSetNameGroup}
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddUser(userSearch)}
                className="btn btn-info"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUserCvst;
