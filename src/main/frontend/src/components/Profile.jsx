import React from 'react';
import { useState } from 'react';
import '../css/Profile.css';

const ImageUpload = ()=> {
  const [uploadImgUrl, setUploadImgUrl] = useState("");

  const onchangeImageUpload = (e)=> {
     const {files} = e.target;
     const uploadFile = files[0];
     const reader = new FileReader();
     reader.readAsDataURL(uploadFile);
     reader.onloadend = ()=> {
     setUploadImgUrl(reader.result);
  }
}
return (
  <div className="upload-section">
    {uploadImgUrl && (
      <img src={uploadImgUrl} alt="업로드된 이미지" className="profile-img" />
    )}
    <input type="file" accept="image/*" onChange={onchangeImageUpload} />
  </div>
);
};

const Profile = () => {
return (
  <div className="profile-page">
    <h2>내 프로필</h2>
    <div className="profile-card">
      {/* 프로필 이미지 업로드 컴포넌트 */}
      <ImageUpload />

      <div className="profile-info">
        <p><strong>닉네임:</strong> 이름</p>
        <p><strong>MBTI:</strong> INFP</p>
        <p><strong>가입일:</strong> 2025-04-01</p>
        <button className="edit-btn">프로필 수정</button>
      </div>
    </div>
  </div>
);
};

export default Profile;