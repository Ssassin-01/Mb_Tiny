import { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';

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
          {
            credentials: 'include',
          }
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
        console.log('✅ 새 알림:', event.data);
        setNotifications((prev) => {
          const updated = [...prev, { message: event.data }];
          setUnreadCount(updated.length); // 추가!
          return updated;
        });
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

    fetchUnread(); // 🔥 최초 알림 불러오기
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
      <button
        onClick={handleBellClick}
        style={{
          background: 'transparent',
          border: 'none',
          position: 'relative',
          cursor: 'pointer',
          fontSize: '28px',
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '4px 7px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '120%',
            transform: 'translateY(-50%)',
            width: '280px',
            maxHeight: '300px',
            overflowY: 'auto',
            background: 'white',
            border: '1px solid #ddd',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            zIndex: 999,
            padding: '10px',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              fontSize: '16px',
              marginBottom: '8px',
            }}
          >
            📢 알림
          </div>
          {notifications.length === 0 ? (
            <div
              style={{ padding: '10px', textAlign: 'center', color: '#888' }}
            >
              알림이 없습니다.
            </div>
          ) : (
            notifications.map((noti, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 0',
                  borderBottom:
                    idx !== notifications.length - 1
                      ? '1px solid #eee'
                      : 'none',
                  fontSize: '14px',
                  color: '#333',
                }}
              >
                {noti.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
