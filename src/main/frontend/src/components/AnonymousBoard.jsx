import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AnonymousBoard.css';

function AnonymousBoard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 20;

  useEffect(() => {
    // 로그인된 사용자 더미 설정
    sessionStorage.setItem('loginUser', JSON.stringify({
      id: 1,
      nickname: '도하',
      mbti: 'INFP'
    }));

    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/posts'); // 실제 API
        setPosts(res.data);
      } catch (err) {
        console.warn('API 실패 → 더미 데이터 사용');

        const dummyPosts = Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          title: `더미 제목 ${i + 1}`,
          mbti: ['INFP', 'ENFP', 'INTJ', 'ISFJ'][i % 4],
          createdAt: new Date(Date.now() - i * 60000).toISOString(),
          views: Math.floor(Math.random() * 100),
          likes: Math.floor(Math.random() * 30),
          content: `이건 더미 ${i + 1}번 내용입니다.`,
          authorId: i % 3 === 0 ? 1 : i + 10,
        }));

        setPosts(dummyPosts);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  return (
    <div className="anonymous-page">
      <div className="anonymous-layout">
        <div className="anonymous-board">
          <table className="table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>MBTI</th>
                <th>시간</th>
                <th>조회</th>
                <th>추천</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr
                  key={post.id}
                  onClick={() => navigate(`/anonymous/${post.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{posts.length - ((currentPage - 1) * POSTS_PER_PAGE + index)}</td>
                  <td className="subject">{post.title}</td>
                  <td>
                    <span className="mbti-badge" data-mbti={post.mbti}>
                      {post.mbti || '익명'}
                    </span>
                  </td>
                  <td>{new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
                  <td>{post.views}</td>
                  <td>{post.likes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="paging">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="actions">
            <button className="write-btn" onClick={() => navigate('/anonymous/write')}>
              글쓰기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnonymousBoard;
