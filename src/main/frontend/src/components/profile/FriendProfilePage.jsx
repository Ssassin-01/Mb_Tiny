import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FriendProfileLeft from './FriendProfileLeft';
import FriendProfileRight from './FriendProfileRight';
import '../../css/profile/FriendProfilePage.css';
import api from '../../api/axiosInstance';

const S3_BASE = 'https://mbtiny-image-bucket.s3.ap-northeast-2.amazonaws.com/';

const toImageUrl = (u) => {
  if (!u) return S3_BASE + 'profile/default.png';
  if (u.startsWith('http://') || u.startsWith('https://')) return u;
  if (u.startsWith('/profile/')) return S3_BASE + u.slice(1);
  if (!u.startsWith('/')) return S3_BASE + u;
  return 'http://localhost:8080' + u;
};

const FriendProfilePage = () => {
  const { nickname } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [showPosts, setShowPosts] = useState(false);

  // ✅ 프로필 정보 가져오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/members/${encodeURIComponent(nickname)}`);
        console.log('받은 profileData:', res.data);
        setProfileData(res.data);
      } catch (error) {
        console.error('❌ 프로필 불러오기 실패:', error);
      }
    };
    fetchProfile();
  }, [nickname]);

  // ✅ 세션 유지 확인
  useEffect(() => {
    api
      .get('/members/me')
      .then((res) => {
        console.log('✅ 세션 유지 중:', res.data);
      })
      .catch((err) => {
        console.error(
          '❌ 세션 없음 또는 인증 실패:',
          err.response?.status,
          err.response?.data
        );
      });
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='friend-profile-page'>
      <FriendProfileLeft
        nickname={profileData.nickname}
        mbti={profileData.mbti}
        joinDate={profileData.joinDate}
        postCount={profileData.postCount || 0}
        isOwner={false}
        targetId={profileData.id}
        profileImgUrl={toImageUrl(profileData.profileImgUrl)}
        onTogglePosts={() => setShowPosts(!showPosts)}
      />
      <FriendProfileRight
        targetNickname={profileData.nickname}
        showPosts={showPosts}
      />
    </div>
  );
};

export default FriendProfilePage;
