import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import '../../css/layout/Topbar.css';
import axios from 'axios';
import NotificationBell from './NotificationBell';
import Logout from './Logout';
import SearchBar from './SearchBar';

const Topbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('loginUser');
    if (!sessionUser) return; // ❗ 로그인 안 되어 있으면 요청 자체 생략

    axios
      .get('http://localhost:8080/api/members/me', {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error('로그인 사용자 정보 불러오기 실패', err);
      });
  }, []);

  const goToMyProfile = () => {
    navigate('/profile/me');
  };

  return (
    <div className='topbar'>
      <div className='logo' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src='/img/logo.png' alt='로고' className='logo-img' />
      </div>

      <div className='topbar-center'>
        <SearchBar />
      </div>

      <div className='topbar-right'>
        {user ? (
          <>
            <NotificationBell key='notification' />
            <Logout />
            <div className='mbti-card' onClick={goToMyProfile}>
              {user.nickname} ・ {user.mbti}
            </div>
          </>
        ) : (
          <div className='login-btn-wrapper'>
            <button className='join-button' onClick={() => navigate('/login')}>
              Login
            </button>
            <FaPaperPlane className='plane-icon' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
