import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FollowButton from '../follow/FollowButton';
import mbtiDescriptions from './mbtiDescriptions';
import { FaCamera } from 'react-icons/fa'; 
import { MessageCircle } from 'lucide-react';
import '../../css/profile/Profile.css';
import '../../css/chat/MessageButton.css';



const FriendProfileLeft = ({
  nickname,
  mbti,
  joinDate,
  onTogglePosts,
  postCount,
  isOwner,
  targetId,
  profileImgUrl,
}) => {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // 상태 재갱신 트리거
  const navigate = useNavigate();

  // follower/following 수 불러오기
  const fetchFollowCounts = async () => {
    try {
      const url = isOwner
        ? 'http://localhost:8080/api/follow/count'
        : `http://localhost:8080/api/follow/count/${nickname}`;
      const res = await axios.get(url, { withCredentials: true });

      setFollowerCount(res.data.followers);
      setFollowingCount(res.data.following);
    } catch (error) {
      console.error('❌ 팔로우 수 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    if (!targetId) return;
    fetchFollowCounts(); // targetId 또는 refreshTrigger 바뀔 때만 호출
  }, [targetId, refreshTrigger]);

  // 팔로우 상태 변경 시 count 반영 + 서버 fetch
  const handleFollowChange = (delta) => {
    setFollowerCount(prev => prev + delta);       // 프론트 즉시 반영
    setRefreshTrigger(prev => prev + 1);          // 서버 최신값 재요청
  };

  const mbtiInfo = mbtiDescriptions[mbti?.toUpperCase()] || {
    title: '성격유형',
    tags: [],
    description: '아직 등록되지 않은 MBTI입니다.',
  };

  return (
    <div className="profile-left">
      <div className="profile-card">
        <div className="profile-img-wrapper">
          {profileImgUrl ? (
            <img src={profileImgUrl} alt="프로필" className="profile-img" />
          ) : (
            <div className="default-profile-img">
              <FaCamera className="default-camera-icon" />
            </div>
          )}
        </div>

        <p className="profile-nickname">{nickname}</p>
        <div className="profile-info">
          <p className="profile-mbti">{mbti}</p>

          <div className="profile-stats">
            <div className="stats-buttons">
              <span className="stats-item" onClick={onTogglePosts}>
                게시글 
              </span>
              <span className="stats-item">
                팔로워 {followerCount}
              </span>
              <span className="stats-item">
                팔로잉 {followingCount}
              </span>
            </div>
          </div>

          {/* 팔로우/메시지 버튼 (하단 고정) */}
          {!isOwner && (
            <div className="fixed-follow-btn-wrapper">
              <FollowButton
                targetId={targetId}
                onFollowChange={handleFollowChange}
              />
              <button
                className="message-btn"
                onClick={() => navigate(`/messages?user=${targetId}`)}
                style={{ marginLeft: '10px' }}
              >
                <MessageCircle size={18} style={{ marginRight: 6 }} />
                메시지
              </button>
            </div>
          )}

          <div className="mbti-description">
            <h4>{mbti} 유형: {mbtiInfo.title}</h4>
            <div className="mbti-tags">
              {mbtiInfo.tags.map((tag, idx) => (
                <span key={idx}>{tag}</span>
              ))}
            </div>
            <p>{mbtiInfo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendProfileLeft;
