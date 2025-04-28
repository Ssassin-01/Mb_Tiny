import React, { useState, useEffect } from "react";
import "../../css/recommend/FriendRecommend.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 

const FriendRecommend = () => {
  const navigate = useNavigate(); 
  const [recommendedFriends, setRecommendedFriends] = useState([
    { id: 1, nickname: "nickname1", mbti: "ISFP", img: "/img/user1.jpg" },
    { id: 2, nickname: "nickname2", mbti: "ISFJ", img: "/img/user2.jpg" },
    { id: 3, nickname: "nickname3", mbti: "ESFP", img: "/img/user3.jpg" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [requestedIds, setRequestedIds] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFollowClick = (id) => {
    if (!requestedIds.includes(id)) {
      setRequestedIds((prev) => [...prev, id]);
      // TODO: API 호출 처리도 여기서 가능
    }
  };

  const handleProfileClick = (id) => {
    navigate(`/profile/${id}`); // 클릭하면 이동
  };

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
                <li
                  key={friend.id}
                  className="friend-item"
                  onClick={() => handleProfileClick(friend.id)} // 여기 추가
                  style={{ cursor: "pointer" }} // 클릭 가능 표시
                >
                  <img
                    src={friend.img}
                    alt={friend.nickname}
                    className="friend-profile-img"
                  />
                  <div className="friend-info">
                    <span className="friend-nickname">{friend.nickname}</span>
                    <span className="mbti-text">{friend.mbti}</span>
                  </div>
                  <button
                    className={`follow-friend-btn ${
                      requestedIds.includes(friend.id) ? "requested" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // 버튼 누를 때 친구 프로필로 이동 방지
                      handleFollowClick(friend.id);
                    }}
                    disabled={requestedIds.includes(friend.id)}
                  >
                    {requestedIds.includes(friend.id) ? "요청됨" : "팔로우"}
                  </button>
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
