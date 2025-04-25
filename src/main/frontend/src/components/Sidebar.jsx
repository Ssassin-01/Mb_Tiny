import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Sidebar.css";
<<<<<<< HEAD
import { FaHome, FaCommentDots, FaUser, FaQuestion, FaShapes, FaArchive } from "react-icons/fa";
=======
import { FaHome, FaCommentDots, FaUser, FaQuestion, FaShapes, FaPuzzlePiece } from "react-icons/fa";
>>>>>>> 68eaecf4d6951e0392ba4d063848baaa2609d27e


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
<<<<<<< HEAD
          title="리소스"
          aria-label="리소스"
        >
          <FaArchive className="icon" />
          <span className="label-text">리소스</span>
=======
          title="퀴즈"
          aria-label="퀴즈"
        >
          <FaPuzzlePiece className="icon" />
          <span className="label-text">퀴즈</span>
>>>>>>> 68eaecf4d6951e0392ba4d063848baaa2609d27e
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;