import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FollowButton from '../follow/FollowButton';
import FollowModal from '../follow/FollowModal';
import mbtiDescriptions from './mbtiDescriptions';
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
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const mbtiInfo = mbtiDescriptions[mbti?.toUpperCase()] || {
    title: '성격유형',
    tags: [],
    description: '아직 등록되지 않은 MBTI입니다.',
  };

  // 팔로우 수 불러오기
  const fetchFollowCounts = async () => {
    try {
      const url = isOwner
        ? 'http://localhost:8080/api/follow/count'
        : `http://localhost:8080/api/follow/count/${targetId}`;
      const res = await axios.get(url, { withCredentials: true });
      setFollowerCount(res.data.followers);
      setFollowingCount(res.data.following);
    } catch (error) {
      console.error('팔로우 수 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    if (targetId) {
      fetchFollowCounts();
    }
  }, [targetId, isOwner]);

  return (
    <div className="profile-left">
      <div className="profile-card">
        <div className="profile-img-wrapper">
          {profileImgUrl ? (
            <img src={profileImgUrl} alt="프로필" className="profile-img" />
          ) : (
            <div className="default-profile-img">사진 없음</div>
          )}
        </div>

        <p className="profile-nickname">{nickname}</p>
        <div className="profile-info">
          <p className="profile-mbti">{mbti}</p>
          <p><strong>가입일:</strong> {joinDate}</p>

          <div className="profile-stats">
            <div className="stats-buttons">
              <span className="stats-item" onClick={onTogglePosts}>
                게시글 {postCount}
              </span>
              <span className="stats-item" onClick={() => openModal('followers')}>
                팔로워 {followerCount}
              </span>
              <span className="stats-item" onClick={() => openModal('following')}>
                팔로잉 {followingCount}
              </span>
            </div>
          </div>

          {!isOwner && (
            <FollowButton targetId={targetId} onFollowChange={fetchFollowCounts} />
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

      {modalType && (
        <FollowModal
          type={modalType}
          targetId={targetId}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default FriendProfileLeft;