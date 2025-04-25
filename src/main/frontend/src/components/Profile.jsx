import React, { useState } from 'react';
import ProfileLeft from './ProfileLeft';
import ProfileRight from './ProfileRight';
import '../css/Profile.css';

const Profile = () => {
  const [showPosts, setShowPosts] = useState(false);

  const nickname = "babo";
  const mbti = "INFP";
  const joinDate = "2025-04-01";
  const feedPosts = ["피드글 1", "피드글 2"];
  const anonPosts = ["익명글 1", "익명글 2"];

  return (
    <div className="profile-page">
      <ProfileLeft
        nickname={nickname}
        mbti={mbti}
        joinDate={joinDate}
        postCount={feedPosts.length + anonPosts.length}
        onTogglePosts={() => setShowPosts(!showPosts)}
        isOwner={true}
      />
      {showPosts && (
        <ProfileRight
          feedPosts={feedPosts}
          anonPosts={anonPosts}
        />
      )}
    </div>
  );
};

export default Profile;
