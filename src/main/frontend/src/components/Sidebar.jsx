import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Sidebar.css";
import { FaHome, FaCommentDots, FaUser, FaQuestion, FaShapes, FaPuzzlePiece } from "react-icons/fa";


const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul className="menu">
        <li
          onClick={() => navigate("/")}
          title="홈"
          aria-label="홈"
        >
          <FaHome className="icon" />
          <span className="label-text">홈</span>
        </li>
        <li
          onClick={() => navigate("/messagespage")}
          title="메시지"
          aria-label="메시지"
        >
          <FaCommentDots className="icon" />
          <span className="label-text">메시지</span>
        </li>
        <li
          onClick={() => navigate("/messagesTest")}
          title="메시지"
          aria-label="메시지"
        >
          <FaCommentDots className="icon" />
          <span className="label-text">메시지테스트</span>
        </li>
        <li
              onClick={() => navigate("/messagesTestNoS")}
              title="메시지"
              aria-label="메시지"
            >
              <FaCommentDots className="icon" />
              <span className="label-text">메시지테스트일반</span>
            </li>
        <li
          onClick={() => navigate("/profile")}
          title="프로필"
          aria-label="프로필"
        >
          
          <FaUser className="icon" /> 
          <span className="label-text">프로필</span>
        </li>
        <li
          onClick={() => navigate("/anonymous")}
          title="익명게시판"
          aria-label="익명게시판"
        >
          <FaQuestion className="icon" />
          <span className="label-text">익명게시판</span>
        </li>
        <li
          onClick={() => navigate("/mbtitest")}
          title="성격유형 테스트"
          aria-label="성격유형 테스트"
        >
          <FaShapes className="icon" />
          <span className="label-text">성격유형 테스트</span>
        </li>
        <li
          onClick={() => navigate("/resources")}
          title="퀴즈"
          aria-label="퀴즈"
        >
          <FaPuzzlePiece className="icon" />
          <span className="label-text">퀴즈</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;