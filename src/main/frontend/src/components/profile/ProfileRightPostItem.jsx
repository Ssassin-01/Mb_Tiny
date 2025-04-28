import React from "react";
import '../../css/profile/Profile.css';

const PostItem = ({ post, isAnonymous }) => (
  <div className="feed-card">
    {isAnonymous ? (
      <>
        <h4>{post.title}</h4>
        <p>{post.content}</p>
        <p className="date">{post.createDate}</p>
      </>
    ) : (
      <>
        <p><strong>{post.writer}</strong></p>
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="피드 이미지" />}
        <p className="date">{post.createDate}</p>
      </>
    )}
  </div>
);

export default PostItem;
