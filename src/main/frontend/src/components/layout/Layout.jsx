import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';
import '../../css/layout/Layout.css';

const Layout = () => {
  return (
    <div className='home-page'>
      <header>
        <Topbar />
      </header>
      <div className='layout-body'>
        <Sidebar />
        {/* 무한 스크롤 적용 영역 */}
        <div className='main-scroll-area' id='mainScroll'>
          <div className='main-content'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;