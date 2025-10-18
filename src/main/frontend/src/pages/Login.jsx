import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance'; // 커스텀 axios 인스턴스 사용

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
      // 로그인 요청
      const loginRes = await axios.post('/members/login', form, {
        withCredentials: true, // 세션 쿠키 유지
      });

      // 로그인 성공 시 유저 정보 요청
      if (loginRes.data.message === '로그인 성공') {
        const userRes = await axios.get('/members/me', {
          withCredentials: true,
        });

        // 유저 정보를 세션스토리지에 저장
        sessionStorage.setItem('loginUser', JSON.stringify(userRes.data));

        alert('로그인 성공!');
        window.location.href = '/'; // 홈으로 이동
      } else {
        setMessage('로그인 실패: 서버로부터 성공 메시지가 없습니다.');
      }
    } catch (err) {
      console.error('로그인 실패:', err);
      setMessage('로그인 실패: 이메일 또는 비밀번호가 틀립니다.');
    }
  };

  return (
    <div className='login'>
      <img
        src='/img/logo.png'
        alt='MBTiny Logo'
        className='logo'
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      />
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
          🔐 로그인
        </button>
        <button
          type='button'
          className='signup-btn'
          onClick={() => navigate('/signup')}
        >
          회원가입
        </button>

        {message && (
          <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
