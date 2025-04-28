import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "./ProfileRightPostItem";
import '../../css/profile/FriendProfilePage.css'; 

const FriendProfileRight = ({ userId }) => {
  const [feedPosts, setFeedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts/user/${userId}`);
        const data = await res.json();
        setFeedPosts(data);
      } catch (error) {
        console.error('상대방 글 불러오기 실패:', error);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="friend-profile-right">
      {feedPosts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        feedPosts.map(post => (
          <PostItem key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default FriendProfileRight;
