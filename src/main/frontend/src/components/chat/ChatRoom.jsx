import React, { useEffect, useRef, useState } from 'react';
import '../../css/chat/ChatRoom.css';
import api from '../../api/axiosInstance';
import { toImageUrl } from '../../utils/image'; // ✅ 공통 유틸 사용

const ChatRoom = ({
  friend,
  myNickname,
  messages,
  input,
  setInput,
  handleSend,
  onLeaveChat,
}) => {
  const chatBodyRef = useRef(null);
  const [profileImgUrl, setProfileImgUrl] = useState('');

  // ✅ 상대방 프로필 이미지 가져오기 (axiosInstance로 변경)
  useEffect(() => {
    const fetchFriendProfile = async () => {
      if (!friend?.nickname) return;
      try {
        const res = await api.get(
          `/members/${encodeURIComponent(friend.nickname)}`
        );
        setProfileImgUrl(res.data.profileImgUrl);
      } catch (err) {
        console.error('❌ 상세채팅방 프로필 이미지 불러오기 실패:', err);
      }
    };

    fetchFriendProfile();
  }, [friend?.nickname]);

  // ✅ 메시지 수신 시 스크롤 맨 아래로
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ 채팅방 미선택 상태
  if (!friend) {
    return <div className='chat-room'>대화를 시작할 친구를 선택하세요.</div>;
  }

  // ✅ 나가기 버튼
  const handleLeaveClick = () => {
    if (window.confirm('정말 나가시겠습니까?')) {
      onLeaveChat();
    }
  };

  return (
    <div className='chat-room'>
      {/* 🔹 헤더 */}
      <div className='chat-header'>
        <img
          src={toImageUrl(profileImgUrl)} // ✅ 자동 변환
          alt='프로필'
          className='chat-profile-img'
        />
        <div className='chat-partner-name'>{friend.nickname}</div>
        <button className='leave-chat-button' onClick={handleLeaveClick}>
          나가기
        </button>
      </div>

      {/* 🔹 메시지 본문 */}
      <div className='chat-body' ref={chatBodyRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${
              msg.senderNickname === myNickname ? 'sent' : 'received'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* 🔹 입력창 */}
      <div className='chat-input-box'>
        <input
          type='text'
          placeholder='메시지 입력...'
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
