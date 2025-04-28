import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FriendProfileLeft from './FriendProfileLeft';
import FriendProfileRight from './FriendProfileRight';
import '../../css/profile/FriendProfilePage.css'; // 새로 만들기

const FriendProfilePage = () => {
  const { id } = useParams(); // URL에서 친구 ID 가져옴
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/members/${id}`); // 백엔드 API 경로에 맞춰야 해
        const data = await res.json();
        setProfileData(data);
      } catch (error) {
        console.error('상대방 프로필 불러오기 실패:', error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="friend-profile-page">
      <FriendProfileLeft profile={profileData} />
      <FriendProfileRight userId={id} />
    </div>
  );
};

export default FriendProfilePage;
