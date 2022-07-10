import React, { useState } from "react";

import CommentDisplay from "./CommentDisplay";

function Comment({ post }) {
  const [isReadMore, setIsReadMore] = useState(false);
  return (
    <>
      {post.comments.map((comment, index) =>
        isReadMore ? (
          <CommentDisplay post={post} comment={comment} />
        ) : (
          index < 3 && <CommentDisplay post={post} comment={comment} />
        )
      )}
      <span
        style={{
          cursor: "pointer",
          fontSize: "12px",
          color: "orange",
          marginLeft: "5px",
        }}
        onClick={() => setIsReadMore(!isReadMore)}
      >
        {post.comments.length > 3
          ? isReadMore
            ? "hide more comments"
            : "show more comments"
          : ""}
      </span>
    </>
  );
}

export default Comment;
