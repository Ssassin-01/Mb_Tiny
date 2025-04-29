import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FollowButton({ targetId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const res = await axios.get('/api/follow/following', { withCredentials: true });
        const followingList = res.data; // List<FollowDTO>

        const isAlreadyFollowing = followingList.some(f => f.targetId === targetId);
        setIsFollowing(isAlreadyFollowing);
      } catch (error) {
        console.error('팔로잉 리스트 가져오기 실패:', error);
      }
    };

    if (loginUser) {
      fetchFollowingList();
    }
  }, [targetId]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`/api/follow/${targetId}`, { withCredentials: true });
      } else {
        await axios.post(`/api/follow/${targetId}`, {}, { withCredentials: true });
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('팔로우/언팔로우 실패:', error);
    }
  };

  return (
    <button 
      onClick={handleFollowToggle} 
      className={`follow-btn ${isFollowing ? 'following' : ''}`}
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </button>
  );
}

export default FollowButton;
