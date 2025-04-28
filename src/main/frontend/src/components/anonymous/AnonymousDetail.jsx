import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnonymousComment from '../anonymous/AnonymousComment';
import '../../css/anonymous/AnonymousDetail.css';

function AnonymousDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));

  // ✅ 수정: 닉네임 기준 비교
  const isAuthor = loginUser && post && loginUser.nickname === post.nickname;

  useEffect(() => {
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [loginUser, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/anonymous-posts/${id}`, {
          withCredentials: true,
        });
        setPost(res.data);
      } catch (err) {
        console.error(err);
        alert('API 실패 - 더미 데이터 사용');
        setPost({
          id: id,
          title: '더미 제목',
          content: '이건 더미 상세입니다.',
          mbti: 'INFP',
          nickname: '더미유저', // 더미에도 닉네임 설정
          createdAt: new Date().toISOString(),
          viewCount: 100,
          likeCount: 10,
          imageUrl: null,
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    alert('추천 기능은 비활성화 상태입니다.');
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`http://localhost:8080/api/anonymous-posts/${id}`, {
        withCredentials: true,
      });
      alert('삭제 완료');
      navigate('/anonymous');
    } catch (err) {
      console.error('삭제 실패', err);
      alert('삭제 실패');
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="anonymous-page">
      <div className="anonymous-layout">
        <div className="detail">
          <h1 className="title">{post.title}</h1>

          <div className="info-row">
            <div className="left">
              <span className="writer">MBTI: {post.mbti}</span>
              <span className="date">
                {new Date(post.createdAt).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                })}
              </span>
            </div>
            <div className="right">
              <span>조회 {post.viewCount}</span>
              <span>추천 {post.likeCount}</span>
            </div>
          </div>

          <div className="content">
            {post.imageUrl && (
              <>
                <img
                  src={`http://localhost:8080${post.imageUrl}`}
                  alt="첨부 이미지"
                  className="post-image"
                  style={{
                    maxWidth: '400px',
                    width: '100%',
                    height: 'auto',
                    marginBottom: '16px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowModal(true)}
                />
                {showModal && (
                  <div
                    className="modal-overlay"
                    onClick={() => setShowModal(false)}
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1000,
                    }}
                  >
                    <img
                      src={`http://localhost:8080${post.imageUrl}`}
                      alt="큰 이미지"
                      style={{ maxHeight: '90%', maxWidth: '90%' }}
                    />
                  </div>
                )}
              </>
            )}
            <p>{post.content}</p>
          </div>

          <div className="recommend">
            <button className="recommend-btn" onClick={handleLike}>추천하기</button>
          </div>

          <div className="buttons">
            <button onClick={() => navigate('/anonymous')}>목록으로</button>
            {isAuthor && (
              <>
                <button onClick={() => navigate(`/anonymous/write?id=${id}`)}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </>
            )}
          </div>

          <AnonymousComment postId={id} />
        </div>
      </div>
    </div>
  );
}

export default AnonymousDetail;
