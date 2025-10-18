import { useEffect, useState, useRef } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';

export default function NotificationViewer() {
  const [notifications, setNotifications] = useState([]);
  const eventSourceRef = useRef(null);

  // ✅ 환경 감지: 개발(local) vs 배포(EC2)
  const isDev = process.env.NODE_ENV === 'development';
  const SSE_URL = isDev
    ? 'http://localhost:8080/api/notifications/subscribe'
    : '/api/notifications/subscribe';

  useEffect(() => {
    console.log('📡 SSE 연결 시도:', SSE_URL);

    const source = new EventSourcePolyfill(SSE_URL, {
      withCredentials: true, // ✅ 세션 쿠키 자동 포함
    });

    eventSourceRef.current = source;

    source.addEventListener('notification', (event) => {
      console.log('새 알림:', event.data);
      setNotifications((prev) => [...prev, event.data]);
    });

    source.addEventListener('heartbeat', (event) => {
      console.log('💓 heartbeat:', event.data);
    });

    source.onerror = (error) => {
      console.error('❌ SSE 연결 오류:', error);
      source.close();
      eventSourceRef.current = null;
      // ✅ 3초 후 재연결 시도
      setTimeout(() => {
        console.log('♻️ SSE 재연결 시도');
        eventSourceRef.current = new EventSourcePolyfill(SSE_URL, {
          withCredentials: true,
        });
      }, 3000);
    };

    return () => {
      console.log('🔌 SSE 연결 종료');
      source.close();
    };
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', width: '300px' }}>
      <h2>🔔 알림 목록</h2>
      <ul>
        {notifications.length === 0 ? (
          <li>알림이 없습니다.</li>
        ) : (
          notifications.map((noti, index) => <li key={index}>{noti}</li>)
        )}
      </ul>
    </div>
  );
}
