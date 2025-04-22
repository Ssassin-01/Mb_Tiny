import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../css/AnonymousDetail.css';

function AnonymousDetail() {
  const navigate = useNavigate();

  return (
    <div className="anonymous-page">
      <Topbar />
      <div className="anonymous-layout">
        <Sidebar />
        <div className="detail">
          <h1 className="title">제목</h1>

          <div className="info-row">
            <div className="left">
              <span className="writer">익명</span>
              <span className="date">작성시간</span>
            </div>
            <div className="right">
              <span>조회 0</span>
              <span>추천 0</span>
              <span>댓글 0</span>
            </div>
          </div>

          <div className="content">
            <p>작성한 내용</p>
          </div>

          <div className="recommend">
            <button className="recommend-btn">👍 추천</button>
          </div>

          <div className="buttons">
            <button onClick={() => navigate('/anonymous')}>목록으로</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnonymousDetail;
