import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 새로고침 방지
    try {
      const res = await axios.post('http://localhost:8080/api/users/login', form, {
        withCredentials: true,
      });
      alert('로그인 성공!');
      console.log('로그인 응답:', res.data);
      navigate('/');
    } catch (err) {
      alert('로그인 실패: ' + (err.response?.data?.message || '서버 오류'));
    }
  };

  return (
    <div className="login">
      <img src="/img/logo2.png" alt="MBTiny Logo" className="logo" />
      <form className="login-box" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-btn">로그인</button>
        <button type="button" className="signup-btn" onClick={() => navigate('/signup')}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Login;
