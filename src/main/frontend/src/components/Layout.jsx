import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import "../css/Layout.css";

const Layout = () => {
  return (
    <div className="home-page">
<<<<<<< HEAD
      <Topbar />
      <div className="layout-body">
        <Sidebar />
        
        {/* 무한스크롤 적용되는 영역 */}
        <div className="main-scroll-area" id="mainScroll">
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
=======
    
    <Topbar />
    <div className="layout-body">
      <Sidebar />
      {/* 무한 스크롤 적용 영역 */}
      <div className="main-scroll-area" id="mainScroll">
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  </div>
>>>>>>> 68eaecf4d6951e0392ba4d063848baaa2609d27e
  );
};


export default Layout;
