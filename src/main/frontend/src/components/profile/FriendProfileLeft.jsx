import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import '../../css/profile/Profile.css';

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
      <label htmlFor="img-upload" className="upload-icon">
        {/* <FaCamera /> 이미지 파일 업로드시 필요 */}
      </label>
      <input type="file" id="img-upload" accept="image/*" onChange={onchangeImageUpload} hidden />
    </div>
  );
};

const FriendProfileLeft = ({ nickname, mbti, joinDate, onTogglePosts, postCount, isOwner }) => {
  const navigate = useNavigate();

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
            <button className="stats-btn">팔로워 <span className="count">12</span></button>
            <button className="stats-btn">팔로잉 <span className="count">5</span></button>
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
          </div>
      </div>
    </div>
  );
};

export default FriendProfileLeft;
