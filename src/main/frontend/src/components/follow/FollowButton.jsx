import '../../css/follow/FollowButton.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FollowButton = ({ targetId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await axios.get('/api/follow/following');
        const followingList = res.data.map(user => user.followingId);
        setIsFollowing(followingList.includes(Number(targetId)));
      } catch (error) {
        console.error('팔로잉 목록 불러오기 실패:', error);
      }
    };

    fetchFollowing();
  }, [targetId]);

  const handleFollowClick = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`/api/follow/${targetId}`);
        setIsFollowing(false);
      } else {
        await axios.post(`/api/follow/${targetId}`);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('팔로우/언팔로우 실패:', error);
    }
  };

  return (
    <button
      className={isFollowing ? 'unfollow-button' : 'follow-button'}
      onClick={handleFollowClick}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </button>
  );
};

export default FollowButton;
