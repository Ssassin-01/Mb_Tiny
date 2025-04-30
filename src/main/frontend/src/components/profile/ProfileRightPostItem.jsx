import React from "react";
import '../../css/profile/Profile.css';

const PostItem = ({ post, isAnonymous }) => (
  <div className="feed-card">
    {isAnonymous ? (
      <>
        <h4>{post.title}</h4>
        <p>{post.content}</p>
        {post.imageUrl && <img src={`http://localhost:8080${post.imageUrl}`} alt="게시글 이미지" />}
        <p className="date">{post.createDate}</p>
      </>
    ) : (
      <>
        <p><strong>{post.writer}</strong></p>
        <p>{post.content}</p>
        {post.imageUrl && <img src={`http://localhost:8080${post.imageUrl}`} alt="피드 이미지" />}
        <p className="date">{post.createDate}</p>
      </>
    )}
  </div>
);

export default PostItem;
