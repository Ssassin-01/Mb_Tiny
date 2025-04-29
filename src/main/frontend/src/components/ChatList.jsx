// src/components/ChatList.jsx
import React from 'react';
import '../css/ChatList.css';

const ChatList = ({ chatRooms = [], onSelectChatRoom, selectedRoomId }) => {
  return (
    <div className="chat-list">
      <div className="chat-title-bar">
        <h2 className="chat-title">채팅 목록</h2>
      </div>

      <div className="chat-list-scroll">
        {chatRooms.map((room) => (
          <div
            key={room.roomId}
            className={`chat-item ${selectedRoomId === room.roomId ? 'selected' : ''}`}
            onClick={() => onSelectChatRoom(room)}
          >
            <div className="chat-item-left">
              <img
                src="/img/default-profile.png" // 기본 프로필
                alt="프로필"
                className="chat-avatar"
              />
            </div>
            <div className="chat-info">
              <div className="chat-name">{room.targetNickname}</div>
              <div className="chat-preview">{room.lastMessage}</div>
              <div className="chat-time">{new Date(room.lastSentAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
