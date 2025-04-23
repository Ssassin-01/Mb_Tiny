import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AnonymousComment.css';

function AnonymousComment({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [color, setColor] = useState('#30d5c8');

  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  const userMbti = loginUser?.mbti || '익명';

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/posts/${postId}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error('댓글 불러오기 실패', err);
        if (postId === '1') {
          setComments([
            {
              id: 1,
              nickname: 'INFP',
              content: '댓글 더미입니다.',
              createdAt: new Date().toISOString(),
              color: '#9b59b6'
            }
          ]);
        }
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      await axios.post('http://localhost:8080/api/comments', {
        postId,
        content: newComment,
        color
      });

      const newItem = {
        id: comments.length + 1,
        nickname: userMbti,
        content: newComment,
        createdAt: new Date().toISOString(),
        color
      };
      setComments([...comments, newItem]);
      setNewComment('');
    } catch (err) {
      alert('댓글 등록 실패');
      console.error(err);
    }
  };

  return (
    <div className="comment-section">
      <h3>댓글</h3>
      <div className="comment-list">
        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <div className="comment-top">
              <span className="comment-nick" style={{ color: c.color || '#333' }}>
                {c.nickname}
              </span>
              <span className="comment-time">
                ({new Date(c.createdAt).toLocaleString()})
              </span>
            </div>
            <div className="comment-content">{c.content}</div>
          </div>
        ))}
      </div>

      <div className="color-picker" style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '8px' }}>MBTI 닉네임 색상 선택:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleAddComment}>등록</button>
      </div>
    </div>
  );
}

export default AnonymousComment;
