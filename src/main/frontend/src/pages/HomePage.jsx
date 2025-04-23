import React from "react";
import FeedList from "../components/FeedList";
import FriendRecommend from "../components/FriendRecommend";
import "../css/Home.css";

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