import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/anonymous/AnonymousBoard.css';

function AnonymousBoard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 20;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // ✅ 로그인 정보는 따로 시도
        try {
          const userRes = await axios.get('http://localhost:8080/api/members/me', {
            withCredentials: true,
          });
          sessionStorage.setItem('loginUser', JSON.stringify(userRes.data));
        } catch (e) {
          console.log('비로그인 사용자입니다.');
        }

        // ✅ 게시글 가져오기 (로그인 여부 상관없음)
        const res = await axios.get('http://localhost:8080/api/anonymous-posts');
        setPosts(res.data);
      } catch (err) {
        console.error('게시글 로딩 실패', err);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  function formatDateOrTime(createdAt) {
    const createdDate = new Date(createdAt);
    const now = new Date();

    const isToday =
      createdDate.getFullYear() === now.getFullYear() &&
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getDate() === now.getDate();

    if (isToday) {
      return createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } else {
      const month = String(createdDate.getMonth() + 1).padStart(2, '0');
      const date = String(createdDate.getDate()).padStart(2, '0');
      return `${month}-${date}`;
    }
  }

  return (
    <div className="anonymous-page">
      <div className="anonymous-layout">
        <div className="anonymous-board">
          <div className="table-wrapper pc-only">
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
                    <td>{formatDateOrTime(post.createdAt)}</td>
                    <td>{post.viewCount}</td>
                    <td>{post.likeCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mobile-list mobile-only">
            {currentPosts.map((post) => (
              <div className="mobile-post-item" key={post.id} onClick={() => navigate(`/anonymous/${post.id}`)}>
                <div className="post-title-row">
                  <div className="post-title">{post.title}</div>
                  {post.mbti && (
                    <span className="mbti-badge" data-mbti={post.mbti}>
                      {post.mbti}
                    </span>
                  )}
                </div>
                <div className="post-info">
                  {post.viewCount} 조회 · {post.likeCount} 추천 · {formatDateOrTime(post.createdAt)}
                </div>
              </div>
            ))}
          </div>

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
            <button
              className="write-btn"
              onClick={() => {
                const loginUser = sessionStorage.getItem('loginUser');
                if (!loginUser) {
                  alert('글쓰기는 로그인 후 이용 가능합니다.');
                  navigate('/login');
                } else {
                  navigate('/anonymous/write');
                }
              }}
            >
              글쓰기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnonymousBoard;
