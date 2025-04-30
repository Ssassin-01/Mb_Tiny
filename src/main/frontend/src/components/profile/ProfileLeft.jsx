import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import '../../css/profile/Profile.css';
import FollowModal from '../follow/FollowModal';
import mbtiDescriptions from './mbtiDescriptions';



// 프로필 이미지 업로드 컴포넌트
const ImageUpload = ({ uploadImgUrl, setUploadImgUrl, targetId }) => {
  const onchangeImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setUploadImgUrl(reader.result);

    const formData = new FormData();
    formData.append('profileImg', file);

    try {
      const res = await axios.post(`http://localhost:8080/api/members/${targetId}/profile-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setUploadImgUrl(`http://localhost:8080${res.data.imageUrl}`);
    } catch (err) {
      console.error('프로필 사진 업로드 실패:', err);
    
      // 상세 오류 분석
      if (err.response) {
        console.error('서버 응답 오류:', err.response.data);
        console.error('상태 코드:', err.response.status);
        console.error('응답 헤더:', err.response.headers);
      } else if (err.request) {
        console.error('요청은 갔지만 응답 없음:', err.request);
      } else {
        console.error('오류 발생:', err.message);
      }
    
      alert('프로필 사진 업로드 중 오류가 발생했습니다.');
    }
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
      <label htmlFor="img-upload" className="upload-icon">
        <FaCamera className="camera-icon" />
      </label>
      <input type="file" id="img-upload" accept="image/*" onChange={onchangeImageUpload} hidden />
    </div>
  );
};

// 메인 프로필 좌측 컴포넌트
const ProfileLeft = ({
  nickname,
  mbti,
  joinDate,
  onTogglePosts,
  postCount,
  isOwner,
  followerCount,
  followingCount,
  targetId
}) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
  const [uploadImgUrl, setUploadImgUrl] = useState('');

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const mbtiInfo = mbtiDescriptions[mbti?.toUpperCase()] || {
    title: '성격유형',
    tags: [],
    description: '아직 등록되지 않은 MBTI입니다.',
  };

  return (
    <div className="profile-left">
      <div className="profile-card">
        <ImageUpload
          uploadImgUrl={uploadImgUrl}
          setUploadImgUrl={setUploadImgUrl}
          targetId={targetId}
        />

        <p className="profile-nickname">{nickname}</p>
        <div className="profile-info">
          <p className="profile-mbti">{mbti || 'MBTI 미설정'}</p>
          <p><strong>가입일:</strong> {joinDate}</p>

          <div className="profile-stats">
            <div className="stats-buttons">
              <span className="stats-item" onClick={onTogglePosts}>게시글 {postCount}</span>
              <span className="stats-item" onClick={() => openModal('followers')}>팔로워 {followerCount}</span>
              <span className="stats-item" onClick={() => openModal('following')}>팔로잉 {followingCount}</span>
            </div>
          </div>

          {/* MBTI 설명 */}
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
              <button className="delete-btn">회원탈퇴</button>
            </div>
          )}
        </div>
      </div>

      {/* 팔로워/팔로잉 모달 */}
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

export default ProfileLeft;
