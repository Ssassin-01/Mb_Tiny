// src/components/ChatList.jsx
import React from 'react';
import '../css/ChatList.css';

const ChatList = ({ friends, onSelectFriend, selectedFriend }) => {
  return (
    <div className="chat-list">
      <h3>메시지</h3>
      <ul>
        {friends.map((friend) => (
          <li
            key={friend.id}
            className={`chat-item ${selectedFriend?.id === friend.id ? 'selected' : ''}`}
            onClick={() => onSelectFriend(friend)}
          >
            <div className="profile-pic">
              <img src={friend.profileImg} alt="프로필" />
            </div>
            <div className="chat-info">
              <strong>{friend.name}</strong>
              <p>최근 메시지 미리보기</p>
            </div>
            <span className="chat-time">방금</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
