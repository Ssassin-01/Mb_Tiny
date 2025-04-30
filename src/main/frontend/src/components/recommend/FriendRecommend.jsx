import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import "../../css/recommend/FriendRecommend.css";
import FriendRecommendFilter from "./FriendRecommendFilter";
import axios from "axios";

const FriendRecommend = () => {
  const navigate = useNavigate();
  const [recommendedFriends, setRecommendedFriends] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [requestedIds, setRequestedIds] = useState(new Set()); // ⭐️ Set으로 변경
  const [mbtiFilter, setMbtiFilter] = useState(["선택 안함", "선택 안함", "선택 안함", "선택 안함"]);
  const [friendCount, setFriendCount] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchFriends(friendCount);
  }, [friendCount]);

  const fetchFriends = async (count) => {
    try {
      const savedFriends = sessionStorage.getItem('recommendedFriends');
      if (savedFriends) {
        setRecommendedFriends(JSON.parse(savedFriends));
      } else {
        const res = await axios.get(`http://localhost:8080/api/members/random?count=${count}`, { withCredentials: true });
        setRecommendedFriends(res.data);
        sessionStorage.setItem('recommendedFriends', JSON.stringify(res.data));
      }
    } catch (err) {
      console.error('회원 목록 불러오기 실패', err);
    }
  };

  const handleFollowClick = (e, id) => {
    e.stopPropagation(); // ⭐️ 버튼 클릭 시 부모로 이벤트 전파 막기
    setRequestedIds(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id); // 이미 팔로우 되어 있으면 제거
      } else {
        updated.add(id); // 아니면 추가
      }
      return updated;
    });
  };

  const handleProfileClick = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleFilterChange = (idx, value) => {
    const updated = [...mbtiFilter];
    updated[idx] = value;
    setMbtiFilter(updated);
  };

  const handleFriendCountChange = (e) => {
    const selectedCount = parseInt(e.target.value);
    sessionStorage.removeItem('recommendedFriends');
    setFriendCount(selectedCount);
  };

  const filteredFriends = recommendedFriends.filter((friend) => {
    const mbti = friend.mbti;
    return (
      (mbtiFilter[0] === "선택 안함" || mbti[0] === mbtiFilter[0]) &&
      (mbtiFilter[1] === "선택 안함" || mbti[1] === mbtiFilter[1]) &&
      (mbtiFilter[2] === "선택 안함" || mbti[2] === mbtiFilter[2]) &&
      (mbtiFilter[3] === "선택 안함" || mbti[3] === mbtiFilter[3])
    );
  });

  return (
    <>
      {isMobile && (
        <button className="friend-toggle-btn" onClick={() => setIsOpen(true)}>
          친구 추천
        </button>
      )}

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
              <FaUserFriends className="location-icon" />
              친구 추천
            </h4>

            <div className="friend-count-select">
              <label htmlFor="friendCount">추천 인원: </label>
              <select id="friendCount" value={friendCount} onChange={handleFriendCountChange}>
                <option value={5}>5명</option>
                <option value={10}>10명</option>
                <option value={20}>20명</option>
              </select>
            </div>

            <FriendRecommendFilter mbtiFilter={mbtiFilter} onChange={handleFilterChange} />

            <ul className="friend-list">
              {filteredFriends.map((friend) => (
                <li
                  key={friend.id}
                  className="friend-item"
                  onClick={() => handleProfileClick(friend.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={friend.profileImgUrl || "/img/default-profile.png"}
                    alt={friend.nickname}
                    className="friend-profile-img"
                  />
                  <div className="friend-info">
                    <span className="friend-nickname">{friend.nickname}</span>
                    <span className="mbti-text">{friend.mbti}</span>
                  </div>
                  <button
                    className={`follow-friend-btn ${requestedIds.has(friend.id) ? "requested" : ""}`}
                    onClick={(e) => handleFollowClick(e, friend.id)}
                  >
                    {requestedIds.has(friend.id) ? "팔로잉" : "팔로우"}
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
