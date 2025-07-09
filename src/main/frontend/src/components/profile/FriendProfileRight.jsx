import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostItem from './ProfileRightPostItem';
import '../../css/profile/Profile.css';
import axios from 'axios';

function FriendProfileRight({ targetNickname, showPosts }) {
  const [activeTab, setActiveTab] = useState('feed');
  const [feedPosts, setFeedPosts] = useState([]);
  const [friendInfo, setFriendInfo] = useState(null);

  useEffect(() => {
    const fetchFriendInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/members/${targetNickname}`, { withCredentials: true });
        setFriendInfo(res.data);

        const feedRes = await axios.get('http://localhost:8080/api/posts', { withCredentials: true });
        const myFeeds = feedRes.data.filter(post => post.nickname?.toLowerCase() === targetNickname.toLowerCase());
        setFeedPosts(myFeeds);
      } catch (error) {
        console.error('상대방 프로필 불러오기 실패:', error);
      }
    };
    if (targetNickname) fetchFriendInfo();
  }, [targetNickname]);

  if (!friendInfo) return <div>로딩 중...</div>;
  if (!showPosts) return null;
  return (
    <div className="profile-right-container">
      <div className="profile-tab-buttons">
        <button
          className={activeTab === 'feed' ? 'active' : ''}
          onClick={() => setActiveTab('feed')}
        >
          작성한 피드
        </button>
      </div>

      {showPosts && (
        <div className="profile-post-list" id="profileScroll">
          {activeTab === 'feed' && (
            <InfiniteScroll
              dataLength={feedPosts.length}
              next={() => {}}
              hasMore={false}
              scrollableTarget="profileScroll"
              style={{ overflow: 'visible', position: 'relative' }}
            >
              {feedPosts.map(feed => (
                <PostItem key={feed.id} post={feed} createdAt={feed.createdAt} />
              ))}
            </InfiniteScroll>
          )}
        </div>
      )}
    </div>
  );
}


export default FriendProfileRight;
