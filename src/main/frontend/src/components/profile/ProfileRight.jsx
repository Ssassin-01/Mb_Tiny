import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostItem from './ProfileRightPostItem';
import '../../css/profile/Profile.css';

// 더미 데이터
const allFeeds = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  writer: '나',
  content: `${i + 1}번째 내가 쓴 피드`,
  createDate: new Date().toISOString(),
  image: i % 3 === 0 ? `/img/feed_img${(i % 3) + 1}.PNG` : null,
}));

const allAnonymousPosts = Array.from({ length: 40 }, (_, i) => ({
  id: i + 100,
  writer: '나',
  title: `${i + 1}번째 익명글 제목`,
  content: `${i + 1}번째 익명글 내용입니다.`,
  createDate: new Date().toISOString(),
}));

function ProfileRight() {
  const [activeTab, setActiveTab] = useState('feed');
  const [feedPosts, setFeedPosts] = useState([]);
  const [anonymousPosts, setAnonymousPosts] = useState([]);
  const [hasMoreFeed, setHasMoreFeed] = useState(true);
  const [hasMoreAnon, setHasMoreAnon] = useState(true);

  useEffect(() => {
    loadMoreFeeds();
    loadMoreAnons();
  }, []);

  const loadMoreFeeds = () => {
    const next = allFeeds.slice(0, feedPosts.length + 10);
    setTimeout(() => {
      setFeedPosts(next);
      if (next.length === feedPosts.length) setHasMoreFeed(false);
    }, 300);
  };

  const loadMoreAnons = () => {
    const next = allAnonymousPosts.slice(0, anonymousPosts.length + 10);
    setTimeout(() => {
      setAnonymousPosts(next);
      if (next.length === anonymousPosts.length) setHasMoreAnon(false);
    }, 300);
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
          익명 게시글
        </button>
      </div>

      <div className='profile-post-list' id='profileScroll'>
        {activeTab === 'feed' && (
          <InfiniteScroll
            dataLength={feedPosts.length}
            next={loadMoreFeeds}
            hasMore={hasMoreFeed}
            loader={<div className='spinner'></div>}
            endMessage={
              <p style={{ textAlign: 'center' }}>더 이상 피드가 없습니다.</p>
            }
            scrollableTarget='profileScroll'
            style={{
              overflow: 'visible',
              position: 'relative',
            }}
          >
            {feedPosts.map((feed) => (
              <PostItem key={feed.id} post={feed} />
            ))}
          </InfiniteScroll>
        )}

        {activeTab === 'anonymous' && (
          <InfiniteScroll
            dataLength={anonymousPosts.length}
            next={loadMoreAnons}
            hasMore={hasMoreAnon}
            loader={<div className='spinner'></div>}
            endMessage={
              <p style={{ textAlign: 'center' }}>더 이상 익명글이 없습니다.</p>
            }
            scrollableTarget='profileScroll'
            style={{
              overflow: 'visible',
              position: 'relative',
            }}
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
