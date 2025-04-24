import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password
      }, {
        withCredentials: true // 세션 유지 시 필요
      });

      alert(response.data); // 로그인 성공 메시지
      navigate('/'); // 메인 페이지로 이동
    } catch (error) {
      alert('로그인 실패: 이메일 또는 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className="login">
      <img src="/img/logo2.png" alt="MBTiny Logo" className="logo" />
      <div className="login-box">
        <div className="field">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="이메일 입력"
          />
        </div>
        <div className="field">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>로그인</button>
        <button className="signup-btn" onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    </div>
  );
}

export default LoginPage;
