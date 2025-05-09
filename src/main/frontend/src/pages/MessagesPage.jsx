import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatList from '../components/chat/ChatList';
import ChatRoom from '../components/chat/ChatRoom';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/chat/MessagesPage.css';

const MessagesPage = () => {
  const navigate = useNavigate();
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
  const [message, setMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);

  // 로그인한 사용자 닉네임 가져오기
  useEffect(() => {
    axios.get('http://localhost:8080/api/members/me', { withCredentials: true })
      .then(res => setMyNickname(res.data.nickname))
      .catch(err => {
        console.error('로그인 사용자 정보 실패:', err);
        showAutoBannerThenLogin("로그인이 필요합니다.");
      });
  }, []);

  // 로그인 필요 배너 + 리디렉션
  const showAutoBannerThenLogin = (text) => {
    setMessage(text);
    setShowBanner(true);
    setTimeout(() => {
      setShowBanner(false);
      navigate('/login');
    }, 1000);
  };

  // WebSocket 연결
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat", null, {
      transports: ["websocket"]
    });
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("WebSocket 연결 완료");
      setStompClient(client);
    });

    return () => {
      if (client && client.connected) client.disconnect();
    };
  }, []);

  // 채팅방 목록 불러오기
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
      .catch(err => console.error("채팅방 목록 실패", err));
  }, [preselectedRoomId]);

  // 채팅방 선택
  const handleSelectChatRoom = async (chatRoom) => {
    try {
      const { roomId, targetNickname } = chatRoom;
      setRoomId(roomId);
      setSelectedFriend({ nickname: targetNickname, profileImgUrl: chatRoom.profileImgUrl });

      if (subscription) {
        subscription.unsubscribe();
      }

      const msgRes = await axios.get(`http://localhost:8080/api/chatrooms/${roomId}/messages`, {
        withCredentials: true
      });
      setMessages(msgRes.data);
    } catch (err) {
      console.error("메시지 불러오기 실패", err);
    }
  };

  // stomp 구독 (메시지 수신)
  useEffect(() => {
    if (roomId && stompClient && stompClient.connected) {
      console.log("stomp 구독:", roomId);

      const sub = stompClient.subscribe(`/topic/room/${roomId}`, (msg) => {
        const newMessage = JSON.parse(msg.body);
        console.log("실시간 메시지 수신:", newMessage);
        setMessages(prev => [...prev, newMessage]);

        // 최신 메시지 업데이트
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
        console.log("구독 해제:", roomId);
        sub.unsubscribe();
      };
    }
  }, [roomId, stompClient?.connected]);

  // 메시지 전송
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

    // 바로 UI 반영
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

  // 채팅방 나가기
  const handleLeaveChat = () => {
    setSelectedFriend(null);
    setRoomId(null);
    setMessages([]);
    setInput('');
  };

  return (
    <>
      {/* 로그인 안내 배너 */}
      {showBanner && <div className="login-banner">{message}</div>}

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
    </>
  );
};

export default MessagesPage;
