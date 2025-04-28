import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/follow/FollowModal.css';


const FollowModal = ({ type, onClose }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = type === 'followers' ? '/api/follow/followers' : '/api/follow/following';
        const res = await axios.get(endpoint);
        setList(res.data);
      } catch (error) {
        console.error('목록 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{type === 'followers' ? '팔로워' : '팔로잉'}</h2>
        <button className="modal-close" onClick={onClose}>X</button>
        <ul className="modal-list">
          {list.length > 0 ? (
            list.map(user => (
              <li key={user.id}>{user.nickname}</li>
            ))
          ) : (
            <p>아직 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FollowModal;
