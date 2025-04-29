// src/pages/MessagesPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatList from '../components/ChatList';
import ChatRoom from '../components/ChatRoom';
import '../css/MessagesPage.css';

const MessagesPage = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    // ✅ 서버에서 전체 채팅방 목록 가져오기
    axios.get('http://localhost:8080/api/chatrooms', { withCredentials: true })
      .then(res => setChatRooms(res.data))
      .catch(err => console.error("채팅방 목록 불러오기 실패", err));
  }, []);

  const handleSelectChatRoom = async (chatRoom) => {
    try {
      const { roomId, targetNickname } = chatRoom;
      setRoomId(roomId);
      setSelectedFriend({ nickname: targetNickname }); // 서버에서 targetNickname 받아서

      const msgRes = await axios.get(`http://localhost:8080/api/chatrooms/${roomId}/messages`, { withCredentials: true });
      setMessages(msgRes.data);
    } catch (err) {
      console.error("메세지 불러오기 실패", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !roomId) return;

    try {
      await axios.post('http://localhost:8080/api/chatrooms/messages', {
        roomId: roomId,
        content: input
      }, { withCredentials: true });

      // 메세지 보낸 직후 다시 메세지 리스트 새로고침
      const msgRes = await axios.get(`http://localhost:8080/api/chatrooms/${roomId}/messages`, { withCredentials: true });
      setMessages(msgRes.data);

      setInput('');
    } catch (err) {
      console.error("메세지 전송 실패", err);
    }
  };

  const handleLeaveChat = () => {
    setSelectedFriend(null);
    setRoomId(null);
    setMessages([]);
    setInput('');
  };

  return (
    <div className="messages-layout">
      <ChatList
        chatRooms={chatRooms}
        onSelectChatRoom={handleSelectChatRoom}
        selectedRoomId={roomId}
      />
      <div className="chat-container">
        <ChatRoom
          friend={selectedFriend}
          messages={messages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          onLeaveChat={handleLeaveChat}
        />
      </div>
    </div>
  );
};

export default MessagesPage;
