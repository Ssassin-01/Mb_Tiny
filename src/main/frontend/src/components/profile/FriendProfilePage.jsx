import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FriendProfileLeft from './FriendProfileLeft';
import FriendProfileRight from './FriendProfileRight';
import '../../css/profile/FriendProfilePage.css';

const FriendProfilePage = () => {
  const { nickname } = useParams(); // 이 id는 닉네임일 수도 있고, 숫자 id일 수도 있음
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    
    const fetchProfile = async () => {
      try {
        
        const res = await fetch(`/api/members/${nickname}`);
        const data = await res.json();
        console.log('받은 profileData:', data);
        setProfileData(data);
      } catch (error) {
        console.error('프로필 불러오기 실패:', error);
      }
    };

    fetchProfile();
  }, [nickname]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
<div className="friend-profile-page">
  {profileData && (
    <>
      <FriendProfileLeft
        nickname={profileData.nickname}
        mbti={profileData.mbti}
        joinDate={profileData.joinDate}
        postCount={profileData.postCount || 0}
        isOwner={false}
        targetNickname={profileData.nickname}
      />
      <FriendProfileRight
        targetNickname={profileData.nickname}
      />
    </>
  )}
</div>

  );
};

export default FriendProfilePage;
