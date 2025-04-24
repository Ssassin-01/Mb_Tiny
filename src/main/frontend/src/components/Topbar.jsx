import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Topbar.css";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div>LOGO</div>
      <input type="text" className="search-input" placeholder="검색하기" />
      <button className="join-button" onClick={handleLoginClick}>로그인</button>
    </div>
  );
};

export default Topbar;

