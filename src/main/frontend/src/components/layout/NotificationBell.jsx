import { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import "../../css/layout/NotificationBell.css";

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    let source;

    const fetchUnread = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/notifications/unread',
          { credentials: 'include' }
        );
        const data = await response.json();
        setNotifications(data.map((message) => ({ message })));
        setUnreadCount(data.length);
      } catch (error) {
        console.error('❌ 초기 알림 불러오기 실패', error);
      }
    };

    const connect = () => {
      source = new EventSourcePolyfill(
        'http://localhost:8080/api/notifications/subscribe',
        { withCredentials: true }
      );

      source.addEventListener('notification', (event) => {
        console.log('새 알림:', event.data);
        setNotifications((prev) => [...prev, { message: event.data }]);
        setUnreadCount((prev) => prev + 1);
      });

      source.addEventListener('heartbeat', (event) => {
        console.log('💓 heartbeat:', event.data);
      });

      source.onerror = (error) => {
        console.error('❌ SSE 연결 오류 발생. 3초 후 재연결 시도', error);
        source.close();
        setTimeout(connect, 3000);
      };
    };

    fetchUnread();
    connect();

    return () => {
      if (source) source.close();
    };
  }, []);

  const handleBellClick = async () => {
    setShowDropdown((prev) => !prev);

    if (unreadCount > 0) {
      try {
        await fetch('http://localhost:8080/api/notifications/mark-as-read', {
          method: 'POST',
          credentials: 'include',
        });
        setUnreadCount(0);
      } catch (error) {
        console.error('❌ 읽음 처리 실패', error);
      }
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={handleBellClick} className="notification-bell">
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {showDropdown && (
        <div className="notification-dropdown">
          <div className="notification-title">📢 알림</div>
          {notifications.length === 0 ? (
            <div className="notification-empty">알림이 없습니다.</div>
          ) : (
            notifications.map((noti, idx) => (
              <div key={idx} className="notification-item">
                {noti.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
