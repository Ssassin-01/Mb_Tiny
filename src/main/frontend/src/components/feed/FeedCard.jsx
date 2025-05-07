import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/feed/FeedComments.css';

function FeedCard({ feed, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(feed.content);
  const [editedImage, setEditedImage] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loginUserNickname, setLoginUserNickname] = useState(null);
  const [liked, setLiked] = useState(feed.liked);
  const [message, setMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const navigate = useNavigate();

  const showAutoBannerThenLogin = (text) => {
    setMessage(text);
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
      navigate('/login');
    }, 2000);
  };

  useEffect(() => {
    const user = sessionStorage.getItem('loginUser');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setLoginUserNickname(parsed.nickname);
      } catch (e) {
        console.error('세션 파싱 오류:', e);
      }
    }
  }, []);

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

    return isToday
      ? createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      : `${String(createdDate.getMonth() + 1).padStart(2, '0')}-${String(createdDate.getDate()).padStart(2, '0')}`;
  };

  const handleProfileClick = () => {
    if (!loginUserNickname) {
      showAutoBannerThenLogin('로그인이 필요합니다.');
      return;
    }
    if (loginUserNickname === feed.nickname) {
      navigate('/profile/me');
    } else {
      navigate(`/profile/${feed.nickname}`);
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

  const openCommentsModal = async () => {
    if (!loginUserNickname) {
      showAutoBannerThenLogin('로그인이 필요합니다.');
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/posts/${feed.id}/comments`, {
        withCredentials: true,
      });
      setComments(res.data);
      setShowCommentsModal(true);
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!loginUserNickname) {
      showAutoBannerThenLogin('로그인이 필요합니다.');
      return;
    }
    if (newComment.trim() === '') return;

    try {
      await axios.post(
        `http://localhost:8080/api/posts/${feed.id}/comments`,
        { content: newComment },
        { withCredentials: true }
      );
      setNewComment('');
      const res = await axios.get(`http://localhost:8080/api/posts/${feed.id}/comments`, {
        withCredentials: true,
      });
      setComments(res.data);
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleLikeClick = async () => {
    if (!loginUserNickname) {
      showAutoBannerThenLogin('로그인이 필요합니다.');
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:8080/api/posts/${feed.id}/like`,
        null,
        { withCredentials: true }
      );
      setLiked(res.data.like);
    } catch (error) {
      console.error('좋아요 실패:', error);
    }
  };

  const closeModal = () => setShowCommentsModal(false);

  return (
    <>
      {showBanner && <div className="alert-message">{message}</div>}

      <div className="feed-card">
        <div className="feed-header">
          <img
            src={feed.memberImageUrl ? `http://localhost:8080${feed.memberImageUrl}` : '/img/default-profile.png'}
            onClick={handleProfileClick}
            alt="프로필"
            className="feed-profile"
            style={{ cursor: 'pointer' }}
          />
          <div className="feed-info">
            <div className="feed-nickname" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
            <span className="feed-mbti-tag">
              {feed.mbti ? `${feed.mbti}` : ''}
            </span>
              {feed.nickname}
            </div>
            <div className="feed-time">{formatDateOrTime()}</div>
          </div>
        </div>

        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows="4"
              className="edit-textarea"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </>
        ) : (
          <>
            <div className="feed-content">{feed.content}</div>
            {feed.imageUrl && (
              <img
                src={`http://localhost:8080${feed.imageUrl}`}
                alt="피드 이미지"
                className="feed-image"
              />
            )}
          </>
        )}

        <div className="feed-actions">
          {isEditing ? (
            <>
              <button onClick={handleSaveClick}>저장</button>
              <button onClick={handleCancelClick}>취소</button>
            </>
          ) : (
            <>
              <button onClick={handleLikeClick} className={liked ? 'like-btn liked' : 'like-btn'}>
                ❤️ 좋아요
              </button>
              <button onClick={openCommentsModal}>💬 댓글</button>
              {loginUserNickname === feed.nickname && (
                <>
                  <button onClick={handleEditClick}>✏️ 수정</button>
                  <button onClick={() => onDelete(feed.id)}>🗑 삭제</button>
                </>
              )}
            </>
          )}
        </div>

        {showCommentsModal && (
          <div className="floating-comment-box">
            <div className="comment-header">
              <span>💬 댓글</span>
              <button className="close-button" onClick={closeModal}>✖</button>
            </div>
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
        )}
      </div>
    </>
  );
}

export default FeedCard;
