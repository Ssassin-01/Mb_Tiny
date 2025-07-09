import React from "react";
import { useNavigate } from "react-router-dom";
import '../../css/layout/Sidebar.css';
import { FaHome, FaCommentDots, FaUser, FaQuestion, FaShapes } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {/* 상단 메뉴 */}
      <div className="sidebar-content">
        <ul className="menu">
          <li onClick={() => navigate("/")}><FaHome className="icon" /><span className="label-text">홈</span></li>
          <li onClick={() => navigate("/messagespage")}><FaCommentDots className="icon" /><span className="label-text">메시지</span></li>
          <li onClick={() => navigate("/profile/me")}><FaUser className="icon" /><span className="label-text">프로필</span></li>
          <li onClick={() => navigate("/anonymous")}><FaQuestion className="icon" /><span className="label-text">익명게시판</span></li>
          <li onClick={() => navigate("/mbtitest")}><FaShapes className="icon" /><span className="label-text">성격유형 테스트</span></li>
        </ul>
      </div>

      {/* 하단 푸터 */}
      <div className="sidebar-footer">
        <p> 당신의 성격, 우리의 연결고리 💞</p>
        <p>
          <a href="#">이용약관</a> · <a href="#">개인정보처리방침</a>
        </p>
        <p>© 2025 MBTiny</p>
      </div>
    </div>
  );
};

export default Sidebar;
