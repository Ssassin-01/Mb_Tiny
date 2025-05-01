import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import "../../css/recommend/FriendRecommend.css";
import FriendRecommendFilter from "./FriendRecommendFilter";
import FollowButton from "../follow/FollowButton";
import axios from "axios";

const FriendRecommend = () => {
  const navigate = useNavigate();
  const [recommendedFriends, setRecommendedFriends] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mbtiFilter, setMbtiFilter] = useState(["선택 안함", "선택 안함", "선택 안함", "선택 안함"]);
  const [friendCount, setFriendCount] = useState(20);
  const [followerCounts, setFollowerCounts] = useState({});
  const [disappearingIds, setDisappearingIds] = useState(new Set());

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
      const res = await axios.get(`http://localhost:8080/api/members/random/exclude?count=${count}`, {
        withCredentials: true,
      });
      setRecommendedFriends(res.data);
    } catch (err) {
      console.error("회원 목록 불러오기 실패", err);
    }
  };

  const fetchFollowerCount = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/follow/count/${userId}`, {
        withCredentials: true,
      });
      setFollowerCounts((prev) => ({
        ...prev,
        [userId]: res.data.followers,
      }));
    } catch (err) {
      console.error("팔로워 수 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    recommendedFriends.forEach((friend) => {
      fetchFollowerCount(friend.id);
    });
  }, [recommendedFriends]);

  const handleProfileClick = (nickname) => {
    navigate(`/profile/${nickname}`);
  };

  const handleFilterChange = (idx, value) => {
    const updated = [...mbtiFilter];
    updated[idx] = value;
    setMbtiFilter(updated);
  };

  const handleFriendCountChange = (e) => {
    const selectedCount = parseInt(e.target.value);
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

  const getProfileImageUrl = (url) => {
    if (!url || url.trim() === "") return "/img/default-profile.png";
    return `http://localhost:8080${url}`;
  };

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
                  className={`friend-item ${disappearingIds.has(friend.id) ? "disappear" : ""}`}
                  onClick={() => handleProfileClick(friend.nickname)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={getProfileImageUrl(friend.profileImgUrl)}
                    alt={friend.nickname}
                    className="friend-profile-img"
                  />
                  <div className="friend-info">
                    <span className="friend-nickname">{friend.nickname}</span>
                    <span className="mbti-text">{friend.mbti}</span>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <FollowButton
                      targetId={friend.id}
                      onFollowChange={() => {
                        fetchFollowerCount(friend.id);
                        setDisappearingIds((prev) => new Set(prev).add(friend.id));
                        setTimeout(() => {
                          setRecommendedFriends((prev) => prev.filter((f) => f.id !== friend.id));
                        }, 400);
                      }}
                    />
                  </div>
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
