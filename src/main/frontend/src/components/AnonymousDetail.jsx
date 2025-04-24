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

  // ✅ 로그인된 유저 ID 설정 (임시)
  useEffect(() => {
    sessionStorage.setItem('loginUser', JSON.stringify({
      id: 1,
      nickname: '도하',
      mbti: 'INFP'
    }));
  }, []);

  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  const isAuthor = loginUser && loginUser.id === post?.authorId; // 본인 글인지 확인

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        alert('더미 데이터로 확인 중');

        setPost({
          id: 1,
          title: '내가 쓴 더미 글',
          content: '이건 더미 글입니다. 작성자 ID가 1일 때만 버튼이 보입니다.',
          authorId: 1, // 로그인 유저 ID와 같음 → 버튼 보임
          mbti: 'INFP',
          createdAt: new Date().toISOString(),
          views: 99,
          likes: 20,
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    alert('추천은 테스트에서 생략됨');
  };

  const handleDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      alert('삭제 성공 (더미)');
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
