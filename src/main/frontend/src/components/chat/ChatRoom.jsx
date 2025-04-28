// src/components/ChatRoom.jsx
import React, { useEffect, useRef } from 'react';
import '../../css/chat/ChatRoom.css';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';

const ChatRoom = ({ friend, messages, setMessages, input, setInput, handleSend, onLeaveChat }) => {
  const chatBodyRef = useRef(null);

  // const stompClient = useRef(null);
  // const roomId = 1; // 추후 필요 시 props로 받기
  // const myId = 1;   // 현재 로그인된 사용자 ID

  // ✅ 메시지 아래로 스크롤
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ WebSocket 연결 (주석 처리)
  /*
  useEffect(() => {
    const socket = new SockJS('/ws/chat');
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log('🟢 WebSocket 연결됨');

        stompClient.current.subscribe(`/topic/chat/${roomId}`, (message) => {
          const msg = JSON.parse(message.body);
          setMessages(prev => [...prev, msg]);
        });
      },
    });

    stompClient.current.activate();

    return () => {
      stompClient.current.deactivate();
    };
  }, [roomId]);
  */

  // ✅ WebSocket 전송도 주석 처리
  /*
  const sendMessage = () => {
    if (!input.trim()) return;
    stompClient.current.publish({
      destination: `/app/chat.send/${roomId}`,
      body: JSON.stringify({
        senderId: myId,
        content: input,
      }),
    });
    setInput('');
  };
  */

  if (!friend) {
    return <div className="chat-room">대화를 시작할 친구를 선택하세요.</div>;
  }

  // ✅ 나가기 버튼 클릭 시 확인창 띄우기
  const handleLeaveClick = () => {
    const confirmed = window.confirm('정말 나가시겠습니까?');
    if (confirmed) {
      onLeaveChat(friend.id);
    }
  };

  return (
    <div className="chat-room">
      <div className="chat-header">
        <img src={friend.profileImg} alt="프로필" className="chat-profile-img" />
        <div className="chat-partner-name">{friend.name}</div>

        {/* ✅ 채팅방 나가기 버튼 */}
        <button className="leave-chat-button" onClick={handleLeaveClick}>나가기</button>
      </div>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
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
