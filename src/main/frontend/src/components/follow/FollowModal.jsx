import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/follow/FollowModal.css';

function FollowModal({ type, targetId, onClose }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get(`/api/follow/${targetId}/${type}`, {
          withCredentials: true,
        });
        setUsers(res.data); // 서버에서 사용자 목록 배열 반환
      } catch (error) {
        console.error(`${type} 목록 불러오기 실패:`, error);
      }
    };

    if (targetId && type) {
      fetchList();
    }
  }, [type, targetId]);

  return (
    <div className="follow-modal-overlay" onClick={onClose}>
      <div className="follow-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{type === 'followers' ? '팔로워' : '팔로잉'} 목록</h3>
        <ul className="follow-user-list">
          {users.length === 0 ? (
            <li className="no-follow">아직 아무도 없습니다.</li>
          ) : (
            users.map((user) => (
              <li key={user.id} className="follow-user-item">
                <img src={user.profileImage || '/img/default-profile.png'} alt="프로필" className="user-thumb" />
                <span className="user-nickname">{user.nickname}</span>
              </li>
            ))
          )}
        </ul>
        <button className="modal-close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default FollowModal;
