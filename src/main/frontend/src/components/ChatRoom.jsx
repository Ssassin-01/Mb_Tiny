import React from 'react';
import '../css/ChatRoom.css';

const ChatRoom = () => {
  return (
    <div className="chat-room">
      <div className="chat-header">
        <div className="profile-pic"></div>
        <div className="chat-partner-name">Gisub Lee</div>
      </div>
      <div className="chat-body">
        <div className="chat-message received">어 뭐야</div>
        <div className="chat-message received">ㅋㅋㅋㅋ</div>
        <div className="chat-message sent">토요일에 걸림</div>
      </div>
      <div className="chat-input-box">
        <input type="text" placeholder="메세지 입력..." />
        <button>전송</button>
      </div>
    </div>
  );
};

export default ChatRoom;
