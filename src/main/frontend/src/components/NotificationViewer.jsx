import { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';

export default function NotificationViewer() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const source = new EventSourcePolyfill(
      'http://localhost:8080/api/notifications/subscribe',
      {
        withCredentials: true, // ✅ 세션 쿠키(JSESSIONID) 자동 전송
      }
    );

    source.addEventListener('notification', (event) => {
      console.log('✅ 새 알림:', event.data);
      setNotifications((prev) => [...prev, event.data]);
    });

    source.onerror = (error) => {
      console.error('❌ SSE 연결 오류:', error);
      source.close();
    };

    return () => {
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
