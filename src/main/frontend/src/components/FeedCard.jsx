import React from 'react';

function FeedCard({ feed }) {
  return (
    <div className="feed-card">
      {/* 헤더 영역 */}
      <div className="feed-header">
        <img
          src="/img/default-profile.png"
          alt="프로필"
          className="feed-profile"
        />
        <div className="feed-info">
          <div className="feed-nickname">{feed.writer}</div>
          <div className="feed-time">
            {new Date(feed.createDate).toLocaleString()}
          </div>
        </div>
      </div>

      {/* 피드 내용 */}
      <div className="feed-content">{feed.content}</div>

      {/* 이미지가 있을 경우만 보여주기 */}
      {feed.image && (
        <img
          src={feed.image}
          alt="피드 이미지"
          className="feed-image"
        />
      )}

      {/* 피드 하단 액션 */}
      <div className="feed-actions">
        <button>❤️ 좋아요</button>
        <button>💬 댓글</button>
      </div>
    </div>
  );
}

export default FeedCard;

