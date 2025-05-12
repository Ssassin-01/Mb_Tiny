import React from "react";
import '../../css/profile/Profile.css';

const PostItem = ({ post, isAnonymous }) => {
  // 날짜 포맷 함수
  const formatDate = (dateStr) => {
    if (!dateStr) return '날짜 없음';
    const date = new Date(dateStr);
    return isNaN(date) ? '날짜 오류' : date.toLocaleString('ko-KR');
  };

  const formattedDate = formatDate(post.createdAt || post.createDate);

  return (
    <div className="feed-card">
      {isAnonymous ? (
        <>
          <h4 className="post-title">{post.title}</h4>
          <p className="post-content">{post.content}</p>
          {post.imageUrl && (
            <img
              src={`http://localhost:8080${post.imageUrl}`}
              alt="게시글 이미지"
              className="feed-image"
            />
          )}
          <div className="post-meta">
            <p className="date">🕒 {formattedDate}</p>
            <p className="info">👁 조회 {post.viewCount || 0} · ❤️ 추천 {post.likeCount || 0}</p>
          </div>
        </>
      ) : (
        <>
          <p className="post-writer"><strong>{post.writer || post.nickname}</strong></p>
          <p className="post-content">{post.content}</p>
          {post.imageUrl && (
            <img
              src={`http://localhost:8080${post.imageUrl}`}
              alt="피드 이미지"
              className="feed-image"
            />
          )}
          <p className="date">🕒 {formattedDate}</p>
        </>
      )}
    </div>
  );
};

export default PostItem;
