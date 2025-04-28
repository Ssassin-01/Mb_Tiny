import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/anonymous/AnonymousComment.css';

function AnonymousComment({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [color, setColor] = useState('#30d5c8');

  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  const userMbti = loginUser?.mbti || '익명';
  const userId = loginUser?.id;

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
              userId: 1,
              nickname: 'INFP',
              content: '댓글 더미입니다.',
              createdAt: new Date().toISOString(),
              color: '#9b59b6'
            },
            {
              id: 2,
              userId: 2,
              nickname: 'ENFP',
              content: '남의 댓글입니다.',
              createdAt: new Date().toISOString(),
              color: '#f39c12'
            }
          ]);
        }
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    const newItem = {
      id: comments.length + 1,
      userId,
      nickname: userMbti,
      content: newComment,
      createdAt: new Date().toISOString(),
      color
    };

    try {
      await axios.post('http://localhost:8080/api/comments', {
        postId,
        content: newComment,
        color
      });
      setComments([...comments, newItem]);
      setNewComment('');
    } catch (err) {
      alert('댓글 등록 실패 (더미로 처리)');
      setComments([...comments, newItem]);
      setNewComment('');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setComments(comments.filter(c => c.id !== id));
      alert('삭제 완료 (더미 처리)');
    }
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleEditSave = (id) => {
    setComments(
      comments.map(c => (c.id === id ? { ...c, content: editedContent } : c))
    );
    setEditingCommentId(null);
    alert('수정 완료 (더미 처리)');
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

            {editingCommentId === c.id ? (
              <div>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  style={{ width: '100%', marginBottom: '6px', fontSize: '14px' }}
                />
                <div className="comment-actions">
                  <button onClick={() => handleEditSave(c.id)}>저장</button>
                  <button onClick={() => setEditingCommentId(null)}>취소</button>
                </div>
              </div>
            ) : (
              <>
                <div className="comment-content">{c.content}</div>
                {c.userId === userId && (
                  <div className="comment-actions">
                    <button onClick={() => handleEdit(c)}>수정</button>
                    <button onClick={() => handleDelete(c.id)}>삭제</button>
                  </div>
                )}
              </>
            )}
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
