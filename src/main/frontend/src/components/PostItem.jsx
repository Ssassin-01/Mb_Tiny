import React from "react";

const PostItem = ({ username, content, time }) => {
  return (
    <div className="post-item">
      <div className="post-header">
        <strong>{username}</strong>
        <span className="post-time">{time}</span>
      </div>
      <div className="post-content">{content}</div>
    </div>
  );
};

export default PostItem;
