import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import '../../css/profile/Profile.css';
import FollowModal from '../follow/FollowModal';
import FollowButton from '../follow/FollowButton';

// MBTI 설명 매핑
const mbtiDescriptions = {
  INFP: { title: "열정적인 중재자", tags: ["내향형", "직관형", "감정형", "인식형"], description: "열정적인 중재자는 이상주의적이며 감성적입니다." },
  ENFP: { title: "활동적인 열정가", tags: ["외향형", "직관형", "감정형", "인식형"], description: "활동적인 열정가는 자유롭고 창의적인 삶을 추구합니다." },
  INFJ: { title: "통찰력 있는 조언자", tags: ["내향형", "직관형", "감정형", "판단형"], description: "조용하지만 깊은 통찰력을 지닌 이타주의자입니다." },
  ENFJ: { title: "정의로운 지도자", tags: ["외향형", "직관형", "감정형", "판단형"], description: "타인을 이끌고 조화를 추구하는 천성적인 리더입니다." },
  INTJ: { title: "용의주도한 전략가", tags: ["내향형", "직관형", "사고형", "판단형"], description: "전략적 사고와 철저한 계획을 즐기는 혁신가입니다." },
  ENTJ: { title: "대담한 통솔자", tags: ["외향형", "직관형", "사고형", "판단형"], description: "결단력 있고 효율을 중시하는 타고난 리더입니다." },
  INTP: { title: "논리적인 사색가", tags: ["내향형", "직관형", "사고형", "인식형"], description: "끊임없이 이론을 탐구하고 분석하는 혁신적인 사색가입니다." },
  ENTP: { title: "창의적인 발명가", tags: ["외향형", "직관형", "사고형", "인식형"], description: "호기심 많고 아이디어를 자유롭게 펼치는 혁신가입니다." },
  ISFJ: { title: "따뜻한 수호자", tags: ["내향형", "감각형", "감정형", "판단형"], description: "헌신적이고 책임감 있게 주변 사람을 돌보는 보호자입니다." },
  ESFJ: { title: "사교적인 돌보미", tags: ["외향형", "감각형", "감정형", "판단형"], description: "타인을 배려하고 조화를 추구하는 친절한 조정자입니다." },
  ISTJ: { title: "원칙적인 관리자", tags: ["내향형", "감각형", "사고형", "판단형"], description: "신뢰할 수 있고 사실에 기반한 결정을 내리는 철저한 관리자입니다." },
  ESTJ: { title: "엄격한 통솔자", tags: ["외향형", "감각형", "사고형", "판단형"], description: "명확한 기준과 효율을 중시하는 체계적인 리더입니다." },
  ISFP: { title: "호기심 많은 예술가", tags: ["내향형", "감각형", "감정형", "인식형"], description: "섬세하고 자유로운 감성으로 세상을 표현하는 예술가입니다." },
  ESFP: { title: "자유로운 연예인", tags: ["외향형", "감각형", "감정형", "인식형"], description: "즐겁고 즉흥적인 매력으로 분위기를 밝히는 에너자이저입니다." },
  ISTP: { title: "만능 재주꾼", tags: ["내향형", "감각형", "사고형", "인식형"], description: "현실적이고 유연하게 문제를 해결하는 실용적인 탐험가입니다." },
  ESTP: { title: "모험을 즐기는 사업가", tags: ["외향형", "감각형", "사고형", "인식형"], description: "위험을 감수하고 빠르게 판단하는 실행력 강한 사업가입니다." }
};

// 프로필 이미지 업로드 컴포넌트
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

// 메인 프로필 좌측 컴포넌트
const ProfileLeft = ({ nickname, mbti, joinDate, onTogglePosts, postCount, isOwner, followerCount, followingCount, targetId }) => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const mbtiInfo = mbtiDescriptions[mbti?.toUpperCase()] || {
    title: "성격유형",
    tags: [],
    description: "아직 등록되지 않은 MBTI입니다."
  };

  return (
    <div className="profile-left">
      <div className="profile-card">
        <ImageUpload />
        <p className="profile-nickname">{nickname}</p>
        <div className="profile-info">
          <p className="profile-mbti">{mbti || 'MBTI 미설정'}</p>
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

  {!isOwner && <FollowButton targetId={targetId} />}
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

      {modalType && <FollowModal type={modalType} onClose={closeModal} />}
    </div>
  );
};

export default ProfileLeft;
