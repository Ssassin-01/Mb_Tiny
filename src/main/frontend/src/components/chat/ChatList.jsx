// src/components/ChatList.jsx
import React, { useState, useEffect } from 'react';
import '../../css/chat/ChatList.css';

const ChatList = ({ chatRooms = [], onSelectChatRoom, selectedRoomId }) => {
  const [profileImages, setProfileImages] = useState({});

  useEffect(() => {
    const fetchProfileImages = async () => {
      const imageMap = {};
  
      await Promise.all(
        chatRooms.map(async (room) => {
          try {
            const res = await fetch(`http://localhost:8080/api/members/${encodeURIComponent(room.targetNickname)}`, {
              method: 'GET',
              credentials: 'include',
            });
            const data = await res.json();
            console.log('받은 profileData:', data);
            imageMap[room.targetNickname] = data.profileImgUrl;
          } catch (error) {
            console.error(`❌ 프로필 이미지 불러오기 실패: ${room.targetNickname}`, error);
          }
        })
      );
  
      setProfileImages(imageMap);
    };
  
    if (chatRooms.length > 0) {
      fetchProfileImages();
    }
  }, [chatRooms]);

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
  src={
    profileImages[room.targetNickname]
      ? `http://localhost:8080${profileImages[room.targetNickname]}`
      : '/img/default-profile.png'
  }
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
