import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import '../../css/profile/Profile.css';

// 프로필 이미지 업로드 컴포넌트
const ImageUpload = ({ uploadImgUrl, setUploadImgUrl }) => {
  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => setUploadImgUrl(reader.result);
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
      <label htmlFor="img-upload" className="upload-icon" />
      <input type="file" id="img-upload" accept="image/*" onChange={onchangeImageUpload} hidden />
    </div>
  );
};

// 메인 FriendProfileLeft 컴포넌트
const FriendProfileLeft = ({
  nickname,
  mbti,
  joinDate,
  onTogglePosts,
  postCount,
  isOwner,
  targetId,
}) => {
  const navigate = useNavigate();
  const [uploadImgUrl, setUploadImgUrl] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // 팔로우 상태, 팔로워 수, 팔로잉 수 불러오기
  useEffect(() => {
    const fetchProfileStats = async () => {
      try {
        const followersRes = await axios.get('/api/follow/followers', { withCredentials: true });
        const followingRes = await axios.get('/api/follow/following', { withCredentials: true });

        setFollowerCount(followersRes.data.length);
        setFollowingCount(followingRes.data.length);

        const followerIds = followersRes.data.map(user => user.id);
        setIsFollowing(followerIds.includes(targetId));
      } catch (error) {
        console.error('프로필 정보 불러오기 실패:', error);
      }
    };

    if (targetId) {
      fetchProfileStats();
    }
  }, [targetId]);

  // 팔로우 / 언팔로우 버튼 클릭
  const handleToggleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`/api/follow/${targetId}`, { withCredentials: true });
      } else {
        await axios.post(`/api/follow/${targetId}`, null, { withCredentials: true });
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error('팔로우/언팔로우 실패:', err);
    }
  };

  return (
    <div className="profile-left">
      <div className="profile-card">
        <ImageUpload uploadImgUrl={uploadImgUrl} setUploadImgUrl={setUploadImgUrl} />
        <p className="profile-nickname">{nickname}</p>

        <div className="profile-info">
          <p className="profile-mbti">{mbti}</p>
          <p><strong>가입일:</strong> {joinDate}</p>

          {/* 게시글/팔로워/팔로잉 버튼 */}
          <div className="profile-stats">
            <button className="stats-btn" onClick={onTogglePosts}>
              게시글 <span className="count">{postCount}</span>
            </button>
            <button className="stats-btn">
              팔로워 <span className="count">{followerCount}</span>
            </button>
            <button className="stats-btn">
              팔로잉 <span className="count">{followingCount}</span>
            </button>
          </div>

          {/* 팔로우 버튼 */}
          {!isOwner && (
            <button
              className={`follow-btn ${isFollowing ? 'following' : ''}`}
              onClick={handleToggleFollow}
            >
              {isFollowing ? '언팔로우' : '팔로우'}
            </button>
          )}

          {/* MBTI 설명 */}
          <div className="mbti-description">
            <h4>{mbti} 유형: 열정적인 중재자</h4>
            <div className="mbti-tags">
              <span>내향형</span>
              <span>직관형</span>
              <span>감정형</span>
              <span>인식형</span>
            </div>
            <p>열정적인 중재자는 이상주의적이며 감성적인 사람입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendProfileLeft;
