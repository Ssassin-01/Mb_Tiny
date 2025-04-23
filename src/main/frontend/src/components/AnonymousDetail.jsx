import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AnonymousComment from '../components/AnonymousComment';
import '../css/AnonymousDetail.css';

function AnonymousDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        alert('글을 불러오지 못했습니다');
        if (id === '1') {
          setPost({
            id: 1,
            title: 'MBTI 더미 글',
            content: '이건 상세페이지에서 볼 수 있는 더미 내용입니다.',
            mbti: 'INFP',
            createdAt: new Date().toISOString(),
            views: 55,
            likes: 12
          });
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:8080/api/posts/${id}/like`);
      const res = await axios.get(`http://localhost:8080/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      alert('추천 실패!');
      console.error(err);
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="anonymous-page">
      <Topbar />
      <div className="anonymous-layout">
        <Sidebar />

        <div className="detail">
          <h1 className="title">{post.title}</h1>

          <div className="info-row">
            <div className="left">
              <span className="writer">MBTI: {post.mbti || '익명'}</span>
              <span className="date">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <div className="right">
              <span>조회 {post.views}</span>
              <span>추천 {post.likes}</span>
            </div>
          </div>

          <div className="content">
            <p>{post.content}</p>

            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="첨부 이미지"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  marginTop: '20px',
                  borderRadius: '8px',
                  display: 'block'
                }}
              />
            )}
          </div>

          <div className="recommend">
            <button className="recommend-btn" onClick={handleLike}>
              추천하기
            </button>
          </div>

          <div className="buttons">
            <button onClick={() => navigate('/anonymous')}>목록으로</button>
          </div>
          <AnonymousComment postId={id} />
        </div>
      </div>
    </div>
  );
}

export default AnonymousDetail;
