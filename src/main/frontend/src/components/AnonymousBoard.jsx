import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../css/AnonymousBoard.css';

function AnonymousBoard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 20;

  useEffect(() => {
    // ✅ 더미 데이터 임시 삽입
    const dummyPosts = Array.from({ length: 45 }, (_, i) => ({
      id: i + 1,
      title: `예시 제목 ${i + 1}`,
      writer: '익명',
      createdAt: new Date(Date.now() - i * 60000).toISOString(),
      views: Math.floor(Math.random() * 100),
      likes: Math.floor(Math.random() * 30)
    }));
    setPosts(dummyPosts);
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIdx, startIdx + POSTS_PER_PAGE);

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
              {currentPosts.map((post, index) => (
                <tr
                  key={post.id}
                  onClick={() => navigate(`/anonymous/${post.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{posts.length - ((currentPage - 1) * POSTS_PER_PAGE + index)}</td>
                  <td className="subject">{post.title}</td>
                  <td>{post.writer}</td>
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
