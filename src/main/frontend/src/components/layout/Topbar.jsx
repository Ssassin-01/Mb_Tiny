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
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   // ****백엔드 안 되는 동안 강제 로그인된 상태로 보기****
  //   setUser({
  //     nickname: "nickname",
  //     mbti: "MBTI"
  //   });
  // }, []);

  // 로그인한 사용자 정보 불러오기
  useEffect(() => {
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

  const unreadCount = notifications.length;

  return (
    <div className='topbar'>
      <div className='logo'>
        <img src='/img/logo.png' alt='로고' className='logo-img' />
      </div>

      <div className='topbar-center'>
        <SearchBar />
      </div>

      <div className='topbar-right'>
        {user ? (
          <>
            {/* 알림벨 */}
            <NotificationBell key='notification' />
            <Logout />
            {/* MBTI 카드 + 닉네임 */}
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
