// src/components/ChatList.jsx
import React from 'react';
import '../css/ChatList.css';

const ChatList = ({ users, onSelectUser, selectedUser }) => {
  return (
    <div className="chat-list">
      <h3>전체 사용자</h3>
      <ul>
        {users.map(user => (
          <li
            key={user.id}
            className={`chat-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
            onClick={() => onSelectUser(user)}
          >
            <div className="profile-pic">
              <img src={user.profileImg} alt="프로필" />
            </div>
            <div className="chat-info">
              <strong>{user.name}</strong>
              <p>{user.status}</p>
            </div>
            <span className="chat-time">방금</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
