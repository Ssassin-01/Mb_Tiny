// src/components/ChatRoom.jsx
import React, { useEffect, useRef } from 'react';
import '../css/ChatRoom.css';

const ChatRoom = ({ friend, messages }) => {
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  if (!friend) return <div className="chat-room">대화를 시작할 친구를 선택하세요.</div>;

  return (
    <div className="chat-room">
      <div className="chat-header">
        <img src={friend.profileImg} alt="프로필" className="chat-profile-img" />
        <div className="chat-partner-name">{friend.name}</div>
      </div>
      <div className="chat-body" ref={chatBodyRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
