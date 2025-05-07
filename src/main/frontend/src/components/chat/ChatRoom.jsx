import React, { useEffect, useRef, useState } from 'react';
import '../../css/chat/ChatRoom.css';

const ChatRoom = ({ friend, myNickname, messages, input, setInput, handleSend, onLeaveChat }) => {
  const chatBodyRef = useRef(null);
  const [profileImgUrl, setProfileImgUrl] = useState('');

  // ✅ 상대방 프로필 이미지 가져오기
  useEffect(() => {
    if (friend?.nickname) {
      fetch(`http://localhost:8080/api/members/${encodeURIComponent(friend.nickname)}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          setProfileImgUrl(data.profileImgUrl);
        })
        .catch(err => {
          console.error('❌ 상세채팅방 프로필 이미지 불러오기 실패:', err);
        });
    }
  }, [friend?.nickname]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  if (!friend) {
    return <div className="chat-room">대화를 시작할 친구를 선택하세요.</div>;
  }

  const handleLeaveClick = () => {
    if (window.confirm('정말 나가시겠습니까?')) {
      onLeaveChat();
    }
  };

  return (
    <div className="chat-room">
      <div className="chat-header">
        <img
          src={profileImgUrl ? `http://localhost:8080${profileImgUrl}` : '/img/default-profile.png'}
          alt="프로필"
          className="chat-profile-img"
        />
        <div className="chat-partner-name">{friend.nickname}</div>

        <button className="leave-chat-button" onClick={handleLeaveClick}>나가기</button>
      </div>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.senderNickname === myNickname ? 'sent' : 'received'}`}
          >
            {msg.content}
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default ChatRoom;
