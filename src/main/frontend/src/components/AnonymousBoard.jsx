import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AnonymousBoard.css';

function AnonymousBoard() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const POSTS_PER_PAGE = 20;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;

  // 컴포넌트 마운트 시 더미 게시글 생성
  useEffect(() => {
    const dummyPosts = Array.from({ length: 53 }, (_, i) => ({
      id: i + 1,
      title: `예시 제목 ${i + 1}`,
      writer: '익명',
      time: new Date(Date.now() - (52 - i) * 60000), // 시간 오래된 순
      views: Math.floor(Math.random() * 100),
      likes: Math.floor(Math.random() * 20),
      content: `이것은 예시 글 ${i + 1}의 내용입니다.`,
    }));
    setPosts(dummyPosts);
  }, []);

  // 최신순 정렬
  const sortedPosts = [...posts].sort((a, b) => b.time - a.time);
  const currentPosts = sortedPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  const formatTime = (date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  return (
    <div className="board">
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
          {currentPosts.length === 0 ? (
            <tr><td colSpan="6">게시글이 없습니다.</td></tr>
          ) : (
            currentPosts.map((post) => (
              <tr key={post.id} onClick={() => navigate(`/anonymous/${post.id}`)} style={{ cursor: 'pointer' }}>
                <td>{post.id}</td>
                <td className="subject">{post.title}</td>
                <td>{post.writer}</td>
                <td>{formatTime(post.time)}</td>
                <td>{post.views}</td>
                <td>{post.likes}</td>
              </tr>
            ))
          )}
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
          <button className="page-btn" onClick={() => setCurrentPage(currentPage + 1)}>다음 &gt;</button>
        )}
      </div>
  
      <div className="actions">
        <button className="write-btn" onClick={() => navigate('/anonymous/write')}>
          글쓰기
        </button>
      </div>
    </div>
  );
}

export default AnonymousBoard;
