import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="logo">MBTiny</h2>
      <ul className="menu">
        <li onClick={() => navigate("/")}>홈</li>
        <li onClick={() => navigate("/messages")}>메시지</li>
        <li onClick={() => navigate("/profile")}>프로필</li>
        <li onClick={() => navigate("/anonymous")}>익명게시판</li>
        <li onClick={() => navigate("/mbti-test")}>성격유형 테스트</li>
        <li onClick={() => navigate("/resources")}>리소스</li>
      </ul>
    </div>
  );
};

export default Sidebar;
