import React, { useState } from 'react';
import ProfileLeft from './ProfileLeft';
import ProfileRight from './ProfileRight';
import '../../css/profile/Profile.css';

const Profile = () => {
  const [showPosts, setShowPosts] = useState(false);

  const nickname = "babo";
  const mbti = "INFP";
  const joinDate = "2025-04-01";
  
  

  return (
    <div className="profile-page">
      <ProfileLeft
        nickname={nickname}
        mbti={mbti}
        joinDate={joinDate}
        onTogglePosts={() => setShowPosts(!showPosts)}
        isOwner={true}
      />
      {showPosts && (
        <ProfileRight          
        />
      )}
    </div>
  );
};

export default Profile;
