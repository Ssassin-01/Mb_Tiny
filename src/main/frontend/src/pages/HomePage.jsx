import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FeedList from "../components/feed/FeedList";
import FriendRecommend from '../components/recommend/FriendRecommend';
import '../css/pages/Home.css';

const HomePage = () => {
  const location = useLocation();
  const [banner, setBanner] = useState('');

  // 로그인 배너 세션 메시지 확인
  useEffect(() => {
    const msg = sessionStorage.getItem('bannerMessage');
    if (msg) {
      setBanner(msg);
      sessionStorage.removeItem('bannerMessage');

      setTimeout(() => {
        setBanner('');
      }, 2000);
    }
  }, [location]);

  return (
    <>
      {/* 로그인 배너 표시 */}
      {banner && (
        <div className="login-banner">{banner}</div>
      )}

      <div className="home-body-layout">
        <div className="feed-wrapper">
          <FeedList />
        </div>
        <div className="recommend-wrapper">
          <FriendRecommend />
        </div>
      </div>
    </>
  );
};

export default HomePage;
