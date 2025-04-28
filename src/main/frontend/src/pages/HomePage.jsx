import React from "react";
import FeedList from "../components/feed/FeedList";
import FriendRecommend from '../components/recommend/FriendRecommend';
import '../css/pages/Home.css'

const HomePage = () => {
  return (
    <div className="home-body-layout">
      <div className="feed-wrapper">
        <FeedList />
      </div>
      <div className="recommend-wrapper">
        <FriendRecommend />
      </div>
    </div>
  );
};

export default HomePage;