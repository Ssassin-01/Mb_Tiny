import React, { useEffect, useState } from 'react';
import ProfileLeft from './ProfileLeft';
import ProfileRight from './ProfileRight';
import '../../css/profile/Profile.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const S3_BASE = 'https://mbtiny-image-bucket.s3.ap-northeast-2.amazonaws.com/';

const toImageUrl = (u) => {
  if (!u) return S3_BASE + 'profile/default.png';
  if (u.startsWith('http://') || u.startsWith('https://')) return u;
  if (u.startsWith('/profile/')) return S3_BASE + u.slice(1);
  if (!u.startsWith('/')) return S3_BASE + u;
  return 'http://localhost:8080' + u;
};

const Profile = () => {
  const [showPosts, setShowPosts] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);

  const navigate = useNavigate();
  const currentLocation = useLocation();

  // 로그인 필요 배너 후 이동
  const showAutoBannerThenLogin = (text) => {
    setMessage(text);
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
      navigate('/login');
    }, 2000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/members/me',
          {
            withCredentials: true,
          }
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error('프로필 정보 가져오기 실패:', error);
        showAutoBannerThenLogin('로그인이 필요합니다.');
      }
    };

    fetchProfile();
  }, [currentLocation.pathname]);

  if (!userInfo) {
    return <>{showBanner && <div className='login-banner'>{message}</div>}</>;
  }

  return (
    <>
      {showBanner && <div className='login-banner'>{message}</div>}
      <div className='profile-page'>
        <ProfileLeft
          nickname={userInfo.nickname}
          mbti={userInfo.mbti}
          joinDate={userInfo.joinDate}
          onTogglePosts={() => setShowPosts(!showPosts)}
          isOwner={true}
          followerCount={userInfo.followerCount || 0}
          followingCount={userInfo.followingCount || 0}
          targetId={userInfo.id}
          profileImgUrl={toImageUrl(userInfo.profileImgUrl)}
        />
        {showPosts && <ProfileRight />}
      </div>
    </>
  );
};

export default Profile;
