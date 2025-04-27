// src/components/MessageInput.jsx
import React from 'react';
import '../css/ChatRoom.css';

const MessageInput = ({ input, setInput, handleSend }) => {
  return (
    <div className="chat-input-box">
      <input
        type="text"
        placeholder="메시지 입력..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>전송</button>
    </div>
  );
};

export default MessageInput;
