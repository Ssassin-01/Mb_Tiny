import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import '../../css/layout/Logout.css';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/members/logout', {}, { withCredentials: true });
      sessionStorage.removeItem('loginUser');
      sessionStorage.removeItem('recommendedFriends');
      // ✅ 토스트 띄우기
      const toast = document.createElement('div');
      toast.innerText = '로그아웃 완료되었습니다!';
      toast.className = 'custom-toast';
      document.body.appendChild(toast);

      setTimeout(() => {
        document.body.removeChild(toast);
        window.location.href = '/'; // ✅ 새로고침하면서 홈('/')으로 강제 이동
      }, 2000);

    } catch (error) {
      console.error('❌ 로그아웃 실패', error);
      alert('로그아웃 실패');
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <FiLogOut className="logout-icon" />
      로그아웃
    </button>
  );
};

export default Logout;
