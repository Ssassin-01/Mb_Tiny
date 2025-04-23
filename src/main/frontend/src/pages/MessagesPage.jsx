import React from 'react';
import ChatList from '../components/ChatList';
import ChatRoom from '../components/ChatRoom';
import '../css/MessagesPage.css';

const MessagesPage = () => {
  return (
    <div className="messages-page">

        <div className="messages-wrapper">
          <ChatList />
          <ChatRoom/>
        </div>

    </div>
  );
};

export default MessagesPage;
