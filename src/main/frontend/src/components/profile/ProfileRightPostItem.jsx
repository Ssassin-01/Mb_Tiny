import React from "react";
import '../../css/profile/Profile.css';

const PostItem = ({ post, isAnonymous }) => {
  // ✅ 오늘이면 시간, 아니면 MM-DD
  const formatDate = (dateStr) => {
    if (!dateStr) return '날짜 없음';
    const date = new Date(dateStr);
    if (isNaN(date)) return '날짜 오류';

    const now = new Date();
    const isToday =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    return isToday
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      : `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="feed-card">
      {isAnonymous ? (
        <>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          {post.imageUrl && (
            <img src={`http://localhost:8080${post.imageUrl}`} alt="게시글 이미지" />
          )}
          <div className="post-meta">
            <p className="date">🕒 {formatDate(post.createdAt || post.createDate)}</p>
            <p className="info">👁 조회 {post.viewCount || 0} · ❤️ 추천 {post.likeCount || 0}</p>
          </div>
        </>
      ) : (
        <>
          <p><strong>{post.writer}</strong></p>
          <p>{post.content}</p>
          {post.imageUrl && (
            <img src={`http://localhost:8080${post.imageUrl}`} alt="피드 이미지" />
          )}
          <p className="date"> {formatDate(post.createdAt || post.createDate)}</p>
        </>
      )}
    </div>
  );
};

export default PostItem;
