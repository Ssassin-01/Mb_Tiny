import React from "react";
import TagList from "../components/TagList";
import Feed from "../components/Feed";
import FriendRecommend from "../components/FriendRecommend";
import "../css/Home.css";

const HomePage = () => {
  return (
    <div className="home-page">
        <TagList />
      <div className="layout-body">
        <div className="main-content">
        <Feed />
        </div>
        <FriendRecommend /> {/* 오른쪽 추천 영역 */}
      </div>
    </div>
  );
};

export default HomePage;