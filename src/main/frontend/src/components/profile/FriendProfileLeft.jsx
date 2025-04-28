import React from 'react';
import '../../css/profile/FriendProfilePage.css'; 

const FriendProfileLeft = ({ profile }) => {
  return (
    <div className="friend-profile-left">
      <div className="friend-profile-card">
        <img src={profile.profileImgUrl || '/img/default-profile.png'} alt="프로필" className="friend-profile-img" />
        <p>{profile.nickname}</p>
        <div className="friend-profile-info">
          <p className="friend-mbti">{profile.mbti}</p>
          <p><strong>가입일:</strong> {profile.joinDate}</p>

          {/* 팔로우 버튼 */}
          <button className="follow-btn">팔로우</button>

          {/* MBTI 소개 */}
          <div className="friend-mbti-description">
            <h4>{profile.mbti} 유형 설명</h4>
            <p>여기에 MBTI 설명이 들어갑니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendProfileLeft;
