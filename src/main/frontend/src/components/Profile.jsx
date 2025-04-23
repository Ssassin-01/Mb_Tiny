import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";
import '../css/Profile.css';

const ImageUpload = () => {
  const [uploadImgUrl, setUploadImgUrl] = useState("");

  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
  };

  return (
    <div className="profile-img-wrapper">
      {uploadImgUrl ? (
        <img src={uploadImgUrl} alt="프로필 이미지" className="profile-img" />
      ) : (
        <div className="default-profile-img">
          <FaCamera className="default-camera-icon" />
        </div>
      )}

      <label htmlFor="img-upload" className="upload-icon">
        <FaCamera />
      </label>
      <input
        type="file"
        id="img-upload"
        accept="image/*"
        onChange={onchangeImageUpload}
        style={{ display: "none" }}
      />
    </div>
  );
};

const FriendModal = ({ show, onClose, friends = [] }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>친구 목록</h3>
        <ul className="friend-list">
          {friends.length === 0 ? (
            <li>친구가 없습니다.</li>
          ) : (
            friends.map((friend, idx) => <li key={idx}>{friend}</li>)
          )}
        </ul>
        <button className="modal-close" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

const Profile = ({ isOwner = true }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const nickname = "babo";
  const mbti = "INFP";
  const joinDate = "2025-04-01";

  return (
    <div className="profile-page">
      <div className="profile-card">
        <ImageUpload />
        <div className="profile-info">
          <p><strong>닉네임:</strong> {nickname}</p>
          <p><strong>MBTI:</strong> {mbti}</p>
          <p><strong>가입일:</strong> {joinDate}</p>

          <button onClick={() => setShowModal(true)} className="friend-btn">친구 목록</button>

          {isOwner && (
            <div className="profile-actions">
              <button className="edit-btn" onClick={() => navigate("/profile/edit")}>프로필 수정</button>
              <button className="delete-btn">회원탈퇴</button>
            </div>
          )}
        </div>
      </div>
      <FriendModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Profile;
