import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { FaEnvelope, FaUserPlus } from "react-icons/fa";
import "../../css/layout/Topbar.css";
// import axios from "axios";

const Topbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "message", text: "새로운 메시지가 도착했어요!" },
    { id: 2, type: "follow", text: "user12님이 팔로우 요청을 보냈습니다.", userId: 2 }
  ]);

  useEffect(() => {
    // ****백엔드 안 되는 동안 강제 로그인된 상태로 보기****
    setUser({
      nickname: "nickname",
      mbti: "MBTI"
    });
  }, []);
  

  // 로그인한 사용자 정보 불러오기
  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/members/me", {
  //     withCredentials: true
  //   })
  //     .then((res) => {
  //       setUser(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("로그인 사용자 정보 불러오기 실패", err);
  //     });
  // }, []);

  const handleNotificationClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const goToMessages = () => {
    navigate("/messages");
  };

  const goToUserProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const goToMyProfile = () => {
    navigate("/profile/me");
  };

  const unreadCount = notifications.length;

  return (
    <div className="topbar">
      <div className="logo">
        <img src="/img/logo.png" alt="로고" className="logo-img" />
      </div>

      <div className="topbar-center">
        <input type="text" className="search-input" placeholder="검색하기" />
      </div>

      <div className="topbar-right">
        {user ? (
          <>
            {/* 🔔 알림 아이콘 */}
            <div className="notification-wrapper" onClick={handleNotificationClick}>
              <IoMdNotifications className="notification-icon" />
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
              {isDropdownOpen && (
  <div className="dropdown">
    {notifications.length > 0 ? (
      notifications.map((noti) => (
        <div
          key={noti.id}
          className="notification-item"
          onClick={() =>
            noti.type === "message"
              ? goToMessages()
              : goToUserProfile(noti.userId)
          }
        >
          <span className="notification-icon">
            {noti.type === "message" ? <FaEnvelope /> : <FaUserPlus />}
          </span>
          <span className="notification-text">{noti.text}</span>
          <span className="notification-time">방금 전</span>
        </div>
      ))
    ) : (
      <div className="notification-item">
        <span className="notification-text">🔕 새로운 알림이 없습니다</span>
      </div>
    )}
  </div>
)}

            </div>

            {/* 🧠 MBTI 카드 + 닉네임 */}
            <div className="mbti-card" onClick={goToMyProfile}>
              {user.nickname} ・ {user.mbti}
            </div>
          </>
        ) : (
          <button className="join-button" onClick={() => navigate("/login")}>
            로그인
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
