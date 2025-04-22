import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TagList from "../components/TagList";
import Feed from "../components/Feed";
import FriendRecommend from "../components/FriendRecommend";
import "../css/Home.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Topbar /> {/* 최상단으로 이동! */}
          <TagList />
      <div className="layout-body">
        <Sidebar />
        <div className="main-content">
        <Feed />
        </div>
        <FriendRecommend /> {/* 오른쪽 추천 영역 */}
      </div>
    </div>
  );
};

export default HomePage;