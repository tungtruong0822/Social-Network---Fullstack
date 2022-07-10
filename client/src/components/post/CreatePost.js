/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../redux/reducers/post";

function CreatePost({ user, setIsShare, postEdit, isEdit, setIsEdit }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const intial = { img: [], userId: "", desc: "" };
  const [post, setPost] = useState(intial);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");
  const [err, setErr] = useState("");

  const handleChangeImage = (e) => {
    setErr("");
    const files = [...e.target.files];
    let newImages = [];
    files.forEach((file) => {
      if (!file) return setErr("File does not exist");

      if (
        file.type === "image/jpeg" &&
        file.type === "image/png" &&
        file.size > 1024 * 1024 * 5
      ) {
        return setErr("The image largest is 5mb");
      } else if (file.type === "video/mp4" && file.size > 1024 * 1024 * 20) {
        return setErr("The video largest is 5mb");
      }

      return newImages.push(file);
    });
    setImages([...images, ...newImages]);
  };
  const deleteInputImage = (index) => {
    const newArray = [...images];
    newArray.splice(index, 1);
    setImages(newArray);
  };
  const onChangevalue = (e) => {
    setErr("");
    setContent(e.target.value);
  };
  const handleClose = () => {
    if (setIsShare) {
      setIsShare(false);
    } else {
      setIsEdit(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content && images.length === 0) {
      return setErr("Please add your content or images ");
    } else if (isEdit) {
      dispatch(updatePost({ authId: auth.user._id, post: post }));
      //setIsEdit(false);
    } else {
      dispatch(createPost(post));
      //setIsEdit(false);
    }
  };

  const showImage = (url) => (
    <img className="img-thumbnail rounded" src={url} alt="images" />
  );

  const showVideo = (url) => (
    <video controls className="img-thumbnail rounded" src={url} alt="videos" />
  );

  useEffect(() => {
    setPost({
      ...post,
      img: [...images],
      userId: `${user._id}`,
      desc: `${content}`,
    });
  }, [images, content, user._id]);
  useEffect(() => {
    if (isEdit && postEdit) {
      setPost({
        ...post,
        _id: postEdit._id,
        img: [...postEdit.img],
        userId: `${postEdit.userId._id}`,
        desc: `${postEdit.desc}`,
      });
      setImages([...postEdit.img]);
    }
  }, []);
  return (
    <div className="cpn_show_share">
      <form onSubmit={handleSubmit} className="cpn_show_share-conponent">
        <div className="cpn_show_share-header">
          <span className="cpn_show_share-Close" onClick={handleClose}>
            &times;
          </span>
          <h3 style={{ textAlign: "center", padding: "10px" }}>
            {isEdit ? "Edit Post @@" : "Create new Post @@"}
          </h3>
          <hr style={{ margin: "5px" }} />
          <img
            style={{ marginLeft: "15px", marginBottom: "5px" }}
            className="shareProfileImg"
            src={user.avatar}
            alt=""
          />
          <span>{user.userName}</span>
        </div>
        <div className="cpn_show_share-body">
          <textarea
            placeholder={`What's in your mind ${user.userName}?`}
            className="shareInput-cpn"
            style={{ paddingLeft: "15px" }}
            onChange={onChangevalue}
            defaultValue={isEdit ? postEdit.desc : ""}
          />
          <hr style={{ margin: "5px" }} />
          <div className="inputImage">
            <div className="inputImage-content">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="UpLoad Video"
              >
                <label htmlFor="">
                  <i className="fa fa-camera" aria-hidden="true"></i>
                </label>
              </button>
              <div className="file_upload">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="UpLoad Image"
                >
                  <label htmlFor="file">
                    <i className="fa fa-image" aria-hidden="true"></i>
                  </label>
                </button>
                <input
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  accept="image/* , video/*"
                  style={{ display: "none" }}
                  onChange={handleChangeImage}
                />
              </div>
            </div>
          </div>

          {images.length !== 0 && (
            <div className="showImages">
              {images.map((img, index) => (
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
        </div>
        <div className="cpn_show_sharefooter">
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Save" : "Post"}
          </button>
        </div>
        <span
          className="text-danger text-center"
          style={{ margin: "10px", textDecoration: "underline" }}
        >
          {err}
        </span>
      </form>
    </div>
  );
}

export default CreatePost;
