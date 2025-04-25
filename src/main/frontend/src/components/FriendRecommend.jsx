import React, { useState, useEffect } from "react";
import "../css/FriendRecommend.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const recommendedFriends = [
  {
    id: 1,
    nickname: "nickname1",
<<<<<<< HEAD
    mbti:"isfp",
    img: "/img/user1.jpg",
    
=======
    mbti: "isfp",
    img: "/img/user1.jpg",
>>>>>>> 68eaecf4d6951e0392ba4d063848baaa2609d27e
  },
  {
    id: 2,
    nickname: "nickname2",
<<<<<<< HEAD
    mbti:"isfj",
    img: "/img/user2.jpg",
    
=======
    mbti: "isfj",
    img: "/img/user2.jpg",
>>>>>>> 68eaecf4d6951e0392ba4d063848baaa2609d27e
  },
  {
    id: 3,
    nickname: "nickname3",
<<<<<<< HEAD
    mbti:"esfp",
    img: "/img/user3.jpg",
    
=======
    mbti: "esfp",
    img: "/img/user3.jpg",
>>>>>>> 68eaecf4d6951e0392ba4d063848baaa2609d27e
  },
];

const FriendRecommend = () => {
<<<<<<< HEAD
  const [isOpen, setIsOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
=======
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [requestedIds, setRequestedIds] = useState([]);
>>>>>>> 68eaecf4d6951e0392ba4d063848baaa2609d27e

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

<<<<<<< HEAD
=======
  const handleFollowClick = (id) => {
    if (!requestedIds.includes(id)) {
      setRequestedIds((prev) => [...prev, id]);
      // TODO: API 호출 처리도 여기서 가능
    }
  };

>>>>>>> 68eaecf4d6951e0392ba4d063848baaa2609d27e
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
<<<<<<< HEAD
                    alt={friend.name}
=======
                    alt={friend.nickname}
>>>>>>> 68eaecf4d6951e0392ba4d063848baaa2609d27e
                    className="friend-profile-img"
                  />
                  <div className="friend-info">
                    <span className="friend-nickname">{friend.nickname}</span>
                    <span className="mbti-text">{friend.mbti}</span>
                  </div>
<<<<<<< HEAD
                  <button className="follow-friend-btn">팔로우</button>
=======
                  <button
                    className={`follow-friend-btn ${
                      requestedIds.includes(friend.id) ? "requested" : ""
                    }`}
                    onClick={() => handleFollowClick(friend.id)}
                    disabled={requestedIds.includes(friend.id)}
                  >
                    {requestedIds.includes(friend.id) ? "요청됨" : "팔로우"}
                  </button>
>>>>>>> 68eaecf4d6951e0392ba4d063848baaa2609d27e
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
