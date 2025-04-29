import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function MessagesTest() {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [roomId, setRoomId] = useState("room1");
  const subscriptionRef = useRef(null); // ✅ 현재 구독을 저장할 ref

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("Connected to WebSocket");

        // ✅ 연결 성공했을 때 roomId 구독
        subscribeToRoom(stompClient, roomId);

        setClient(stompClient);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      }
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []); // ✅ 최초 1번만 연결

  // ✅ roomId가 변경될 때마다 구독 변경
  useEffect(() => {
    if (client && client.connected) {
      subscribeToRoom(client, roomId);
    }
  }, [roomId, client]);

  // ✅ 구독 처리 함수
  const subscribeToRoom = (stompClient, roomId) => {
    // 이전 구독이 있으면 먼저 unsubscribe
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    // 새로운 방 구독
    const subscription = stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
      const receivedMessage = JSON.parse(message.body);
      setMessages(prevMessages => {
        const roomMessages = prevMessages[roomId] || [];
        return {
          ...prevMessages,
          [roomId]: [...roomMessages, receivedMessage]
        };
      });
    });

    // 구독 객체 저장
    subscriptionRef.current = subscription;

    // ✅ 방을 바꿀 때 기존 메세지 지워주고 싶으면 이 줄 추가
//     setMessages([]);
  };

  const sendMessage = () => {
    if (client && client.connected) {
      client.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify({
          roomId: roomId,
          sender: "User1",
          content: message
        })
      });
      setMessage("");
    } else {
      console.error("STOMP client not connected yet.");
    }
  };

  return (
    <div>
      <h2>채팅방: {roomId}</h2>

      <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
        <option value="room1">room1</option>
        <option value="room2">room2</option>
        <option value="room3">room3</option>
      </select>

        {(messages[roomId] || []).map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메세지 입력"
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}

export default MessagesTest;
