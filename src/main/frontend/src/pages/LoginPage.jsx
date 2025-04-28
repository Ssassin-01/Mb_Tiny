import React, { useState } from 'react';
import axios from '../api/axiosInstance';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(
        '/api/members/login',
        { email, password },
        {
          withCredentials: true, // ✅ 세션 쿠키 포함 필수!
        }
      )
      .then((res) => {
        setMessage('✅ 로그인 성공!');
        console.log(document.cookie);
        // 로그인 후 내 정보 페이지로 이동하거나 상태 갱신 등
      })
      .catch((err) => {
        setMessage('❌ 로그인 실패: 이메일 또는 비밀번호가 틀립니다.');
        console.error(err);
      });
  };

  return (
    <div>
      <h2>🔐 로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>이메일</label>
          <br />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <br />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>로그인</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
