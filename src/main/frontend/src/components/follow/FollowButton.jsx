import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/follow/FollowButton.css';

function FollowButton({ targetId, onFollowChange }) {
  const [isFollowing, setIsFollowing] = useState(null);
  const [loading, setLoading] = useState(false);
  

  // 현재 팔로우 상태 조회
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/follow/following', {
          withCredentials: true,
        });
        const isAlreadyFollowing = res.data.some(user => user.id === targetId);
        setIsFollowing(isAlreadyFollowing);
      } catch (err) {
        console.error('팔로잉 상태 조회 실패:', err);
      }
    };

    if (targetId != null) {
      fetchStatus();
    }
  }, [targetId]);

  // 버튼 클릭 핸들러
  const handleToggleFollow = async () => {
    if (loading || isFollowing === null) return;
    setLoading(true);
  
    try {
      if (isFollowing) {
        await axios.delete(`http://localhost:8080/api/follow/${targetId}`, {
          withCredentials: true,
        });
      } else {
        await axios.post(`http://localhost:8080/api/follow/${targetId}`, {}, {
          withCredentials: true,
        });
      }
  
      // 새로고침으로 상태 강제 동기화
      window.location.reload();
    } catch (err) {
      console.error('❌ 팔로우/언팔로우 실패:', err);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };
  

  if (isFollowing === null) return null;

  return (
    <button
      className={`follow-btn ${isFollowing ? 'following' : ''}`}
      onClick={handleToggleFollow}
      disabled={loading}
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </button>
  );
}

export default FollowButton;
