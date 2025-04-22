import React from 'react';
import '../css/ChatList.css';

const ChatList = () => {
  const chats = [
    { id: 1, name: '홍길동', preview: '으아아악', time: '2분전' },
    { id: 2, name: '정웅태', preview: '친구 요청?', time: '1일전' },
    { id: 3, name: '김수민', preview: '야 : 너두?', time: '1년' },
  ];

  return (
    <div className="chat-list">
      <h3>메세지</h3>
      <ul>
        {chats.map(chat => (
          <li key={chat.id} className="chat-item">
            <div className="profile-pic"></div>
            <div className="chat-info">
              <strong>{chat.name}</strong>
              <p>{chat.preview}</p>
            </div>
            <span className="chat-time">{chat.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;