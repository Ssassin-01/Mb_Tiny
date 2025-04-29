import React, { useState } from 'react';
import axios from 'axios';

function FollowButton({ targetId, initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleToggleFollow = async () => {
    try {
      if (isFollowing) {
        // 언팔로우 (DELETE)
        await axios.delete(`/api/follow/${targetId}`, { withCredentials: true });
      } else {
        // 팔로우 (POST)
        await axios.post(`/api/follow/${targetId}`, {}, { withCredentials: true });
        console.log('팔로우 버튼 클릭 targetId:', targetId);

      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('팔로우/언팔로우 실패:', err);
    }
  };

  return (
    <button onClick={handleToggleFollow}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </button>
  );
}

export default FollowButton;
