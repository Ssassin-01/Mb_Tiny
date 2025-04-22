import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar'; // ✅ 추가
import '../css/AnonymousBoard.css';

function AnonymousBoard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 20;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;

  useEffect(() => {
    const dummyPosts = Array.from({ length: 53 }, (_, i) => ({
      id: i + 1,
      title: `예시 제목 ${i + 1}`,
      writer: '익명',
      time: new Date(Date.now() - (52 - i) * 60000),
      views: Math.floor(Math.random() * 100),
      likes: Math.floor(Math.random() * 20),
      content: `이것은 예시 글 ${i + 1}의 내용입니다.`,
    }));
    setPosts(dummyPosts);
  }, []);

  const sortedPosts = [...posts].sort((a, b) => b.time - a.time);
  const currentPosts = sortedPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  const formatTime = (date) => {
    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="anonymous-page">
      <Topbar />
      <div className="anonymous-layout">
        <Sidebar /> 
        <div className="anonymous-board">
          <table className="table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>시간</th>
                <th>조회</th>
                <th>추천</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr
                  key={post.id}
                  onClick={() => navigate(`/anonymous/${post.id}`, { state: post })}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{post.id}</td>
                  <td className="subject">{post.title}</td>
                  <td>{post.writer}</td>
                  <td>{formatTime(post.time)}</td>
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
            {currentPage < totalPages && totalPages > 0 && (
              <button className="page-btn" onClick={() => setCurrentPage(currentPage + 1)}>
                다음 &gt;
              </button>
            )}
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
