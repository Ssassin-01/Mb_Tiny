import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Topbar.css";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
<<<<<<< HEAD
    <div className="topbar">
  <div className="logo">LOGO</div>
  <div className="topbar-center">
    <input type="text" className="search-input" placeholder="검색하기" />
  </div>
  
    <button className="join-button" onClick={handleLoginClick}>로그인</button>

</div>

=======
<div className="topbar">
  <div className="logo">
    <img src="/img/logo.png" alt="로고" className="logo-img" />
  </div>

  <div className="topbar-center">
    <input type="text" className="search-input" placeholder="검색하기" />
  </div>

  <button className="join-button" onClick={handleLoginClick}>로그인</button>
</div>


>>>>>>> 68eaecf4d6951e0392ba4d063848baaa2609d27e

  );
};

export default Topbar;

