import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import "../css/Home.css";

const Layout = () => {
  return (
    <div className="home-page">
      <Topbar />
      <div className="layout-body">
        <Sidebar />
        <div className="main-content">
          <Outlet /> {/* 여기에 각 페이지 내용이 들어감 */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
