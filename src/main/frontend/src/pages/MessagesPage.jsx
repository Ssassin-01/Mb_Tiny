import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ChatList from '../components/ChatList';
import ChatRoom from '../components/ChatRoom';
import '../css/MessagesPage.css';

const MessagesPage = () => {
  return (
    <div className="messages-page">
      <Topbar />
      <div className="messages-layout">
        <Sidebar />
        <div className="messages-wrapper">
          <ChatList />
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;