import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnonymousComment from '../anonymous/AnonymousComment';
import '../../css/anonymous/AnonymousDetail.css';

function AnonymousDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  const isAuthor = loginUser && loginUser.id === post?.authorId;

  // ✅ 로그인 체크
  useEffect(() => {
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        alert('API 실패 - 더미 데이터 사용');

        setPost({
          id: id,
          title: '더미 제목',
          content: '이건 더미 상세입니다.',
          mbti: 'INFP',
          authorId: 1,
          createdAt: new Date().toISOString(),
          views: 100,
          likes: 10,
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    alert('추천 기능은 비활성화 상태입니다.');
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      alert('삭제 완료 (더미)');
      navigate('/anonymous');
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
              <span className="date">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <div className="right">
              <span>조회 {post.views}</span>
              <span>추천 {post.likes}</span>
            </div>
          </div>

          <div className="content">
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
