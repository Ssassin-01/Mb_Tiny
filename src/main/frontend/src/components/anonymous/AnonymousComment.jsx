import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/anonymous/AnonymousComment.css';

function AnonymousComment({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [color, setColor] = useState('#30d5c8');

  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  const loginEmail = loginUser?.email;
  const loginMbti = loginUser?.mbti;

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/anonymous-posts/${postId}/comments`,
        {
          withCredentials: true,
        }
      );
      setComments(res.data);
    } catch (err) {
      console.error('댓글 불러오기 실패', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // ✅ 댓글 작성 (현재시간 추가)
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const now = new Date().toISOString(); // 현재시간 생성

    try {
      await axios.post(
        `http://localhost:8080/api/anonymous-posts/${postId}/comments`,
        {
          content: newComment,
          color: color,
          mbti: loginMbti,
          createdAt: now, // ✅ 현재 시간도 같이 보냄
        },
        { withCredentials: true }
      );
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('댓글 작성 실패', err);
    }
  };

  const handleEditStart = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditSave = async () => {
    if (!editContent.trim()) return;

    try {
      await axios.put(
        `http://localhost:8080/api/anonymous-posts/${postId}/comments/${editingId}`,
        { content: editContent, color: color },
        { withCredentials: true }
      );
      setEditingId(null);
      setEditContent('');
      fetchComments();
      alert('✅ 수정 완료');
    } catch (err) {
      console.error('댓글 수정 실패', err);
      alert('❌ 수정 실패: 본인만 수정할 수 있습니다.');
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/anonymous-posts/${postId}/comments/${commentId}`,
        {
          withCredentials: true,
        }
      );
      fetchComments();
      alert('✅ 삭제 완료');
    } catch (err) {
      console.error('댓글 삭제 실패', err);
      alert('❌ 삭제 실패: 본인만 삭제할 수 있습니다.');
    }
  };

  return (
    <div className='comment-section'>
      <h3>댓글</h3>

      <div className='comment-list'>
        {comments.length === 0 ? (
          <p>아직 댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className='comment-item'>
              <div className='comment-top'>
                <span
                  className='comment-mbti'
                  style={{ color: comment.color || '#333' }}
                >
                  {comment.mbti}
                </span>
                <span className='comment-time'>
                  (
                  {comment.createdAt && !isNaN(new Date(comment.createdAt))
                    ? new Date(comment.createdAt).toLocaleString('ko-KR')
                    : ''}
                  )
                </span>
              </div>

              {editingId === comment.id ? (
                <div className='comment-edit'>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder='댓글을 수정하세요'
                  />
                  <div className='comment-actions'>
                    <button onClick={handleEditSave}>저장</button>
                    <button onClick={() => setEditingId(null)}>취소</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className='comment-content'>{comment.content}</div>

                  {/* ✅ 모든 댓글에 수정/삭제 버튼 보이게 */}
                  <div className='comment-actions'>
                    <button onClick={() => handleEditStart(comment)}>
                      수정
                    </button>
                    <button onClick={() => handleDelete(comment.id)}>
                      삭제
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      <div className='color-picker' style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '8px' }}>MBTI 닉네임 색상 선택:</label>
        <input
          type='color'
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div className='comment-form'>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder='댓글을 입력하세요'
        />
        <button onClick={handleAddComment}>등록</button>
      </div>
    </div>
  );
}

export default AnonymousComment;
