// src/components/ChatList.jsx
import React, { useState } from 'react';
import '../../css/chat/ChatList.css';

const ChatList = ({ users = [], onSelectUser, selectedUser, onDelete }) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleDeleteMode = () => {
    if (deleteMode) {
      if (selectedIds.length > 0) {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (confirmed) {
          onDelete(selectedIds);
        }
      }
      setSelectedIds([]);
    }
    setDeleteMode(!deleteMode);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="chat-list">
      <div className="chat-title-bar">
        <h2 className="chat-title">전체 사용자</h2>
        <button className="delete-toggle-btn" onClick={toggleDeleteMode}>
          {deleteMode ? '삭제하기' : '삭제'}
        </button>
      </div>

      {/* ✅ 내부 스크롤 적용 부분 */}
      <div className="chat-list-scroll">
        {users.map((user) => (
          <div
            key={user.id}
            className={`chat-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
            onClick={() => !deleteMode && onSelectUser(user)}
          >
            <div className="chat-item-left">
              {deleteMode && (
                <input
                  type="checkbox"
                  checked={selectedIds.includes(user.id)}
                  onChange={() => toggleSelect(user.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="chat-checkbox"
                />
              )}
              <img src={user.profileImg} alt="프로필" className="chat-avatar" />
            </div>
            <div className="chat-info">
              <div className="chat-name">{user.name}</div>
              <div className="chat-preview">{user.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
