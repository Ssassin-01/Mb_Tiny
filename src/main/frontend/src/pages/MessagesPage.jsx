import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ChatList from '../components/chat/ChatList';
import ChatRoom from '../components/chat/ChatRoom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import '../css/chat/MessagesPage.css';

const MessagesPage = () => {
  const [stompClient, setStompClient] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [myNickname, setMyNickname] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const targetNickname = queryParams.get('nickname');

  // ✅ 중복 생성 방지용 ref
  const isCreatingRoom = useRef(false);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat", null, {
      transports: ["websocket"]
    });
    const client = Stomp.over(socket);

    client.connect({}, () => {
      setStompClient(client);
    });

    axios.get('http://localhost:8080/api/chatrooms', { withCredentials: true })
      .then(res => {
        const updatedRooms = res.data.map(room => ({
          ...room,
          targetNickname: room.receiverNickname
        }));
        setChatRooms(updatedRooms);
      })
      .catch(err => console.error("채팅방 목록 불러오기 실패", err));

    axios.get('http://localhost:8080/api/members/me', { withCredentials: true })
      .then(res => setMyNickname(res.data.nickname))
      .catch(err => console.error("닉네임 불러오기 실패", err));
  }, []);

  // ✅ 채팅방 자동 진입 & 생성 (자기 자신 방지 + 중복 생성 방지)
  useEffect(() => {
    if (!targetNickname || !myNickname || !Array.isArray(chatRooms)) return;

    if (targetNickname === myNickname) {
      console.warn("❌ 자기 자신과는 채팅할 수 없습니다.");
      return;
    }

    const existingRoom = chatRooms.find(room =>
      room.receiverNickname === targetNickname || room.targetNickname === targetNickname
    );

    if (existingRoom) {
      handleSelectChatRoom(existingRoom);
    } else if (!isCreatingRoom.current) {
      isCreatingRoom.current = true;

      axios.post(
        'http://localhost:8080/api/chatrooms',
        { receiverNickname: targetNickname },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
        .then(res => {
          const newRoom = {
            ...res.data,
            targetNickname: res.data.receiverNickname
          };

          // 중복 방지: 닉네임 중복 여부 재확인
          const alreadyExists = chatRooms.some(
            room => room.receiverNickname === newRoom.receiverNickname || room.targetNickname === newRoom.receiverNickname
          );
          if (!alreadyExists) {
            setChatRooms(prev => [newRoom, ...prev]);
          }

          handleSelectChatRoom(newRoom);
        })
        .catch(err => console.error("채팅방 생성 실패", err))
        .finally(() => {
          isCreatingRoom.current = false;
        });
    }
  }, [targetNickname, chatRooms, myNickname]);

  const handleSelectChatRoom = async (chatRoom) => {
    try {
      const { roomId, targetNickname } = chatRoom;
      setRoomId(roomId);
      setSelectedFriend({ nickname: targetNickname });

      if (subscription) subscription.unsubscribe();

      const msgRes = await axios.get(`http://localhost:8080/api/chatrooms/${roomId}/messages`, { withCredentials: true });
      setMessages(msgRes.data);

      if (stompClient && stompClient.connected) {
        const sub = stompClient.subscribe(`/topic/room/${roomId}`, (msg) => {
          const newMessage = JSON.parse(msg.body);
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

          const sortedRooms = [...updatedRooms].sort((a, b) => new Date(b.lastSentAt || 0) - new Date(a.lastSentAt || 0));
          setChatRooms(sortedRooms);
        });
        setSubscription(sub);
      }
    } catch (err) {
      console.error("메세지 불러오기 실패", err);
    }
  };

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

    const sortedRooms = [...updatedRooms].sort((a, b) => new Date(b.lastSentAt || 0) - new Date(a.lastSentAt || 0));
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
