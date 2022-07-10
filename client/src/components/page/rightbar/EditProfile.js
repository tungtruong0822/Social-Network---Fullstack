import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editProfile } from "../../../redux/reducers/auth";

function EditProfile({ setIsEditProfile, isEditProfile, profile, auth }) {
  const dispatch = useDispatch();
  const [editUser, setEditUser] = useState({});
  const [userName, setUserName] = useState("");
  const [desc, setDesc] = useState("");
  const [from, setFrom] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [coverPicture, setCoverPicture] = useState([]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(editProfile(editUser));
  };

  const showImage = (url) => (
    <img className="img-thumbnail" src={url} alt={url} />
  );

  useEffect(() => {
    // setEditUser({
    //   ...editUser,
    //   userName: profile.userName,
    //   avatar: profile.avatar,
    //   coverPicture: profile.coverPicture,
    //   desc: profile.desc,
    //   from: profile.from,
    // });
    setUserName(profile.userName);
    setDesc(profile.desc);
    setFrom(profile.from);
    setAvatar(profile.avatar);
    setCoverPicture(profile.coverPicture);
  }, [profile]);
  useEffect(() => {
    // setEditUser({
    //   ...editUser,
    //   userName: profile.userName,
    //   avatar: profile.avatar,
    //   coverPicture: profile.coverPicture,
    //   desc: profile.desc,
    //   from: profile.from,
    // });
    setEditUser({
      _id: auth.user._id,
      userName,
      avatar,
      coverPicture,
      desc,
      from,
    });
  }, [auth.user, userName, avatar, coverPicture, desc, from]);

  return (
    <div className="editProfile">
      <div className="editProfile_form">
        <form onSubmit={handleUpdateProfile}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setIsEditProfile(!isEditProfile)}
          >
            ⨯
          </span>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              UserName
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Avatar
            </label>
            <input
              type="file"
              className="form-control"
              id="avatar"
              accept="image/*"
              onChange={(e) => setAvatar([...e.target.files])}
            />
            <div className="edit_avatar">
              {Array.isArray(avatar)
                ? avatar.map((img) => showImage(URL.createObjectURL(img)))
                : showImage(avatar)}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="coverPicture" className="form-label">
              CoverPicture
            </label>
            <input
              type="file"
              className="form-control"
              id="coverPicture"
              accept="image/*"
              onChange={(e) => setCoverPicture([...e.target.files])}
            />
            <div className="edit_coverPicture">
              {Array.isArray(coverPicture)
                ? coverPicture.map((img) => showImage(URL.createObjectURL(img)))
                : showImage(coverPicture)}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Description is maximum 200 characters"
              className="form-control"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="From" className="form-label">
              From
            </label>
            <input
              type="text"
              className="form-control"
              id="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={handleUpdateProfile}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
