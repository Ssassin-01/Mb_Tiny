import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance'; // ✅ axiosInstance 사용

import '../css/pages/Login.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 새로고침 방지
    try {
      const res = await axios.post('/api/members/login', form, {
        withCredentials: true, // ✅ 세션 유지
      });
      alert('로그인 성공!');
      console.log('로그인 응답:', res.data);
      setTimeout(() => {
        window.location.href = '/'; // 이거 추가했어요
      }, 100);
    } catch (err) {
      console.error('로그인 실패:', err);
      setMessage('❌ 로그인 실패: 이메일 또는 비밀번호가 틀립니다.');
    }
  };

  return (
    <div className='login'>
      <img src='/img/logo.png' alt='MBTiny Logo' className='logo'  onClick={() => navigate('/')} style={{ cursor: 'pointer' }}/>
      <form className='login-box' onSubmit={handleSubmit}>
        <div className='field'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='field'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type='submit' className='login-btn'>
          🔐로그인
        </button>
        <button
          type='button'
          className='signup-btn'
          onClick={() => navigate('/signup')}
        >
          회원가입
        </button>

        {/* 로그인 실패 시 메시지 출력 */}
        {message && (
          <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
