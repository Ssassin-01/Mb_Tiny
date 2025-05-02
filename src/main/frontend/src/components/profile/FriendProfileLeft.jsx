import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FollowButton from '../follow/FollowButton';
import mbtiDescriptions from './mbtiDescriptions';
import { FaCamera } from 'react-icons/fa'; 
import '../../css/profile/Profile.css';

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
  const navigate = useNavigate();

  // 팔로우 수 불러오기
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
    if (targetId) {
      fetchFollowCounts();
    }
  }, [targetId, isOwner]);

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
          <p><strong>가입일:</strong> {joinDate}</p>

          {/* 팔로우 수 표시 */}
          <div className="profile-stats">
            <div className="stats-buttons">
              <span className="stats-item" onClick={onTogglePosts}>
                게시글 {postCount}
              </span>
              <span className="stats-item">
                팔로워 {followerCount}
              </span>
              <span className="stats-item">
                팔로잉 {followingCount}
              </span>
            </div>
          </div>

          {/* 팔로우 버튼 / 메시지 버튼*/}
          {!isOwner && (
  <>
    <FollowButton
      targetId={targetId}
      onFollowChange={() => {
        setTimeout(() => {
          fetchFollowCounts();
        }, 200);
      }}
    />
  <button
    className="message-btn"
    onClick={async () => {
      try {
        // 1. 채팅방 생성
        const res = await axios.post(
          'http://localhost:8080/api/chatrooms',
          { receiverNickname: nickname },
          { withCredentials: true }
        );
        const roomId = res.data.roomId;
    
        // 2. 전체 채팅방 다시 불러오기
        const listRes = await axios.get('http://localhost:8080/api/chatrooms', { withCredentials: true });
        const updatedRooms = listRes.data.map(room => ({
          ...room,
          targetNickname: room.receiverNickname
        }));
    
        // 3. 찾은 채팅방으로 바로 navigate
        const targetRoom = updatedRooms.find(r => r.roomId === roomId);
        if (targetRoom) {
          navigate(`/messagespage?roomId=${roomId}`);
        }
    
      } catch (err) {
        console.error("❌ 메시지 버튼 실패:", err);
      }
    }}
    style={{ marginTop: '10px' }}
  >
    메시지
  </button>

  </>
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
