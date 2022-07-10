import React from "react";
import Topbar from "../components/page/Topbar";
import Sidebar from "../components/page/Sidebar";

function Information() {
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="informations">
          <div className="informations_content">
            <div className="card">
              <img
                src="https://res.cloudinary.com/dujubytqp/image/upload/v1645890879/social-upload/ysygkvz0bfl7mvxf4lqd.png"
                className="card-img-top img-thumbnail"
                alt="facebook"
              />
              <div className="card-body">
                <h5 className="card-title">FaceBook</h5>
                <p className="card-text">
                  My facebook , My name is dev-H
                  <a
                    style={{ color: "blue", display: "block" }}
                    href="https://www.facebook.com/huy08012001/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://www.facebook.com/huy08012001/
                  </a>
                </p>
                <a
                  href="https://www.facebook.com/huy08012001/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  {" "}
                  Go to it
                </a>
              </div>
            </div>
            <div className="card">
              <img
                src="https://res.cloudinary.com/dujubytqp/image/upload/v1645890878/social-upload/wu7atw0b5vbfdwjbxinw.jpg"
                className="card-img-top img-thumbnail"
                alt="github"
              />
              <div className="card-body">
                <h5 className="card-title">Github</h5>
                <p className="card-text">
                  My github , My name is dev-H-vn
                  <a
                    style={{ color: "blue", display: "block" }}
                    href="https://github.com/dev-H-vn/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://github.com/dev-H-vn/
                  </a>
                </p>
                <a
                  href="https://github.com/dev-H-vn/"
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Go to it
                </a>
              </div>
            </div>
            <div className="card">
              <img
                src="https://res.cloudinary.com/dujubytqp/image/upload/v1645890878/social-upload/nce7hpl1magaypcj3ufm.png"
                className="card-img-top img-thumbnail "
                alt="facebook"
              />
              <div className="card-body">
                <h5 className="card-title">Youtube</h5>
                <p className="card-text">
                  My youtuber , My name is dev-H
                  <a
                    style={{ color: "blue", display: "block" }}
                    href="https://www.youtube.com/channel/UCq4XK7IDl04bZY5hcTTK5QA"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://www.youtube.com/channel/UCq4XK7IDl04bZY5hcTTK5QA
                  </a>
                </p>
                <a
                  href="https://www.youtube.com/channel/UCq4XK7IDl04bZY5hcTTK5QA"
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Go to it
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
