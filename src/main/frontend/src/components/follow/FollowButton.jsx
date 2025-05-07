import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/follow/FollowButton.css';

function FollowButton({ targetId, onFollowChange }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // targetId 로그 확인 (디버그용)
  useEffect(() => {
    console.log('targetId:', targetId);
  }, [targetId]);

  // 팔로우 상태 확인
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/follow/following', { withCredentials: true });
        const followingList = res.data;
        const isAlreadyFollowing = followingList.some(user => user.id === targetId);
        setIsFollowing(isAlreadyFollowing);
      } catch (err) {
        console.error('팔로잉 상태 조회 실패:', err);
      }
    };

    if (targetId) {
      fetchStatus();
    }  
  }, [targetId]);

  // 팔로우/언팔로우 토글
  const handleToggleFollow = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isFollowing) {
        await axios.delete(`http://localhost:8080/api/follow/${targetId}`, { withCredentials: true });
        setIsFollowing(false);
      } else {
        await axios.post(`http://localhost:8080/api/follow/${targetId}`, {}, { withCredentials: true });
        setIsFollowing(true);
      }


      if (onFollowChange) {
        onFollowChange();
      }
    } catch (err) {
      console.error('팔로우/언팔로우 실패:', err);
    } finally {
      setLoading(false);
    }
  };

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
