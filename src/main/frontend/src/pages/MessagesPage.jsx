// src/pages/MessagesPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatList from '../components/ChatList';
import ChatRoom from '../components/ChatRoom';
import '../css/MessagesPage.css';

const MessagesPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [roomId, setRoomId] = useState(null);
  const myId = 1; // 로그인된 사용자 ID (예시)

  // ✅ 사용자 목록 불러오기 + 실패 시 더미 유저 대체
  useEffect(() => {
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error('실제 API 호출 실패, 더미 유저로 대체');
        const dummyUsers = Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          name: `사용자${i + 1}`,
          profileImg: `/img/profile${(i % 5) + 1}.png`,
          status: `안녕하세요 ${i + 1}번입니다.`,
        }));
        setUsers(dummyUsers);
      });
  }, []);

  // ✅ 유저 클릭 시 ChatRoom이 항상 뜨도록 보장
  const handleSelectUser = async (user) => {
    try {
      const res = await axios.post('/api/chatroom/create', {
        senderId: myId,
        receiverId: user.id,
      });

      const createdRoom = res.data;
      setRoomId(createdRoom.roomId);
      setSelectedFriend(user);

      const msgRes = await axios.get(`/api/chatroom/${createdRoom.roomId}/messages`);
      setMessages(msgRes.data);
    } catch (err) {
      console.warn('API 실패, 더미 채팅방 생성');
      setSelectedFriend(user);
      setRoomId(user.id); // 더미 roomId
      setMessages([
        { id: 1, sender: 'you', content: `${user.name}와의 더미 대화입니다.` },
        { id: 2, sender: 'me', content: '안녕!' }
      ]);
    }
  };

  // ✅ 지금은 API 없이 화면에만 메시지 반영
  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        content: input,
      }
    ]);

    setInput('');
  };

  // ✅ 채팅방 나가기 버튼 클릭 시 상태 초기화 + 유저 목록 제거
  const handleLeaveChat = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setSelectedFriend(null);
    setMessages([]);
    setInput('');
  };

  return (
    <div className="messages-layout">
      <ChatList
        users={users}
        onSelectUser={handleSelectUser}
        selectedUser={selectedFriend}
      />
      <div className="chat-container">
        <ChatRoom
          friend={selectedFriend}
          messages={messages}
          setMessages={setMessages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          onLeaveChat={handleLeaveChat} // ✅ 나가기 기능 props 전달
        />
      </div>
    </div>
  );
};

export default MessagesPage;
