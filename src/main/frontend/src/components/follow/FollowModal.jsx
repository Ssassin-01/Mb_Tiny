import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/follow/FollowModal.css';
import api from '../../api/axiosInstance';
import { toImageUrl } from '../../utils/image'; // ✅ 이미지 경로 변환 유틸

function FollowModal({ type, onClose }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleProfileClick = (nickname) => {
    navigate(`/profile/${encodeURIComponent(nickname)}`);
    onClose();
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        // ✅ axiosInstance를 사용 (자동 baseURL + 쿠키 포함)
        const res = await api.get(`/follow/${type}`);
        setUsers(res.data);
      } catch (error) {
        console.error(`${type} 목록 불러오기 실패:`, error);
      }
    };

    if (type) fetchList();
  }, [type]);

  return (
    <div className='follow-modal-overlay' onClick={onClose}>
      <div className='follow-modal' onClick={(e) => e.stopPropagation()}>
        <h3>{type === 'followers' ? '팔로워' : '팔로잉'} 목록</h3>

        <ul className='follow-user-list'>
          {users.length === 0 ? (
            <li className='no-follow'>아직 아무도 없습니다.</li>
          ) : (
            users.map((user) => (
              <li
                key={user.id}
                className='follow-user-item'
                onClick={() => handleProfileClick(user.nickname)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={toImageUrl(user.profileImgUrl)} // ✅ 환경별 자동 처리
                  alt='프로필'
                  className='user-thumb'
                />
                <span className='user-nickname'>{user.nickname}</span>
              </li>
            ))
          )}
        </ul>

        <button className='modal-close-btn' onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default FollowModal;
