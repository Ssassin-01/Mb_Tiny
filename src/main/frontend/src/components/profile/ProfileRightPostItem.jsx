import React from "react";
import '../../css/profile/Profile.css';

const PostItem = ({ post, isAnonymous }) => {
  // ✅ 날짜 포맷 함수
  const formatDate = (dateStr) => {
    if (!dateStr) return '날짜 없음';
    const date = new Date(dateStr);
    if (isNaN(date)) return '날짜 오류';
    return date.toLocaleString('ko-KR');
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
          <p className="date">{formatDate(post.createDate)}</p>
        </>
      )}
    </div>
  );
};

export default PostItem;
