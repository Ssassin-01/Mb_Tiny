import React, { useState, useEffect } from "react";
import "../css/FriendRecommend.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const recommendedFriends = [
  {
    id: 1,
    name: "A",
    mutual: "3명의 친구와 공통",
    img: "/img/user1.jpg",
    distance: "📍 1.2km"
  },
  {
    id: 2,
    name: "B",
    mutual: "2명의 친구와 공통",
    img: "/img/user2.jpg",
    distance: "📍 0.6km"
  },
  {
    id: 3,
    name: "C",
    mutual: "4명의 친구와 공통",
    img: "/img/user3.jpg",
    distance: "📍 2.5km"
  },
];

const FriendRecommend = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* 모바일 버튼 */}
      {isMobile && (
        <button className="friend-toggle-btn" onClick={() => setIsOpen(true)}>
          주변 친구
        </button>
      )}

      {/* 추천 친구 리스트 */}
      {(!isMobile || isOpen) && (
        <div
          className={isMobile ? "friend-modal-backdrop" : ""}
          onClick={isMobile ? () => setIsOpen(false) : undefined}
        >
          <div
            className={isMobile ? "friend-modal-content" : "friend-recommend"}
            onClick={(e) => isMobile && e.stopPropagation()}
          >
            <h4 className="title">
              <FaMapMarkerAlt className="location-icon" />
              내 주변 친구 추천
            </h4>
            <ul className="friend-list">
              {recommendedFriends.map((friend) => (
                <li key={friend.id} className="friend-item">
                  <img
                    src={friend.img}
                    alt={friend.name}
                    className="friend-profile-img"
                  />
                  <div className="friend-info">
                    <span className="friend-name">{friend.name}</span>
                    <span className="mutual-text">{friend.mutual}</span>
                    <span className="friend-distance">{friend.distance}</span>
                  </div>
                  <button className="add-friend-btn">추가</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendRecommend;
