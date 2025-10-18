import { useEffect, useState, useRef } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import '../../css/layout/NotificationBell.css';
import api from '../../api/axiosInstance';

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const eventSourceRef = useRef(null);

  // ✅ 환경 감지
  const isDev = process.env.NODE_ENV === 'development';
  const SSE_URL = isDev
    ? 'http://localhost:8080/api/notifications/subscribe'
    : '/api/notifications/subscribe';

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await api.get('/notifications/unread');
        setNotifications(res.data.map((msg) => ({ message: msg })));
        setUnreadCount(res.data.length);
      } catch (error) {
        console.error('❌ 초기 알림 불러오기 실패:', error);
      }
    };

    const connect = () => {
      if (eventSourceRef.current) return; // 중복 연결 방지

      // ✅ 환경별 자동 URL
      const source = new EventSourcePolyfill(SSE_URL, {
        withCredentials: true,
      });
      eventSourceRef.current = source;

      source.addEventListener('notification', (event) => {
        console.log('🔔 새 알림:', event.data);
        setNotifications((prev) => [...prev, { message: event.data }]);
        setUnreadCount((prev) => prev + 1);
      });

      source.addEventListener('heartbeat', (event) => {
        console.log('💓 heartbeat:', event.data);
      });

      source.onerror = (error) => {
        console.error('❌ SSE 연결 오류 발생. 3초 후 재연결 시도', error);
        source.close();
        eventSourceRef.current = null;
        setTimeout(connect, 3000);
      };
    };

    fetchUnread();
    connect();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  const handleBellClick = async () => {
    setShowDropdown((prev) => !prev);

    if (unreadCount > 0) {
      try {
        await api.post('/notifications/mark-as-read');
        setUnreadCount(0);
      } catch (error) {
        console.error('❌ 읽음 처리 실패:', error);
      }
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={handleBellClick} className='notification-bell'>
        🔔
        {unreadCount > 0 && (
          <span className='notification-badge'>{unreadCount}</span>
        )}
      </button>

      {showDropdown && (
        <div className='notification-dropdown'>
          <div className='notification-title'>📢 알림</div>
          {notifications.length === 0 ? (
            <div className='notification-empty'>알림이 없습니다.</div>
          ) : (
            notifications.map((noti, idx) => (
              <div key={idx} className='notification-item'>
                {noti.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
