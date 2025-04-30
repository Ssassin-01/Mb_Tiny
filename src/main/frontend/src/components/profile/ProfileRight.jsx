import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostItem from './ProfileRightPostItem';
import '../../css/profile/Profile.css';
import axios from 'axios';

function ProfileRight() {
  const [activeTab, setActiveTab] = useState('feed');
  const [feedPosts, setFeedPosts] = useState([]);
  const [anonymousPosts, setAnonymousPosts] = useState([]);
  const [hasMoreFeed, setHasMoreFeed] = useState(true);
  const [hasMoreAnon, setHasMoreAnon] = useState(true);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const userRes = await axios.get('/api/members/me', { withCredentials: true });
      const loginUser = userRes.data;
      console.log("현재 로그인 유저:", loginUser);

      if (!loginUser) return;

      // 일반 게시글
      const feedRes = await axios.get('/api/posts', { withCredentials: true });
      const myFeeds = feedRes.data.filter(post => post.email === loginUser.email);
      setFeedPosts(myFeeds);
      setHasMoreFeed(false);

      // 익명 게시글
      const anonRes = await axios.get('/api/anonymous-posts', { withCredentials: true });
      const myAnons = anonRes.data.filter(post => post.email === loginUser.email);
      setAnonymousPosts(myAnons);
      setHasMoreAnon(false);
    } catch (error) {
      console.error('내 게시글 불러오기 실패:', error);
    }
  };

  return (
    <div className='profile-right-container'>
      <div className='profile-tab-buttons'>
        <button
          className={activeTab === 'feed' ? 'active' : ''}
          onClick={() => setActiveTab('feed')}
        >
          내가 쓴 피드
        </button>
        <button
          className={activeTab === 'anonymous' ? 'active' : ''}
          onClick={() => setActiveTab('anonymous')}
        >
          익명 게시판
        </button>
      </div>

      <div className='profile-post-list' id='profileScroll'>
        {activeTab === 'feed' && (
          <InfiniteScroll
            dataLength={feedPosts.length}
            next={() => {}}
            hasMore={hasMoreFeed}
            loader={<div className='spinner'></div>}
            endMessage={<p style={{ textAlign: 'center' }}>더 이상 피드가 없습니다.</p>}
            scrollableTarget='profileScroll'
            style={{ overflow: 'visible', position: 'relative' }}
          >
            {feedPosts.map((feed) => (
              <PostItem key={feed.id} post={feed} />
            ))}
          </InfiniteScroll>
        )}

        {activeTab === 'anonymous' && (
          <InfiniteScroll
            dataLength={anonymousPosts.length}
            next={() => {}}
            hasMore={hasMoreAnon}
            loader={<div className='spinner'></div>}
            endMessage={<p style={{ textAlign: 'center' }}>더 이상 익명글이 없습니다.</p>}
            scrollableTarget='profileScroll'
            style={{ overflow: 'visible', position: 'relative' }}
          >
            {anonymousPosts.map((post) => (
              <PostItem key={post.id} post={post} isAnonymous />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default ProfileRight;
