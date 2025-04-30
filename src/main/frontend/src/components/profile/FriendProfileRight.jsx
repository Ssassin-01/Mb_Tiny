import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostItem from './ProfileRightPostItem';
import '../../css/profile/Profile.css';
import axios from 'axios';

function FriendProfileRight({ targetNickname }) {  // props 받는 거 맞음
  const [activeTab, setActiveTab] = useState('feed');
  const [feedPosts, setFeedPosts] = useState([]);
  const [anonymousPosts, setAnonymousPosts] = useState([]);
  const [friendInfo, setFriendInfo] = useState(null);

  useEffect(() => {
    console.log('FriendProfileRight 시작, targetNickname:', targetNickname);
    const fetchFriendInfo = async () => {
      try {
        
        const res = await axios.get(`http://localhost:8080/api/members/${targetNickname}`, { withCredentials: true });
        setFriendInfo(res.data);

        const feedRes = await axios.get('http://localhost:8080/api/posts', { withCredentials: true });
        console.log('전체 피드 데이터:', feedRes.data);
        
        const myFeeds = feedRes.data.filter(post => {
          console.log('각 post 닉네임:', post.nickname, '타겟:', targetNickname);
          return post.nickname?.toLowerCase() === targetNickname.toLowerCase();
        });
        console.log('필터링된 피드:', myFeeds);
        
        setFeedPosts(myFeeds);
        

        const anonRes = await axios.get('http://localhost:8080/api/anonymous-posts', { withCredentials: true });
        const myAnons = anonRes.data.filter(post => post.nickname?.toLowerCase() === targetNickname.toLowerCase());
        setAnonymousPosts(myAnons);
      } catch (error) {
        console.error('상대방 프로필 불러오기 실패:', error);
      }
    };
    if (targetNickname) fetchFriendInfo();
  }, [targetNickname]);

  if (!friendInfo) {
    return <div>로딩 중...</div>;
  }

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

      <div className="profile-post-list" id="profileScroll">
        {activeTab === 'feed' && (
          <InfiniteScroll
            dataLength={feedPosts.length}
            next={() => {}}
            hasMore={false}
            scrollableTarget="profileScroll"
          >
            {feedPosts.map(feed => (
              <PostItem key={feed.id} post={feed} />
            ))}
          </InfiniteScroll>
        )}

        {activeTab === 'anonymous' && (
          <InfiniteScroll
            dataLength={anonymousPosts.length}
            next={() => {}}
            hasMore={false}
            scrollableTarget="profileScroll"
          >
            {anonymousPosts.map(post => (
              <PostItem key={post.id} post={post} isAnonymous />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default FriendProfileRight;
