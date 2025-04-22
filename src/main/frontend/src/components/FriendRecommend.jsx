import React from "react";
import "../css/Feed.css";

const recommendedFriends = [
  { id: 1, name: "A", mutual: "3명의 친구와 공통" },
  { id: 2, name: "B", mutual: "2명의 친구와 공통" },
  { id: 3, name: "C", mutual: "4명의 친구와 공통" },
];

const FriendRecommend = () => {
  return (
    <div className="friend-recommend">
      <h4>주변 친구 추천</h4>
      <ul>
        {recommendedFriends.map(friend => (
          <li key={friend.id} className="friend-item">
            <span className="friend-name">{friend.name}</span>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRecommend;
