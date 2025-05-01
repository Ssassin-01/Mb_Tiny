import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import '../../css/profile/Profile.css';
import FollowModal from '../follow/FollowModal';
import mbtiDescriptions from './mbtiDescriptions';
import DeleteId from './DeleteId';

const ProfileLeft = ({
  nickname,
  mbti,
  joinDate,
  onTogglePosts,
  postCount,
  isOwner,
  targetId,
  profileImgUrl  // 추가: 상위 컴포넌트에서 전달
}) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  console.log('profileImgUrl:', profileImgUrl);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const mbtiInfo = mbtiDescriptions[mbti?.toUpperCase()] || {
    title: '성격유형',
    tags: [],
    description: '아직 등록되지 않은 MBTI입니다.',
  };
  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:8080/api/members/delete', {
        withCredentials: true,
      });
      alert('회원탈퇴가 완료되었습니다.');
      sessionStorage.clear();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      alert('탈퇴 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const fetchFollowCount = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/follow/count', { withCredentials: true });
        setFollowerCount(res.data.followers);
        setFollowingCount(res.data.following);
      } catch (err) {
        console.error('팔로우 수 불러오기 실패:', err);
      }
    };

    if (isOwner) {
      fetchFollowCount();
    }
  }, [isOwner]);

  return (
    <div className="profile-left">
      <div className="profile-card">
        <div className="profile-img-wrapper">
          {profileImgUrl ? (
            <img src={`http://localhost:8080${profileImgUrl}`} alt="프로필" className="profile-img" />
          ) : (
            <div className="default-profile-img">
              <FaCamera className="default-camera-icon" />
            </div>
          )}
        </div>

        <p className="profile-nickname" style={{ cursor: 'pointer' }}>{nickname}</p>
        <div className="profile-info">
          <p className="profile-mbti" style={{ cursor: 'pointer' }}>{mbti || 'MBTI 미설정'}</p>
          <p><strong>가입일:</strong> {joinDate}</p>

          <div className="profile-stats">
            <div className="stats-buttons">
              <span className="stats-item" onClick={onTogglePosts}>게시글 {postCount}</span>
              <span className="stats-item" onClick={() => openModal('followers')}>팔로워 {followerCount}</span>
              <span className="stats-item" onClick={() => openModal('following')}>팔로잉 {followingCount}</span>
            </div>
          </div>

          <div className="mbti-description">
            <h4>{mbti} 유형: {mbtiInfo.title}</h4>
            <div className="mbti-tags">
              {mbtiInfo.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
            <p>{mbtiInfo.description}</p>
          </div>

          {isOwner && (
            <div className="profile-actions">
              <button className="edit-btn" onClick={() => navigate("/profile/edit")}>프로필 수정</button>
              <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>회원탈퇴</button>
            </div>
          )}
        </div>
      </div>

      {modalType && (
        <FollowModal
          type={modalType}
          targetId={targetId}
          onClose={closeModal}
        />
      )}

      {showDeleteModal && (
        <DeleteId
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ProfileLeft;
