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
  const [isLiked, setIsLiked] = useState(false); // 추천 상태

  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));

  useEffect(() => {
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [loginUser, navigate]);

  useEffect(() => {
    if (!id) return; // ✅ id 없으면 아무것도 안함

    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/anonymous-posts/${id}`,
          { withCredentials: true }
        );
        setPost(res.data);

        // ✅ 서버 응답 성공했을 때, id 준비된 이후에 sessionStorage 읽기
        const likedFromStorage = sessionStorage.getItem(`liked-${id}`);
        setIsLiked(likedFromStorage === 'true');
      } catch (err) {
        console.error(err);
        alert('게시글 불러오기 실패');
      }
    };

    fetchPost();
  }, [id]); // ✅ id 변할 때마다 실행

  const handleLikeToggle = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/anonymous-posts/${id}/like`,
        {},
        { withCredentials: true }
      );

      const liked = res.data.like;

      setPost((prev) => ({
        ...prev,
        likeCount: liked ? prev.likeCount + 1 : prev.likeCount - 1,
      }));

      setIsLiked(liked);

      if (liked) {
        sessionStorage.setItem(`liked-${id}`, 'true');
      } else {
        sessionStorage.removeItem(`liked-${id}`);
      }

    } catch (err) {
      console.error('추천 토글 실패', err);
      alert('오류가 발생했습니다.');
    }
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

  const handleEdit = () => {
    navigate(`/anonymous/write?id=${id}`);
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className='anonymous-page'>
      <div className='anonymous-layout'>
        <div className='detail'>
          <h1 className='title'>{post.title}</h1>

          <div className='info-row'>
            <div className='left'>
              <span className='writer'>MBTI: {post.mbti}</span>
              <span className='date'>
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
            <div className='right'>
              <span>조회 {post.viewCount}</span>
              <span>추천 {post.likeCount}</span>
            </div>
          </div>

          <div className='content'>
            {post.imageUrl && (
              <>
                <img
                  src={`http://localhost:8080${post.imageUrl}`}
                  alt='첨부 이미지'
                  className='post-image'
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
                    className='modal-overlay'
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
                      alt='큰 이미지'
                      style={{ maxHeight: '90%', maxWidth: '90%' }}
                    />
                  </div>
                )}
              </>
            )}
            <p>{post.content}</p>
          </div>

          <div className='recommend'>
            <button className='recommend-btn' onClick={handleLikeToggle}>
              {isLiked ? '추천취소' : '추천하기'}
            </button>
          </div>

          <div className='buttons'>
            <button onClick={() => navigate('/anonymous')}>목록으로</button>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>

          <AnonymousComment postId={id} />
        </div>
      </div>
    </div>
  );
}

export default AnonymousDetail;
