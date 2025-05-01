import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/follow/FollowModal.css';

function FollowModal({ type, onClose }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 


  const handleProfileClick = (nickname) => {
    navigate(`/profile/${encodeURIComponent(nickname)}`); // URI 인코딩 포함
    onClose(); // 모달 닫기
  };
  useEffect(() => {
    const fetchList = async () => {
      try {
        // 상대방 ID로 조회는 불가능 → 본인 기준의 followers/following만 가능
        const res = await axios.get(`http://localhost:8080/api/follow/${type}`, { withCredentials: true });
        setUsers(res.data);
      } catch (error) {
        console.error(`${type} 목록 불러오기 실패:`, error);
      }
    };

    if (type) {
      fetchList();
    }
  }, [type]);

  return (
    <div className="follow-modal-overlay" onClick={onClose}>
      <div className="follow-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{type === 'followers' ? '팔로워' : '팔로잉'} 목록</h3>
        <ul className="follow-user-list">
          {users.length === 0 ? (
            <li className="no-follow">아직 아무도 없습니다.</li>
          ) : (
            users.map((user) => (
              <li key={user.id} className="follow-user-item" onClick={() => handleProfileClick(user.nickname)}
              style={{cursor:'pointer'}}>
                <img
                  src={user.profileImgUrl || '/img/default-profile.png'}
                  alt="프로필"
                  className="user-thumb"
                />
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
