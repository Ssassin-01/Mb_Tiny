import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Topbar.css';
import NotificationBell from './NotificationBell';

const Topbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className='topbar'>
      <div className='logo'>
        <img src='/img/logo.png' alt='로고' className='logo-img' />
      </div>

      <div className='topbar-center'>
        <input type='text' className='search-input' placeholder='검색하기' />
      </div>
      <NotificationBell />
      <button className='join-button' onClick={handleLoginClick}>
        로그인
      </button>
    </div>
  );
};

export default Topbar;
