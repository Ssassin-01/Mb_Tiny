import React, { useState } from 'react';
import '../../css/chat/ChatList.css';

const ChatList = ({ users = [], onSelectUser, selectedUser, onDelete }) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // ✅ 전체 선택 상태 추가

  const toggleDeleteMode = () => {
    if (deleteMode && selectedIds.length > 0) {
      const confirmed = window.confirm('정말 삭제하시겠습니까?');
      if (confirmed) {
        onDelete(selectedIds);
      }
      setSelectedIds([]);
      setSelectAll(false); // ✅ 전체선택 해제
    }
    setDeleteMode(!deleteMode);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const allIds = users.map((user) => user.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
    setSelectAll(isChecked);
  };

  return (
    <div className='chat-list'>
      <div className='chat-title-bar'>
        <h2 className='chat-title'>전체 사용자</h2>
        <button className='delete-toggle-btn' onClick={toggleDeleteMode}>
          {deleteMode ? '삭제하기' : '삭제'}
        </button>
      </div>

      {/* ✅ 삭제모드일 때만 전체선택 체크박스 표시 */}
      {deleteMode && (
        <div className='select-all-wrapper' style={{ padding: '0 16px 8px' }}>
          <label style={{ fontSize: '14px', color: '#666' }}>
            <input
              type='checkbox'
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            전체 선택
          </label>
        </div>
      )}

      {/* ✅ 친구 리스트 */}
      <div className='chat-list-scroll'>
        {users.map((user) => (
          <div
            key={user.id}
            className={`chat-item ${
              selectedUser?.id === user.id ? 'selected' : ''
            }`}
            onClick={() => !deleteMode && onSelectUser(user)}
          >
            <div className='chat-item-left'>
              {deleteMode && (
                <input
                  type='checkbox'
                  checked={selectedIds.includes(user.id)}
                  onChange={() => toggleSelect(user.id)}
                  onClick={(e) => e.stopPropagation()}
                  className='chat-checkbox'
                />
              )}
              <img src={user.profileImg} alt='프로필' className='chat-avatar' />
            </div>
            <div className='chat-info'>
              <div className='chat-name'>{user.name}</div>
              <div className='chat-preview'>{user.preview}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
