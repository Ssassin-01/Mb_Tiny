import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/feed/FeedComments.css';
import { useNavigate } from 'react-router-dom';

function FeedCard({ feed, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(feed.content);
  const [editedImage, setEditedImage] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const [liked, setLiked] = useState(feed.liked);

  const handleProfileClick = () => {
    navigate(`/profile/${feed.nickname}`);
  };

  // ✅ 날짜 포맷 함수 추가
  const formatDateOrTime = (input) => {
    const raw = input || feed.createdAt || feed.createDate;
    if (!raw) return '날짜 없음';

    const createdDate = new Date(raw);
    if (isNaN(createdDate.getTime())) return '날짜 오류';

    const now = new Date();
    const isToday =
      createdDate.getFullYear() === now.getFullYear() &&
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getDate() === now.getDate();

    if (isToday) {
      return createdDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } else {
      const month = String(createdDate.getMonth() + 1).padStart(2, '0');
      const date = String(createdDate.getDate()).padStart(2, '0');
      return `${month}-${date}`;
    }
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(feed.content);
    setEditedImage(null);
  };
  const handleSaveClick = () => {
    onUpdate(feed.id, editedContent, editedImage);
    setIsEditing(false);
  };
  const handleImageChange = (e) => {
    setEditedImage(e.target.files[0]);
  };

  useEffect(() => {
    document.body.style.overflow = showCommentsModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showCommentsModal]);

  const openCommentsModal = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/posts/${feed.id}/comments`, { withCredentials: true });
      setComments(res.data);
      setShowCommentsModal(true);
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    try {
      await axios.post(`http://localhost:8080/api/posts/${feed.id}/comments`, {
        content: newComment
      }, { withCredentials: true });

      setNewComment('');
      const res = await axios.get(`http://localhost:8080/api/posts/${feed.id}/comments`, { withCredentials: true });
      setComments(res.data);
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleLikeClick = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/posts/${feed.id}/like`, null, { withCredentials: true });
      setLiked(res.data.like);
    } catch (error) {
      console.error('좋아요 실패:', error);
      alert('좋아요에 실패했습니다.');
    }
  };

  const closeModal = () => {
    setShowCommentsModal(false);
  };

  return (
    <div className="feed-card">
      {/* 헤더 */}
      <div className="feed-header">
        <img
          src="/img/default-profile.png"
          alt="프로필"
          className="feed-profile"
          onClick={handleProfileClick}
          style={{ cursor: 'pointer' }}
        />
        <div className="feed-info">
          <div className="feed-nickname" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
            {feed.mbti ? `[${feed.mbti}] ` : ''}{feed.nickname}
          </div>
          <div className="feed-time">{formatDateOrTime()}</div> {/* ✅ 수정된 부분 */}
        </div>
      </div>

      {/* 본문 */}
      {isEditing ? (
        <>
          <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} rows="4" className="edit-textarea" />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </>
      ) : (
        <>
          <div className="feed-content">{feed.content}</div>
          {feed.imageUrl && (
            <img src={`http://localhost:8080${feed.imageUrl}`} alt="피드 이미지" className="feed-image" />
          )}
        </>
      )}

      {/* 버튼 */}
      <div className="feed-actions">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>저장</button>
            <button onClick={handleCancelClick}>취소</button>
          </>
        ) : (
          <>
            <button
              onClick={handleLikeClick}
              className={liked ? 'like-btn liked' : 'like-btn'}
            >
              ❤️ 좋아요
            </button>
            <button onClick={openCommentsModal}>💬 댓글</button>
            <button onClick={handleEditClick}>✏️ 수정</button>
            <button onClick={() => onDelete(feed.id)}>🗑 삭제</button>
          </>
        )}
      </div>

      {/* 댓글 모달 */}
      {showCommentsModal && (
        <div className="comment-modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>X</button>
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <strong>{comment.nickname}</strong>: {comment.content}
                </div>
              ))}
            </div>
            <div className="comment-input">
              <input
                type="text"
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleCommentSubmit}>작성</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedCard;
