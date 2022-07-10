import React from "react";
import { useSelector } from "react-redux";
import PostSingle from "../post/PostSingle";
import Share from "../../components/Share";

function Feed({ posts }) {
  const { auth, socket, post } = useSelector((state) => state);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share user={auth.user} />
        <div className="post-container">
          {/* thằng center  */}
          <div className="post-container-center">
            {/* thằng Width  */}
            {posts.length > 0 ? (
              posts.map((postSg, index) => (
                <PostSingle
                  user={auth.user}
                  key={index}
                  post={postSg}
                  postParent={post}
                  socket={socket[0]}
                />
              ))
            ) : (
              <h1 style={{ textAlign: "center", marginTop: "20px" }}>
                No Port
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
