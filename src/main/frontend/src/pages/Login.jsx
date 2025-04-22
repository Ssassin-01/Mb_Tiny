import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'; // ← components 폴더 안 CSS를 참조

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login">
      <img src="/img/logo2.png" alt="MBTiny Logo" className="logo" />
        <div className="login-box">
        <div className="field">
          <input type="text" placeholder="ID" />
        </div>
        <div className="field">
          <input type="password" placeholder="PW" />
        </div>

        <button className="login-btn" onClick={() => navigate('/')}>로그인</button>
        <button className="signup-btn" onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    </div>
  );
}

export default Login;
