// src/components/ChatList.jsx
import React from 'react';
import '../css/ChatList.css';

const ChatList = ({ chatRooms = [], onSelectChatRoom, selectedRoomId }) => {
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Seoul'
    };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  };

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
                src="/img/default-profile.png"
                alt="프로필"
                className="chat-avatar"
              />
            </div>
            <div className="chat-info">
              <div className="chat-name">{room.targetNickname}</div>
              <div className="chat-preview">{room.lastMessage}</div>
              <div className="chat-time">{formatTime(room.lastSentAt)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
