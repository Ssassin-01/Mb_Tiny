import React from "react";
import PostItem from "./PostItem";
import "../css/Feed.css";

const dummyPosts = [
  { id: 1, username: "A", content: "피드", time: "1시간 전" },
  { id: 2, username: "B", content: "피드", time: "2시간 전" },
  { id: 3, username: "C", content: "피드", time: "3시간 전" },
];

const Feed = () => {
  return (
    <div className="feed-container">
      {dummyPosts.map(post => (
        <PostItem
          key={post.id}
          username={post.username}
          content={post.content}
          time={post.time}
        />
      ))}
    </div>
  );
};

export default Feed;
