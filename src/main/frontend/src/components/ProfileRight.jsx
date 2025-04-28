import React from 'react';
import '../css/Profile.css';

const ProfileRight = ({ feedPosts, anonPosts }) => {
  return (
    <div className="profile-right">
      <div className="post-section">
        <h3>내 피드 글</h3>
        <ul>
          {feedPosts.map((feed, idx) => <li key={idx}>{feed}</li>)}
        </ul>
      </div>
      <div className="post-section">
        <h3>익명 게시글</h3>
        <ul>
          {anonPosts.map((post, idx) => <li key={idx}>{post}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default ProfileRight;
