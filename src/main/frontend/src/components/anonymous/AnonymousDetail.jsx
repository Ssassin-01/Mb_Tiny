import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import AnonymousComment from '../anonymous/AnonymousComment';
import '../../css/anonymous/AnonymousDetail.css';

function AnonymousDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [message, setMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);

  // ✅ 이미지 URL 자동 변환
  const S3_BASE =
    'https://mbtiny-image-bucket.s3.ap-northeast-2.amazonaws.com/';
  const isDev = process.env.NODE_ENV === 'development';
  const API_BASE = isDev ? 'http://localhost:8080' : '';

  const toImageUrl = (url) => {
    if (!url) return '/img/default-image.png';
    if (url.startsWith('http://') || url.startsWith('https://')) return url; // S3 or absolute
    if (url.startsWith('/profile/') || url.startsWith('/uploads/'))
      return S3_BASE + url.slice(1);
    return API_BASE + url; // EC2에서는 '/api'로 프록시됨
  };

  useEffect(() => {
    const loginUser = sessionStorage.getItem('loginUser');
    if (!loginUser) {
      setMessage('로그인이 필요합니다.');
      setShowBanner(true);
      setTimeout(() => {
        setShowBanner(false);
        navigate('/login');
      }, 2000);
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await api.get(`/anonymous-posts/${id}`);
        setPost(res.data);
        setIsLiked(res.data.liked);
      } catch (err) {
        console.error('게시글 불러오기 실패', err);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleLikeToggle = async () => {
    try {
      const res = await api.post(`/anonymous-posts/${id}/like`, {});
      const liked = res.data.like;
      setPost((prev) => ({
        ...prev,
        likeCount: liked ? prev.likeCount + 1 : prev.likeCount - 1,
      }));
      setIsLiked(liked);
    } catch (err) {
      console.error('추천 토글 실패', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await api.delete(`/anonymous-posts/${id}`);
      alert('삭제 완료');
      navigate('/anonymous');
    } catch (err) {
      console.error('삭제 실패', err);
    }
  };

  const handleEdit = () => {
    navigate(`/anonymous/write?id=${id}`);
  };

  if (!post)
    return (
      <div className='anonymous-page'>
        {showBanner && <div className='alert-message'>{message}</div>}
      </div>
    );

  return (
    <div className='anonymous-page'>
      {showBanner && <div className='alert-message'>{message}</div>}

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
                  src={toImageUrl(post.imageUrl)}
                  alt='첨부 이미지'
                  className='post-image'
                  onClick={() => setShowModal(true)}
                />
                {showModal && (
                  <div
                    className='modal-overlay'
                    onClick={() => setShowModal(false)}
                  >
                    <img
                      src={toImageUrl(post.imageUrl)}
                      alt='큰 이미지'
                      className='modal-image'
                      onClick={(e) => e.stopPropagation()}
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
