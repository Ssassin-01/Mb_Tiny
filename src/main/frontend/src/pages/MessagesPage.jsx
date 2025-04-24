import React, { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';
import ChatRoom from '../components/ChatRoom';
import MessageInput from '../components/MessageInput';
import '../css/MessagesPage.css';

const MessagesPage = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  // 더미 친구 50명 생성
  useEffect(() => {
    const dummyFriends = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `친구${i + 1}`,
      profileImg: `/img/profile${(i % 5) + 1}.png`, // 1~5번 이미지 반복
    }));
    setFriends(dummyFriends);
  }, []);

  // 선택된 친구 변경 시 메시지 초기화
  useEffect(() => {
    if (selectedFriend) {
      setMessages([
        { id: 1, sender: 'you', content: `${selectedFriend.name}의 메시지입니다.` },
        { id: 2, sender: 'me', content: '안녕!' },
      ]);
    }
  }, [selectedFriend]);

  // 메시지 전송
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'me', content: input }]);
    setInput('');
  };

  return (
    <div className="messages-layout">
      <ChatList
        friends={friends}
        onSelectFriend={setSelectedFriend}
        selectedFriend={selectedFriend}
      />
      <div className="chat-container">
        <ChatRoom friend={selectedFriend} messages={messages} />
        <MessageInput input={input} setInput={setInput} handleSend={handleSend} />
      </div>
    </div>
  );
};

export default MessagesPage;
