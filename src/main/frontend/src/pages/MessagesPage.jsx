import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatList from '../components/chat/ChatList';
import ChatRoom from '../components/chat/ChatRoom';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { useLocation } from 'react-router-dom';
import '../css/chat/MessagesPage.css';

const MessagesPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const preselectedRoomId = query.get('roomId');

  const [stompClient, setStompClient] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [myNickname, setMyNickname] = useState('');

  // ✅ WebSocket 연결
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat", null, {
      transports: ["websocket"]
    });
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("✅ WebSocket 연결 완료");
      setStompClient(client);
    });
  }, []);

  // ✅ 채팅방 목록 & 나의 닉네임 불러오기
  useEffect(() => {
    axios.get('http://localhost:8080/api/chatrooms', { withCredentials: true })
      .then(res => {
        const updatedRooms = res.data.map(room => ({
          ...room,
          targetNickname: room.receiverNickname
        }));
        setChatRooms(updatedRooms);

        if (preselectedRoomId) {
          const found = updatedRooms.find(room => room.roomId === Number(preselectedRoomId));
          if (found) handleSelectChatRoom(found);
        }
      })
      .catch(err => console.error("채팅방 목록 불러오기 실패", err));

    axios.get('http://localhost:8080/api/members/me', { withCredentials: true })
      .then(res => setMyNickname(res.data.nickname))
      .catch(err => console.error("닉네임 불러오기 실패", err));
  }, [preselectedRoomId]);

  // ✅ 채팅방 선택 (구독 제거됨)
  const handleSelectChatRoom = async (chatRoom) => {
    try {
      const { roomId, targetNickname } = chatRoom;
      setRoomId(roomId);
      setSelectedFriend({ nickname: targetNickname, profileImgUrl: chatRoom.profileImgUrl });

      if (subscription) {
        subscription.unsubscribe();
      }

      const msgRes = await axios.get(`http://localhost:8080/api/chatrooms/${roomId}/messages`, { withCredentials: true });
      setMessages(msgRes.data);
    } catch (err) {
      console.error("메세지 불러오기 실패", err);
    }
  };

  // ✅ stomp 연결 후 구독 수행
  useEffect(() => {
    if (roomId && stompClient && stompClient.connected) {
      console.log("📡 stomp 구독 시도:", roomId);

      const sub = stompClient.subscribe(`/topic/room/${roomId}`, (msg) => {
        const newMessage = JSON.parse(msg.body);
        console.log("📨 실시간 수신:", newMessage);
        setMessages(prev => [...prev, newMessage]);

        const updatedRooms = chatRooms.map(room =>
          room.roomId === roomId
            ? {
                ...room,
                lastMessage: newMessage.content,
                lastSentAt: newMessage.sentAt
              }
            : room
        );

        const sortedRooms = [...updatedRooms].sort((a, b) =>
          new Date(b.lastSentAt || 0) - new Date(a.lastSentAt || 0)
        );
        setChatRooms(sortedRooms);
      });

      setSubscription(sub);

      return () => {
        console.log("❌ stomp 구독 해제:", roomId);
        sub.unsubscribe();
      };
    }
  }, [roomId, stompClient?.connected]);

  const handleSend = () => {
    if (!input.trim() || !roomId || !stompClient) return;

    const now = new Date();

    const message = {
      roomId,
      content: input,
      senderNickname: myNickname,
      sentAt: now
    };
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
    setInput('');

    const updatedRooms = chatRooms.map(room =>
      room.roomId === roomId
        ? {
            ...room,
            lastMessage: message.content,
            lastSentAt: now
          }
        : room
    );

    const sortedRooms = [...updatedRooms].sort((a, b) =>
      new Date(b.lastSentAt || 0) - new Date(a.lastSentAt || 0)
    );
    setChatRooms(sortedRooms);
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
          myNickname={myNickname}
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
