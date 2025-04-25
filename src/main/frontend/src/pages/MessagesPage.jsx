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

  useEffect(() => {
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(() => {
        const dummyUsers = Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          name: `사용자${i + 1}`,
          profileImg: `/img/profile${(i % 5) + 1}.png`,
          status: `안녕하세요 ${i + 1}번입니다.`,
        }));
        setUsers(dummyUsers);
      });
  }, []);

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
      setSelectedFriend(user);
      setRoomId(user.id); // 더미 roomId
      setMessages([
        { id: 1, sender: 'you', content: `${user.name}와의 더미 대화입니다.` },
        { id: 2, sender: 'me', content: '안녕!' }
      ]);
    }
  };

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

  const handleLeaveChat = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setSelectedFriend(null);
    setMessages([]);
    setInput('');
  };

  const handleDeleteUsers = (ids) => {
    setUsers(prev => prev.filter(user => !ids.includes(user.id)));
    if (selectedFriend && ids.includes(selectedFriend.id)) {
      setSelectedFriend(null);
      setMessages([]);
    }
  };

  return (
    <div className="messages-layout">
      <ChatList
        users={users}
        onSelectUser={handleSelectUser}
        selectedUser={selectedFriend}
        onDelete={handleDeleteUsers} // ✅ 전달 필수
      />
      <div className="chat-container">
        <ChatRoom
          friend={selectedFriend}
          messages={messages}
          setMessages={setMessages}
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
