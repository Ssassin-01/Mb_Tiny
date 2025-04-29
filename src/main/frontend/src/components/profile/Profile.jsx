import React, { useEffect, useState } from 'react';
import ProfileLeft from './ProfileLeft';
import ProfileRight from './ProfileRight';
import '../../css/profile/Profile.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; // axios 추가

const Profile = () => {
  const [showPosts, setShowPosts] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 저장
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/members/me', {
          withCredentials: true
        });
        setUserInfo(response.data); // 받아온 데이터 저장
      } catch (error) {
        console.error('프로필 정보 가져오기 실패:', error);
        // 로그인 안 한 경우 로그인 페이지로 이동
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!userInfo) {
    return <div>로딩 중...</div>; // 데이터 받아오기 전
  }

  return (
    <div className="profile-page">
      <ProfileLeft
        nickname={userInfo.nickname}
        mbti={userInfo.mbti}
        joinDate={userInfo.joinDate}
        onTogglePosts={() => setShowPosts(!showPosts)}
        isOwner={true}
        followerCount={userInfo.followerCount || 0}
        followingCount={userInfo.followingCount || 0}
        targetId={userInfo.id}
      />
      {showPosts && <ProfileRight />}
    </div>
  );
};

export default Profile;
