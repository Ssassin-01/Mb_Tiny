import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import '../../css/profile/Profile.css';
import FollowModal from '../follow/FollowModal';
import FollowButton from '../follow/FollowButton';

const ImageUpload = ({ uploadImgUrl, setUploadImgUrl }) => {
  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => setUploadImgUrl(reader.result);
  };

  return (
    <div className="profile-img-wrapper">
      {uploadImgUrl ? (
        <img src={uploadImgUrl} alt="프로필" className="profile-img" />
      ) : (
        <div className="default-profile-img">
          <FaCamera className="default-camera-icon" />
        </div>
      )}
      <label htmlFor="img-upload" className="upload-icon" />
      <input type="file" id="img-upload" accept="image/*" onChange={onchangeImageUpload} hidden />
    </div>
  );
};

const ProfileLeft = ({ nickname, mbti, joinDate, onTogglePosts, postCount, isOwner, followerCount, followingCount, targetId }) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <div className="profile-left">
      <div className="profile-card">
        <ImageUpload />
        <p>{nickname}</p>
        <div className="profile-info">
          <p className="profile-mbti">{mbti}</p>
          <p><strong>가입일:</strong> {joinDate}</p>

          <div className="profile-stats">
            <button className="stats-btn" onClick={onTogglePosts}>
              게시글 <span className="count">{postCount}</span>
            </button>
            <div className="follow-stats">
              <span className="follow-count" onClick={() => openModal('followers')}>
                팔로워 {followerCount}
              </span>
              <span className="follow-count" onClick={() => openModal('following')}>
                팔로잉 {followingCount}
              </span>
            </div>
            {!isOwner && <FollowButton targetId={targetId} />}
          </div>

          <div className="mbti-description">
            <h4>{mbti} 유형: 열정적인 중재자</h4>
            <div className="mbti-tags">
              <span>내향형</span>
              <span>직관형</span>
              <span>감정형</span>
              <span>인식형</span>
            </div>
            <p>열정적인 중재자는 이상주의적이며 감성적인...</p>
          </div>

          {isOwner && (
            <div className="profile-actions">
              <button className="edit-btn" onClick={() => navigate("/profile/edit")}>프로필 수정</button>
              <button className="delete-btn">회원탈퇴</button>
            </div>
          )}
        </div>
      </div>

      {modalType && <FollowModal type={modalType} onClose={closeModal} />}
    </div>
  );
};

export default ProfileLeft;
